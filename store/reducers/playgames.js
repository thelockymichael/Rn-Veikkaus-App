import { PLAY_MULTISCORE } from '../actions/games'

const initialState = {
  multiscore: null,
  // user_id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAY_MULTISCORE:
      return {
        multiscore: action.multiscore,
        // user_id: action.user_id,
      }
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     user_id: action.user_id,
    //   }

    default:
      return state
  }
}
