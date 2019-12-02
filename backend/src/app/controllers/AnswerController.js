import Help_order from '../models/Help_order';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const order = await Help_order.findAndCountAll({
      where: { answer: null },
      attributes: ['id', 'question', 'created_at'],
      order: [['created_at', 'DESC']],
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

    const totalPage = Math.ceil(order.count / 20);

    return res.json({ order: order.rows, totalPage });
  }
}

export default new AnswerController();
