import axios from "axios";

import { CONFIG } from "../config";

export const getCustomers = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/customers`);
  return response.data;
}

export const createCustomer = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/create/customer`, data);
  return response.data;
}

export const updateCustomer = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/update/customer`, data);
  return response.data;
}

export const getCustomerSummary = async (year) => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/customers/summary`,  {params: { year }} );
  return response.data;
}