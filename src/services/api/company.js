import axios from "axios";

import { CONFIG } from "../config";

export const getCompanies = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/companies`);
  return response.data;
}

export const createCompany = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/create/company`, data);
  return response.data;
}

export const updateCompany = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/update/company`, data);
  return response.data;
}