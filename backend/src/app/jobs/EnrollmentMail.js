import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { studentExists, planExists, enrollment } = data;

    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Successful Enrollment',
      template: 'enrollment',
      context: {
        login: studentExists.id,
        student: studentExists.name,
        planName: planExists.title,
        planDuration: planExists.duration,
        planPrice: enrollment.price.toFixed(2),
        dateEnrollment: format(parseISO(enrollment.createdAt), 'MMMM dd, yyyy'),
        startDate: format(parseISO(enrollment.start_date), 'MMMM dd, yyyy'),
        endDate: format(parseISO(enrollment.end_date), 'MMMM dd, yyyy'),
      },
    });
  }
}

export default new EnrollmentMail();
