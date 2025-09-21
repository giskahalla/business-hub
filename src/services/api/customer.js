import axios from "axios";

import { CONFIG } from "../config";

export const getCustomers = async () => {
  const response = await axios.get(`${CONFIG.API_BASE_URL}/get/customers`);
  return response.data;
}