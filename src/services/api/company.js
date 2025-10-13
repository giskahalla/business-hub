import axios from "axios";

import { CONFIG } from "../config";

export const getCompanies = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/companies`);
  return response.data;
}