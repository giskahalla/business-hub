import { combineReducers } from "@reduxjs/toolkit";

import { customer } from "./customer";
import { project } from "./project";
import { company } from "./company";
import { team } from "./team";

const rootReducer = combineReducers({
  customer,
  project,
  company,
  team
});

export default rootReducer;