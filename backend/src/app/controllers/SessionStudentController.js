import * as Yup from 'yup';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class SessionStudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'There was a login error, please check your data' });
    }

    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const enrollment = await Enrollment.findOne({ where: { student_id: id } });

    if (!enrollment || !enrollment.active) {
      return res
        .status(401)
        .json({ error: 'Only enrollment student can login' });
    }

    return res.json(student);
  }
}

export default new SessionStudentController();
