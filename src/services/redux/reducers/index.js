import { combineReducers } from "@reduxjs/toolkit";

import { customer } from "./customer";

const rootReducer = combineReducers({
  customer,
});

export default rootReducer;