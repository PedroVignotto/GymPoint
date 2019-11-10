export function RegisterRequest(name, email, age, weight, height) {
  return {
    type: '@student/REGISTER_REQUEST',
    payload: { name, email, age, weight, height },
  };
}

export function RegisterSuccess(student) {
  return {
    type: '@student/REGISTER_SUCCESS',
    payload: { student },
  };
}

export function Failure() {
  return {
    type: '@student/FAILURE',
  };
}
