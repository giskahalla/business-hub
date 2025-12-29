import axios from "axios";

import { CONFIG } from "../config";

export const getMembers = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/members`);
  return response.data;
}

export const createMember = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/create/member`, data);
  return response.data;
}

export const updateMember = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/update/member`, data);
  return response.data;
}