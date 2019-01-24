import * as actions from "../actions";

const initialState = {
  loading: false,
  measurements: null,
  temperature: "",
  latitude: null,
  longitude: null,
  timestamp: "",
  data: {}
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneMeasurementsRecevied = (state, action) => {
  const { measurements } = action;
  if (!measurements) return state;
  const { metric, latitude, longitude, timestamp} = measurements;

  return {
    ...state,
    loading: false,
    latitude,
    longitude,
    temperature: metric,
    timestamp: timestamp,
    data: action.data,
  };
};

const handlers = {
  [actions.FETCH_DRONE_MEASUREMENTS]: startLoading,
  [actions.DRONE_MEASUREMENTS_RECEIVED]: droneMeasurementsRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};