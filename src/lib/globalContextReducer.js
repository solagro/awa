import merge from 'deepmerge';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ANSWER': {
      if (!payload) {
        return state;
      }

      const { id, theme, index, valid } = payload;

      return merge(state, {
        answers: {
          [theme]: { [id]: { index, valid } },
        },
      });
    }

    case 'ANSWER_RESET': {
      return {
        ...state,
        answers: {},
      };
    }

    default:
      throw new Error('Bad Action Type');
  }
};

export default reducer;
