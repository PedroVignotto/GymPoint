import Help_order from '../models/Help_order';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const order = await Help_order.findAll({
      where: { answer: null },
      attributes: ['id', 'question', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(order);
  }
}

export default new AnswerController();
