
const initialState = {
  byID: {}
};

export const team = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEAMS': {
        const { members } = action;

        return {
          ...state,
          byID: {
            ...state.byID,
            ...Object.fromEntries(members.map(c => [c.id, c])),
          },
        };
    }
    case 'UPDATE_TEAM': {
        const { team } = action;
        const { id } = team

        return {
          ...state,
          byID: {
            ...state.byID,
            [id]: team
          },
        };
    }
    default:
      return state;
  }
};