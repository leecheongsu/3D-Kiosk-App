// 현재 사용하지 않는 사가. 관리자 업데이트 할 경우 사용할 예정
import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducers/collection';
import { rsfDB } from '../lib/firebase';

// call은 동기, fork는 비동기 요청
function* getObjectData(action) {
  const { objectType, collectionId, id } = action;
  try {
    const snapshot = yield call(rsfDB.getDocument, `Collection/${collectionId}/${objectType}/${id}`);
    yield put({
      type: actions.GET_OBJECT_DATA_SUCCESS,
      data: snapshot.data(),
    });
  } catch (err: any) {
    yield put({
      type: actions.GET_OBJECT_DATA_FAILURE,
      error: err.message,
    });
  }
}

function* watchGetObjectData() {
  yield takeEvery<string>(actions.GET_OBJECT_DATA_REQUEST, getObjectData);
}

export default function* globalSaga() {
  yield all([fork(watchGetObjectData)]);
}
