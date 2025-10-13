import { Alert } from '@mui/material';

import * as API from '@/services/api';


export const get_projects_request = () => async (dispatch) => {
  API.getProjects()
  .then((info) => {
    const { projects } = info;
    dispatch(get_projects_success(projects));
  }).catch((error) => {
    console.error("Error fetching projects:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}


const get_projects_success = (projects) => {
    return {
        type: "GET_PROJECTS",
        projects
    }
};

export const create_project_request = (data) => async (dispatch) => {
  API.createCustomer(data)
  .then((info) => {
    const { project } = info;
    dispatch(update_project_success(project));
  }).catch((error) => {
    console.error("Error update project:", error);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

export const update_project_request = (data) => async (dispatch) => {
  API.updateProject(data)
  .then((info) => {
    const { project } = info;
    dispatch(update_project_success(project));
  }).catch((error) => {
    console.error("Error update project:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}


const update_project_success = (project) => {
    return {
        type: "UPDATE_PROJECT",
        project
    }
};

