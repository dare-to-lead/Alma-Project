import { CHANGE_THEME } from "./ActionTypes";

export const changeTheme = (type) => ({
  type: CHANGE_THEME,
  payload: type,
});
