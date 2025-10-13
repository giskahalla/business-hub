
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
    // case 'UPDATE_CUSTOMER': {
    //     const { customer } = action;
    //     const { id } = customer

    //     return {
    //       ...state,
    //       byID: {
    //         ...state.byID,
    //         [id]: customer
    //       },
    //     };
    // }
    default:
      return state;
  }
};