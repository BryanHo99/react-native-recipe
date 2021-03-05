import { LightTheme } from "../../themes";
import { SWITCH_THEME } from "../actions";

const initialState = {
  theme: LightTheme,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { theme: action.theme };

    default:
      return state;
  }
};

export default themeReducer;
