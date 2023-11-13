import { all, fork, put, call, takeEvery, take, cancel } from 'redux-saga/effects';

import { actions } from '../reducers/exhibition';
import { firestore, rsfDB } from '../lib/firebase';
import axios from 'axios';
// import { Notifier } from "../utils/notify/Notifier";
// import { sendNotifier } from "../utils/notify/NotifyPolicy";

// call은 동기, fork는 비동기 요청
function* syncExhibitionData(action) {
  const { id } = action;
  const task = yield fork(rsfDB.syncDocument, `Exhibition/${id}`, {
    successActionCreator: data => {
      return {
        type: actions.SYNC_EXHIBITION_DATA_SUCCESS,
        id: data.id,
        data: {
          ...data.data(),
          createdAt: data.data().createdAt ? data.data().createdAt.seconds * 1000 : null,
          updatedAt: data.data().updatedAt ? data.data().updatedAt.seconds * 1000 : null,
          publishedAt: data.data().publishedAt ? data.data().publishedAt.seconds * 1000 : null,
          paidAt: data.data().paidAt ? data.data().paidAt.seconds * 1000 : null,
          expiredAt: data.data().expiredAt ? data.data().expiredAt.seconds * 1000 : null,
        },
      };
    },
    failureActionCreator: err => ({
      type: actions.SYNC_EXHIBITION_DATA_FAILURE,
      err: err.message,
    }),
  });
  yield take(actions.SYNC_EXHIBITION_DATA_DONE);
  yield cancel(task);
}
function* getExhibitionData(action) {
  const { id } = action;
  try {
    const snapshot = yield call(rsfDB.getDocument, `Exhibition/${id}`);
    console.log(snapshot.data());
    yield put({
      type: actions.GET_EXHIBITION_DATA_SUCCESS,
      id: snapshot.id,
      data: {
        ...snapshot.data(),
        createdAt: snapshot.data().createdAt ? snapshot.data().createdAt.seconds * 1000 : null,
        updatedAt: snapshot.data().updatedAt ? snapshot.data().updatedAt.seconds * 1000 : null,
        publishedAt: snapshot.data().publishedAt
          ? snapshot.data().publishedAt.seconds * 1000
          : null,
        paidAt: snapshot.data().paidAt ? snapshot.data().paidAt.seconds * 1000 : null,
        expiredAt: snapshot.data().expiredAt ? snapshot.data().expiredAt.seconds * 1000 : null,
      },
    });
  } catch (err: any) {
    yield put({
      type: actions.GET_EXHIBITION_DATA_FAILURE,
      error: err.message,
    });
  }
}
function* updateExhibitionData(action) {
  const { id, target, value }: { id: string; target: string; value: string } = action;
  try {
    yield call(rsfDB.updateDocument, `Exhibition/${id}`, target, value);
    yield put({
      type: actions.UPDATE_EXHIBITION_DATA_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: actions.UPDATE_EXHIBITION_DATA_FAILURE,
      error: err.message,
    });
  }
}

function* toggleLikeExhibitionButton(action) {
  const { id, ip }: { id: string; ip: string } = action;
  try {
    yield call(
      rsfDB.updateDocument,
      `Exhibition/${id}`,
      "likedIPs",
      firestore.FieldValue.arrayUnion(ip),
    );

    // sendNotifier({
    //   type: Notifier.typeConst.LIKE,
    //   exhibitionId: id,
    //   objectId: null,
    //   writer: null,
    //   content: null,
    // });

    yield put({
      type: actions.UPDATE_EXHIBITION_DATA_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: actions.UPDATE_EXHIBITION_DATA_FAILURE,
      error: err.message,
    });
  }
}

function* getObjectData(action) {
  const { objectType, exhibitionId, id } = action;
  try {
    const { data } = yield axios.post(
      "https://asia-northeast3-gd-virtual-staging.cloudfunctions.net/getObjectData",
      {
        id: exhibitionId,
        objectId: id,
        objectType: objectType,
      },
    );

    yield put({
      type: actions.GET_OBJECT_DATA_SUCCESS,
      data,
      id,
    });

    // const snapshot = yield call(rsfDB.getDocument, `Exhibition/${exhibitionId}/${objectType}/${id}`);
  } catch (err: any) {
    yield put({
      type: actions.GET_OBJECT_DATA_FAILURE,
      error: err.message,
    });
  }
}

function* toggleLikeButton(action) {
  const {
    id,
    target,
    isLiked,
    ip,
    objectType,
  }: { id: string; target: string; isLiked: boolean; ip: string; objectType: string } = action;
  try {
    yield call(rsfDB.updateDocument, `Exhibition/${id}/${objectType}/${target}`, {
      likedIPs: isLiked
        ? firestore.FieldValue.arrayRemove(ip)
        : firestore.FieldValue.arrayUnion(ip),
      likeCount: isLiked ? firestore.FieldValue.increment(-1) : firestore.FieldValue.increment(1),
    });

    yield call(
      rsfDB.updateDocument,
      `Exhibition/${id}`,
      'objectLikeNum',
      isLiked ? firestore.FieldValue.increment(-1) : firestore.FieldValue.increment(1),
    );

    // if (!isLiked) {
    //   sendNotifier({
    //     type: Notifier.typeConst.OBJECTLIKE,
    //     exhibitionId: id,
    //     objectId: target,
    //     writer: null,
    //     content: null,
    //   });
    // }

    yield put({
      type: actions.TOGGLE_LIKE_BUTTON_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: actions.TOGGLE_LIKE_BUTTON_FAILURE,
      error: err.message,
    });
  }
}

function* countView(action) {
  const { id, ip }: { id: string; ip: string } = action;

  try {
    const exhibitionRef = yield call(rsfDB.getDocument, `Exhibition/${id}`);
    // if (!exhibitionRef.data().todayVisitedIP?.includes(ip)) {
    yield call(rsfDB.updateDocument, `Exhibition/${id}`, 'todayVisitedIP', firestore.FieldValue.arrayUnion(ip));
    yield call(rsfDB.updateDocument, `Exhibition/${id}`, 'views.totalView', firestore.FieldValue.increment(1));
    yield call(rsfDB.updateDocument, `Exhibition/${id}`, 'views.todayView', firestore.FieldValue.increment(1));
    yield put({
      type: actions.COUNT_VIEW_SUCCESS,
    });
    // }
  } catch (err: any) {
    yield put({
      type: actions.COUNT_VIEW_FAILURE,
      error: err.message,
    });
  }
}

function* plusCurrentView(action) {
  const { id, randomKey }: { id: string; randomKey: string } = action;

  try {
    yield call(
      rsfDB.updateDocument,
      `Exhibition/${id}`,
      `currentViews.${randomKey}`,
      firestore.FieldValue.increment(1),
    );
    yield put({
      type: actions.PLUS_CURRENT_VIEW_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: actions.PLUS_CURRENT_VIEW_FAILURE,
      error: err.message,
    });
  }
}

function* watchSyncExhibitionData() {
  yield takeEvery<string>(actions.SYNC_EXHIBITION_DATA_REQUEST, syncExhibitionData);
}
function* watchGetExhibitionData() {
  yield takeEvery<string>(actions.GET_EXHIBITION_DATA_REQUEST, getExhibitionData);
}

function* watchUpdateExhibitionData() {
  yield takeEvery<string>(actions.UPDATE_EXHIBITION_DATA_REQUEST, updateExhibitionData);
}
function* watchGetObjectData() {
  yield takeEvery<string>(actions.GET_OBJECT_DATA_REQUEST, getObjectData);
}
function* watchToggleLikeButton() {
  yield takeEvery<string>(actions.TOGGLE_LIKE_BUTTON_REQUEST, toggleLikeButton);
}
function* watchToggleLikeExhibitionButton() {
  yield takeEvery<string>(
    actions.TOGGLE_LIKE_EXHIBITION_BUTTON_REQUEST,
    toggleLikeExhibitionButton,
  );
}
function* watchCountView() {
  yield takeEvery<string>(actions.COUNT_VIEW_REQUEST, countView);
}
function* watchPlusCurrentView() {
  yield takeEvery<string>(actions.PLUS_CURRENT_VIEW_REQUEST, plusCurrentView);
}
export default function* globalSaga() {
  yield all([
    fork(watchSyncExhibitionData),
    fork(watchGetExhibitionData),
    fork(watchUpdateExhibitionData),
    fork(watchGetObjectData),
    fork(watchToggleLikeButton),
    fork(watchToggleLikeExhibitionButton),
    fork(watchCountView),
    fork(watchPlusCurrentView),
  ]);
}
