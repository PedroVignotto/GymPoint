import { Op } from 'sequelize';
import { startOfWeek, endOfWeek } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
      order: [['createdAt', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;
    const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id: id },
    });

    if (!enrollmentExists) {
      return res
        .status(400)
        .json({ error: 'Only enrolled students can check in' });
    }

    const countCheckin = await Checkin.count({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [startWeek, endWeek],
        },
      },
    });

    if (countCheckin >= 5) {
      return res.status(400).json({
        error: 'You can only 5 checkins in week',
      });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  }
}

export default new CheckinController();
