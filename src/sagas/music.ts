import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducers/music';
import { rsfDB } from '../lib/firebase';

// call은 동기, fork는 비동기 요청
function* getMusic(action) {
  const { id } = action;
  try {
    const musicData = yield call(rsfDB.getDocument, `Music/${id}`);
    yield put({
      type: actions.GET_MUSIC_SUCCESS,
      data: musicData.data(),
    });
  } catch (err: any) {
    yield put({
      type: actions.GET_MUSIC_FAILURE,
      error: err.message,
    });
  }
}

function* watchGetMusic() {
  yield takeEvery<string>(actions.GET_MUSIC_REQUEST, getMusic);
}

export default function* globalSaga() {
  yield all([fork(watchGetMusic)]);
}
