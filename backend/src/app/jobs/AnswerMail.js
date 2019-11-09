import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.student.name} <${order.student.email}>`,
      subject: 'Answer requests for assistance',
      template: 'answer',
      context: {
        student: order.student.name,
        question: order.question,
        answer: order.answer,
      },
    });
  }
}

export default new AnswerMail();
