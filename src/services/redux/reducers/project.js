
const initialState = {
  byID: {},
  byUserID: [],
  summary: {}
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
    case 'GET_PROJECT_SUMMARY': {
        const { summaries } = action;

        return {
          ...state,
          summary: summaries,
        };
    }
    default:
      return state;
  }
};