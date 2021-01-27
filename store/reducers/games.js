import { DRAWS, LOGOUT } from '../actions/games'

const initialState = {
  draws: null,
  // user_id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DRAWS:
      return {
        draws: action.draws,
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
