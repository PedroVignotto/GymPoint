import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import Help_order from '../models/Help_order';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';

class Help_orderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const order = await Help_order.findAndCountAll({
      where: { student_id: id },
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      order: [['created_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    const totalPage = Math.ceil(order.count / 10);

    return res.json({ order: order.rows, totalPage });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const { question } = req.body;
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    await Help_order.create({
      student_id: id,
      question,
    });

    return res.json({ question });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answer } = req.body;
    const { id } = req.params;

    const orderExists = await Help_order.findByPk(id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Help order does not exists' });
    }

    await Help_order.update(
      { answer, answer_at: new Date() },
      { where: { id } }
    );

    const order = await Help_order.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await Queue.add(AnswerMail.key, {
      order,
    });

    return res.json({ id, answer });
  }
}

export default new Help_orderController();
