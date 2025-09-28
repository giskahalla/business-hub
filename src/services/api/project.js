import axios from "axios";

import { CONFIG } from "../config";

export const getProjects = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/projects`);
  return response.data;
}

export const createProject = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/create/customer`, { data });
  return response.data;
}

export const updateProject = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/update/customer`, { data });
  return response.data;
}