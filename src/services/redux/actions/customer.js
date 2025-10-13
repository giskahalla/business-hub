import { Alert } from '@mui/material';

import * as API from '@/services/api';


export const get_customers_request = () => async (dispatch) => {
  API.getCustomers()
  .then((info) => {
    const { customers } = info;
    dispatch(get_customers_success(customers));
  }).catch((error) => {
    console.error("Error fetching customers:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}


const get_customers_success = (customers) => {
    return {
        type: "GET_CUSTOMERS",
        customers
    }
};

export const create_customer_request = (data) => async (dispatch) => {
  API.createCustomer(data)
  .then((info) => {
    const { customer } = info;
    dispatch(update_customer_success(customer));
  }).catch((error) => {
    console.error("Error update customer:", error);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

export const update_customer_request = (data) => async (dispatch) => {
  API.updateCustomer(data)
  .then((info) => {
    const { customer } = info;
    dispatch(update_customer_success(customer));
  }).catch((error) => {
    console.error("Error update customer:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}


const update_customer_success = (customer) => {
    return {
        type: "UPDATE_CUSTOMER",
        customer
    }
};

