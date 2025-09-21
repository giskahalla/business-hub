import { Alert } from '@mui/material';

import * as API from '@/services/api';


export const get_customer_fetch = () => async (dispatch) => {
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

