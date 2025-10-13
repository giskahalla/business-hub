
const initialState = {
  byID: {}
};

export const project = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROJECTS': {
        const { projects } = action;

        return {
          ...state,
          byID: {
            ...state.byID,
            ...Object.fromEntries(projects.map(p => [p.id, p])),
          },
        };
    }
    case 'UPDATE_PROJECT': {
        const { project } = action;
        const { id } = project

        return {
          ...state,
          byID: {
            ...state.byID,
            [id]: project
          },
        };
    }
    default:
      return state;
  }
};