import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { errorMessage: "", token: action.payload };
      break;
    case "SIGNOUT":
      return { errorMessage: "", token: null };
      break;
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: "" };
      break;
    case "ERROR":
      return { ...state, errorMessage: action.payload, token: null };
      break;
    default:
      return state;
  }
};

const signup = (dispatch) => async (email, password) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    return dispatch({ type: "SIGNIN", payload: response.data.token });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error.response.data });
  }
};

const signin = (dispatch) => async (email, password) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    return dispatch({ type: "SIGNIN", payload: response.data.token });
  } catch (error) {
    console.log("signing in", error.response.data);
    return dispatch({ type: "ERROR", payload: error.response.data });
  }
};

const clear_error = (dispatch) => () => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");

  return dispatch({ type: "SIGNOUT" });
};

const try_local_signin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    return dispatch({ type: "SIGNIN", payload: token });
  }
};
const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signout, signup, clear_error, try_local_signin },
  { token: null, errorMessage: "" }
);

export { Context, Provider };
