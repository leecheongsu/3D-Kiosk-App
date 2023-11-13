import { all, fork, put, call, takeEvery, takeLatest, take, cancel } from 'redux-saga/effects';
import { actions } from '../reducers/menu';
import { firestore, rsfDB } from '../lib/firebase';

// call은 동기, fork는 비동기 요청
// function* getLayer(action) {
//   const { id } = action;
//   try {
//     const data = yield call(rsfDB.getDocument, `Layer/${id}`);
//     yield put({
//       type: actions.GET_LAYER_SUCCESS,
//       data: data.data(),
//     });
//   } catch (err) {
//     yield put({
//       type: actions.GET_LAYER_FAILURE,
//       error: err.message,
//     });
//   }
// }
function* getAllMenu(action) {
  const { id } = action;
  try {
    let query = null;
    query = firestore()
      .collection('Exhibition')
      .doc(id)
      .collection('Menu')
      .where('isDeleted', '==', false)
      .orderBy('order', 'asc');
    const snapshot = yield call(rsfDB.getCollection, query);

    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    const parents = data.filter((item) => item.depth === 0);
    const children = data.filter((item) => item.depth === 1);
    const filteredData = [];
    parents.forEach((parent) => {
      filteredData.push(parent);
      children.forEach((child) => {
        if (child.parentId === parent.id) {
          filteredData.push(child);
        }
      });
    });
    yield put({
      type: actions.GET_ALL_MENU_SUCCESS,
      data: filteredData,
    });
  } catch (err) {
    yield put({
      type: actions.GET_ALL_MENU_FAILURE,
      error: (err as Error).message,
    });
  }
}
function* syncAllMenu(action) {
  const { id } = action;
  try {
    let query = null;
    query = firestore()
      .collection('Exhibition')
      .doc(id)
      .collection('Menu')
      .where('isDeleted', '==', false)
      .orderBy('order', 'asc');
    const task = yield fork(rsfDB.syncDocument, query, {
      successActionCreator: (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
            updatedAt: null,
            createAt: null,
          });
        });
        const parents = data.filter((item) => item.depth === 0);
        const children = data.filter((item) => item.depth === 1);
        const filteredData = [];
        parents.forEach((parent) => {
          filteredData.push(parent);
          children.forEach((child) => {
            if (child.parentId === parent.id) {
              filteredData.push(child);
            }
          });
        });

        return { type: actions.SYNC_ALL_MENU_SUCCESS, data: filteredData };
      },
      failureActionCreator: (err) => ({
        type: actions.SYNC_ALL_MENU_FAILURE,
        err: err.message,
      }),
    });
    yield take(actions.SYNC_ALL_MENU_DONE);
    yield cancel(task);
  } catch (err) {
    yield put({
      type: actions.SYNC_ALL_MENU_FAILURE,
      error: (err as Error).message,
    });
  }
}
function* postMenu(action) {
  const { exhibitionId, data } = action;
  try {
    yield call(rsfDB.addDocument, `Exhibition/${exhibitionId}/Menu`, {
      ...data,
      isDeleted: false,
    });
    yield put({
      type: actions.POST_MENU_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: actions.POST_MENU_FAILURE,
      error: (err as Error).message,
    });
  }
}

function* updateMenu(action) {
  // input에 대한 내용만 업데이트 가능함.
  const { exhibitionId, id, data } = action;
  try {
    yield call(
      rsfDB.updateDocument,
      `Exhibition/${exhibitionId}/Menu/${id}`,
      data,
      // updatedAt: firestore.FieldValue.serverTimestamp(),
    );
    yield put({
      type: actions.UPDATE_MENU_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: actions.UPDATE_MENU_FAILURE,
      error: (err as Error).message,
    });
  }
}

function* deleteMenuData(action) {
  const { exhibitionId, id } = action;
  try {
    yield call(rsfDB.updateDocument, `Exhibition/${exhibitionId}/Menu/${id}`, {
      isDeleted: true,
    });
    yield put({
      type: actions.DELETE_MENU_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: actions.DELETE_MENU_FAILURE,
      error: (err as Error).message,
    });
  }
}
// function* deleteLayersData(action) {
//   // by :  "exhibition" | "layer"
//   const { exhibitionId } = action;

//   try {
//     if (exhibitionId) {
//       const docs = yield firestore()
//         .collection("Exhibition")
//         .doc(exhibitionId)
//         .collection("Layer")
//         .get();
//       const batch = firestore().batch();
//       docs.forEach(doc => {
//         batch.update(doc.ref, {
//           isDeleted: true,
//         });
//       });
//       yield batch.commit();
//     } else {
//       yield put({
//         type: actions.DELETE_LAYERS_FAILURE,
//         error: "exhibitionId required",
//       });
//     }
//     yield put({
//       type: actions.DELETE_LAYERS_SUCCESS,
//     });
//   } catch (err) {
//     yield put({
//       type: actions.DELETE_LAYERS_FAILURE,
//       error: err.message,
//     });
//   }
// }

// function* watchGetLayer() {
//   yield takeEvery<string>(actions.GET_LAYER_REQUEST, getLayer);
// }
function* watchGetAllMenus() {
  yield takeEvery<string>(actions.GET_ALL_MENU_REQUEST, getAllMenu);
}
function* watchSyncAllMenus() {
  yield takeEvery<string>(actions.SYNC_ALL_MENU_REQUEST, syncAllMenu);
}
function* watchPostMenu() {
  yield takeLatest<string>(actions.POST_MENU_REQUEST, postMenu);
}
function* watchUpdateMenu() {
  yield takeLatest<string>(actions.UPDATE_MENU_REQUEST, updateMenu);
}
function* watchDeleteMenu() {
  yield takeLatest<string>(actions.DELETE_MENU_REQUEST, deleteMenuData);
}
// // function* watchUpdateMenus() {
// //   yield takeLatest<string>(actions.UPDATE_MenuS_REQUEST, updateMenusData);
// // }
// function* watchDeleteMenus() {
//   yield takeLatest<string>(actions.DELETE_MenuS_REQUEST, deleteMenusData);
// }
export default function* MenuSaga() {
  yield all([
    fork(watchGetAllMenus),
    fork(watchSyncAllMenus),
    fork(watchPostMenu),
    fork(watchUpdateMenu),
    fork(watchDeleteMenu),
  ]);
}
