import merge from 'deepmerge';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ANSWER': {
      if (!payload) {
        return state;
      }

      const { id, theme, ...rest } = payload;

      return merge(state, {
        answers: {
          [theme]: { [id]: rest },
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
