import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  loading: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/REGISTER_SUCCESS': {
        draft.student = action.payload.student;
        draft.loading = true;
        break;
      }
      case '@student/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
