
const initialState = {
  all: [],
};

export const customer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CUSTOMERS': {
        const { customers } = action;

        return {
            ...state,  
            all: customers, 
        };
    }
    default:
      return state;
  }
};