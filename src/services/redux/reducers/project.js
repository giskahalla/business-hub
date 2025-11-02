
const initialState = {
  byID: {},
  byUserID: []
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
    case 'GET_PROJECT_THRU_USERID': {
        const { projects } = action;

        return {
          ...state,
          byUserID: projects,
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