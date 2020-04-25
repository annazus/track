import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRACKS":
      return { errorMessage: "", tracks: action.payload };
      break;
    case "SAVE_TRACK":
      return state;
      break;
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errorMessage: "" };
      break;
    case "ERROR":
      return { ...state, errorMessage: action.payload };
      break;
    default:
      return state;
  }
};

const save_track = (dispatch) => async (trackName, locations) => {
  try {
    const response = await trackerApi.post("/tracks", {
      name: trackName,
      locations,
    });
    return dispatch({ type: "SAVE_TRACK" });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: "Error saving track" });
  }
};

const clear_error = (dispatch) => () => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const get_tracks = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/tracks");
    dispatch({ type: "GET_TRACKS", payload: response.data });
  } catch (err) {
    console.log(err);
    return dispatch({ type: "ERROR", payload: "Error getting tracks" });
  }
};

const { Context, Provider } = createDataContext(
  trackReducer,
  { save_track, clear_error, get_tracks },
  { errorMessage: "", tracks: [] }
);

export { Context, Provider };
