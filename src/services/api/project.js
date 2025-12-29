import axios from "axios";

import { CONFIG } from "../config";

export const getProjects = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/projects`);
  return response.data;
}

export const getProjectThruUserID = async (id) => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/project/thru/userId`, {params: { id }});
  return response.data;
}

export const createProject = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/create/project`, data);
  return response.data;
}

export const updateProject = async (data) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/update/project`, data);
  return response.data;
}

export const getProjectSummary = async (year) => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/projects/summary`,  {params: { year }} );
  return response.data;
}