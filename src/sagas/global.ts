import { all, fork, put, call, takeEvery, take, cancel } from 'redux-saga/effects';
import { actions } from '../reducers/global';
import { GLOBAL_DATA_KEY } from '../constants';
import { rsfDB } from '../lib/firebase';

// call은 동기, fork는 비동기 요청
function* syncGlobalData() {
  const task = yield fork(rsfDB.syncDocument, `Global/${GLOBAL_DATA_KEY}`, {
    successActionCreator: (data) => ({
      type: actions.SYNC_GLOBAL_DATA_SUCCESS,
      data: data.data(),
    }),
    failureActionCreator: (err) => ({
      type: actions.SYNC_GLOBAL_DATA_FAILURE,
      err: err.message,
    }),
  });
  yield take(actions.SYNC_GLOBAL_DATA_DONE);
  yield cancel(task);
}
function* getGlobalData(action) {
  const { exhibitionId } = action;
  try {
    const globalSnapshot = yield call(rsfDB.getDocument, `Global/${GLOBAL_DATA_KEY}`);
    const exhibitionSnapshot = yield call(rsfDB.getDocument, `Exhibition/${exhibitionId}`);
    yield put({
      type: actions.GET_GLOBAL_DATA_SUCCESS,
      globalData: globalSnapshot.data(),
      hasMenuButton: exhibitionSnapshot.data().hasMenuButton,
      isCustomized: exhibitionSnapshot.data().isCustomized,
      hasTitle: exhibitionSnapshot.data().hasTitle,
      hasView: exhibitionSnapshot.data().hasView,
      hasSize: exhibitionSnapshot.data().hasSize,
      hasTag: exhibitionSnapshot.data().hasTag,
      hasMenuOptions: exhibitionSnapshot.data().hasMenuOptions,
      globalOption: exhibitionSnapshot.data().defaultGlobalOptions,
      queryOption: exhibitionSnapshot.data().queryOption,
      isPlatform: exhibitionSnapshot.data().isPlatform,
      plan: exhibitionSnapshot.data().plan,
      expiredAt: exhibitionSnapshot.data().expiredAt?.seconds * 1000,
      paidAt: exhibitionSnapshot.data().paidAt?.seconds * 1000,
    });
  } catch (err: any) {
    yield put({
      type: actions.GET_GLOBAL_DATA_FAILURE,
      error: err.message,
    });
  }
}
function* updateGlobalData(action) {
  const { target, value }: { target: string; value: string } = action;
  try {
    yield call(rsfDB.updateDocument, `Global/${GLOBAL_DATA_KEY}`, target, value);
    yield put({
      type: actions.UPDATE_GLOBAL_DATA_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: actions.UPDATE_GLOBAL_DATA_FAILURE,
      error: err.message,
    });
  }
}

function* watchSyncGlobalData() {
  yield takeEvery<string>(actions.SYNC_GLOBAL_DATA_REQUEST, syncGlobalData);
}
function* watchGetGlobalData() {
  yield takeEvery<string>(actions.GET_GLOBAL_DATA_REQUEST, getGlobalData);
}

function* watchUpdateGlobalData() {
  yield takeEvery<string>(actions.UPDATE_GLOBAL_DATA_REQUEST, updateGlobalData);
}
export default function* globalSaga() {
  yield all([fork(watchSyncGlobalData), fork(watchUpdateGlobalData), fork(watchGetGlobalData)]);
}
