import { combineReducers } from "@reduxjs/toolkit";

import { customer } from "./customer";
import { project } from "./project";

const rootReducer = combineReducers({
  customer,
  project
});

export default rootReducer;