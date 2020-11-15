const initialState = {
  email: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: any) => {
  if (action.type === 'SET_MAIL') {
    return { ...state, email: action.payload.email }
  }

  return state
}
