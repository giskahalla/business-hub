
const initialState = {
  byID: {}
};

export const customer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CUSTOMERS': {
        const { customers } = action;

        return {
          ...state,
          byID: {
            ...state.byID,
            ...Object.fromEntries(customers.map(c => [c.id, c])),
          },
        };
    }
    case 'UPDATE_CUSTOMER': {
        const { customer } = action;
        const { id } = customer

        return {
          ...state,
          byID: {
            ...state.byID,
            [id]: customer
          },
        };
    }
    default:
      return state;
  }
};