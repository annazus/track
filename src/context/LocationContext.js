import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "START_RECORDING":
      return { ...state, isRecording: !state.isRecording };
      break;
    case "SAVE_RECORDING":
      return { ...state, trackName: "" };

      break;
    case "STOP_RECORDING":
      return { ...state, isRecording: !state.isRecording };
      sd;
      break;
    case "ADD_CURRENT_LOCATION":
      return {
        ...state,
        currentLocation: action.payload,
        locations: state.isRecording
          ? [...state.locations, action.payload]
          : state.locations,
      };
    case "ADD_LOCATION":
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case "CHANGE_NAME":
      return {
        ...state,
        trackName: action.payload,
      };
      break;
    case "STOP_RECORDING":
      return { ...state, isRecording: false };
      break;

    default:
      return state;
  }
};

const start_recording = (dispatch) => async () => {
  dispatch({ type: "START_RECORDING" });
};
const stop_recording = (dispatch) => async () => {
  dispatch({ type: "STOP_RECORDING" });
};
const add_current_location = (dispatch) => async (location) => {
  dispatch({ type: "ADD_CURRENT_LOCATION", payload: location });
};
const add_location = (dispatch) => async (location) => {
  dispatch({ type: "ADD_CURRENT_LOCATION", payload: location });
};

const change_name = (dispatch) => async (name) => {
  dispatch({ type: "CHANGE_NAME", payload: name });
};
const save_recording = (dispatch) => async (track) => {
  dispatch({ type: "SAVE_RECORDING", payload: track });
};

const { Context, Provider } = createDataContext(
  locationReducer,
  {
    start_recording,
    stop_recording,
    add_location,
    add_current_location,
    change_name,
    save_recording,
  },
  { isRecording: false, currentLocation: null, locations: [], trackName: "" }
);

export { Context, Provider };
