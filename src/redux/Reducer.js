import { CHANGE_THEME } from "./ActionTypes";

//set light theme as default
export const Reducer = (state = "light", action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.payload;

    default:
      return state;
  }
};
