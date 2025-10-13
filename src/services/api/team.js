import axios from "axios";

import { CONFIG } from "../config";

export const getMembers = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/members`);
  return response.data;
}