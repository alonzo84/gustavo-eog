import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchMetrics(action) {
  const { error, data } = yield call(
    API.getDroneMeasurements
  );
  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  const measurements = data[0] ? data[0] : false;
  if (!measurements) {
    yield put({ type: actions.API_ERROR });
    yield cancel();
    return;
  }
  yield put({ type: actions.DRONE_MEASUREMENTS_RECEIVED, measurements: measurements });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE_MEASUREMENTS, watchFetchMetrics)
  ]);
}

export default [watchAppLoad];