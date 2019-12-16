import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import EnrollmentMail from '../jobs/EnrollmentMail';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      order: ['id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'duration'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async show(req, res) {
    const enrollments = await Enrollment.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'duration'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const EnrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (EnrollmentExists) {
      return res
        .status(400)
        .json({ error: 'This student is already enrolled' });
    }

    const startDate = startOfHour(parseISO(start_date));

    if (isBefore(startDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const price = planExists.price * planExists.duration;
    const end_date = new Date(start_date);
    end_date.setMonth(end_date.getMonth() + planExists.duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(EnrollmentMail.key, {
      studentExists,
      planExists,
      enrollment,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const enrollmentExists = await Enrollment.findByPk(id);

    if (!enrollmentExists) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    if (student_id) {
      return res.status(400).json({ error: 'You cannot change student' });
    }

    const plan = await Plan.findOne({ where: { id: plan_id } });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const price = plan.price * plan.duration;
    const end_date = new Date(start_date);
    end_date.setMonth(end_date.getMonth() + plan.duration);

    await Enrollment.update(
      { plan_id, start_date, price, end_date },
      { where: { id } }
    );

    return res.json({
      id,
      student_id: enrollmentExists.student_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    await Enrollment.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new EnrollmentController();
