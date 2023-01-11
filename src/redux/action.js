import { CHANGE_THEME } from "./ActionTypes";

//action to chane theme
export const changeTheme = (type) => ({
  type: CHANGE_THEME,
  payload: type,
});
