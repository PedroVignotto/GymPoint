import Help_order from '../models/Help_order';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Help_order.findAll({
      where: { answer: null },
      attributes: ['id', 'question', 'created_at'],
      order: ['created_at'],
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

    return res.json(enrollments);
  }
}

export default new AnswerController();
