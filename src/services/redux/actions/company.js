import { Alert } from '@mui/material';

import * as API from '@/services/api';

export const get_companies_request = () => async (dispatch) => {
  API.getCompanies()
  .then((info) => {
    const { companies } = info;
    dispatch(get_companies_success(companies));
  }).catch((error) => {
    console.error("Error fetching companies:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}


const get_companies_success = (companies) => {
    return {
        type: "GET_COMPANIES",
        companies
    }
};