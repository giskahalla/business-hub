
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
    case 'UPDATE_COMPANY': {
        const { company } = action;
        const { id } = company

        return {
          ...state,
          byID: {
            ...state.byID,
            [id]: company
          },
        };
    }
    default:
      return state;
  }
};