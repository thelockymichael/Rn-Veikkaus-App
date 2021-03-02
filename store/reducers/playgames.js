import { MULTISCORE_DATA } from '../actions/playgames';

const initialState = {
  multiscore: null,
  // user_id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MULTISCORE_DATA:
      console.log('aktus', action.multiscoreData);
      return {
        multiscore: action.multiscoreData,
        // user_id: action.user_id,
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     user_id: action.user_id,
    //   }

    default:
      return state;
  }
};
