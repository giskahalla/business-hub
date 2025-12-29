import { Alert } from '@mui/material';

import * as API from '@/services/api';


export const get_teams_request = () => async (dispatch) => {
  API.getMembers()
  .then((info) => {
    const { members } = info;
    dispatch(get_teams_success(members));
  }).catch((error) => {
    console.error("Error fetching teams:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

const get_teams_success = (members) => {
    return {
        type: "GET_TEAMS",
        members
    }
};

export const create_team_request = (data) => async (dispatch) => {
  API.createMember(data)
  .then((info) => {
    const { member } = info;
    dispatch(update_company_success(member));
  }).catch((error) => {
    console.error("Error update team:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

export const update_team_request = (data) => async (dispatch) => {
  API.updateMember(data)
  .then((info) => {
    const { member } = info;
    dispatch(update_company_success(member));
  }).catch((error) => {
    console.error("Error update team:", error.message);
      MessageEvent({ severity: 'error', children: <Alert severity="error">{error}</Alert> });
  });
}

const update_company_success = (team) => {
    return {
        type: "UPDATE_TEAM",
        team
    }
};