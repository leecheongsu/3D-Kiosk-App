import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducers/layer';
import { firestore, rsfDB } from '../lib/firebase';

// call은 동기, fork는 비동기 요청
function* getAllLayers(action) {
  const { id } = action;
  try {
    let query = null;
    query = firestore().collection('Exhibition').doc(id).collection('Layer').where('isDeleted', '==', false);
    const snapshot = yield call(rsfDB.getCollection, query);

    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        spaceId: doc.data()?.spaceId,
        layerId: doc.data()?.layerId,
        type: doc.data()?.type,
        title: doc.data()?.title,
        version: doc.data()?.version,
        isHide: doc.data()?.isHide,
        isDefault: doc.data()?.isDefault,
      });
    });

    yield put({
      type: actions.GET_ALL_LAYERS_SUCCESS,
      data,
    });
  } catch (err) {
    yield put({
      type: actions.GET_ALL_LAYERS_FAILURE,
      error: (err as Error).message,
    });
  }
}

function* watchGetAllLayers() {
  yield takeEvery<string>(actions.GET_ALL_LAYERS_REQUEST, getAllLayers);
}
export default function* layerSaga() {
  yield all([fork(watchGetAllLayers)]);
}
