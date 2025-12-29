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

export const create_company_request = (data) => async (dispatch) => {
  API.createCompany(data)
  .then((info) => {
    const { company } = info;
    dispatch(update_company_success(company));
  }).catch((error) => {
    console.error("Error update company:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

export const update_company_request = (data) => async (dispatch) => {
  API.updateCompany(data)
  .then((info) => {
    const { company } = info;
    dispatch(update_company_success(company));
  }).catch((error) => {
    console.error("Error update company:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

const update_company_success = (company) => {
    return {
        type: "UPDATE_COMPANY",
        company
    }
};