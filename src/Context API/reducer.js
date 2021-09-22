export const initialState = {
  currentuser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CURRENTUSER":
      return { ...state, currentuser: action.currentuser };
    default:
      return { ...state };
  }
};

export default reducer;
