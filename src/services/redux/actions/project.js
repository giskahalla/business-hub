import { Alert } from '@mui/material';

import * as API from '@/services/api';


export const get_projects_fetch = () => async (dispatch) => {
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

export const create_customer_fetch = (data) => async (dispatch) => {
  API.createCustomer(data)
  .then((info) => {
    const { customer } = info;
    dispatch(update_customers_success(customer));
  }).catch((error) => {
    console.error("Error update customer:", error);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

export const update_customer_fetch = (data) => async (dispatch) => {
  API.updateCustomer(data)
  .then((info) => {
    const { customer } = info;
    dispatch(update_customers_success(customer));
  }).catch((error) => {
    console.error("Error update customer:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}


const update_customers_success = (customer) => {
    return {
        type: "UPDATE_CUSTOMER",
        customer
    }
};

