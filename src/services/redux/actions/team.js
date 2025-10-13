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