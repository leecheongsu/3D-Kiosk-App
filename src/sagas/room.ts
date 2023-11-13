import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { actions } from '../reducers/room';
import { rsfDB } from '../lib/firebase';

// call은 동기, fork는 비동기 요청
function* getRooms(action) {
  const { exhibitionId } = action;
  try {
    const roomData = yield call(rsfDB.getCollection, `Exhibition/${exhibitionId}/Room`);

    const data = roomData.docs
      .map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        // vertices: doc.data().vertices,
        sweeps: doc.data().sweeps,
        isDeleted: doc.data().isDeleted,
      }))
      .filter((room) => room.isDeleted === false);

    yield put({
      type: actions.GET_ROOMS_SUCCESS,
      data,
    });
  } catch (err: any) {
    yield put({
      type: actions.GET_ROOMS_FAILURE,
      error: err.message,
    });
  }
}

function* watchGetRoom() {
  yield takeLatest<string>(actions.GET_ROOMS_REQUEST, getRooms);
}

export default function* globalSaga() {
  yield all([fork(watchGetRoom)]);
}
