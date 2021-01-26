import { BALANCE, LOGOUT } from '../actions/user'

const initialState = {
  balance: null,
  currency: null
  // user_id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BALANCE:
      return {
        balance: action.balance,
        currency: action.currency,
        // user_id: action.user_id,
      }
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     user_id: action.user_id,
    //   }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
