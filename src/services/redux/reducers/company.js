
const initialState = {
  byID: {}
};

export const company = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMPANIES': {
        const { companies } = action;

        return {
          ...state,
          byID: {
            ...state.byID,
            ...Object.fromEntries(companies.map(c => [c.id, c])),
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