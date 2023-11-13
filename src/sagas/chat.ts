import { all, fork, call, put, takeEvery, take, cancel } from 'redux-saga/effects';
import axios from 'axios';

import { actions } from '../reducers/chat';
import { rsfDB, firestore } from '../lib/firebase';
import type { Chat } from '../reducers/chat';
// import { Notifier } from "../utils/notify/Notifier";
// import { sendNotifier } from "../utils/notify/NotifyPolicy";

// call은 동기, fork는 비동기 요청
function* syncNumberOfChat(action) {
  const { id, number } = action;
  const task = yield fork(
    rsfDB.syncDocument,
    firestore()
      .collectionGroup('Chat')
      .where('channelId', '==', id)
      .where('isDeleted', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(number),
    {
      successActionCreator: (data) => {
        let chats: Array<Chat> = [];
        data.forEach((doc) => {
          chats = [
            {
              id: doc.id,
              name: doc.data().name,
              type: doc.data().type,
              value: doc.data().value,
              target: doc.data()?.targetId,
              createdAt: doc.data().createdAt?.seconds * 1000,
              channelId: doc.data().channelId,
            },
            ...chats,
          ];
        });
        return {
          type: actions.SYNC_NUMBER_OF_CHAT_SUCCESS,
          data: chats,
        };
      },
      failureActionCreator: (err) => ({
        type: actions.SYNC_NUMBER_OF_CHAT_FAILURE,
        err: err.message,
      }),
    },
  );
  yield take(actions.SYNC_NUMBER_OF_CHAT_DONE);
  yield cancel(task);
}

function* postChat(action) {
  const { id, data }: { id: string; data: { type: 'text'; name: string; value: string; password: string } } = action;
  // 댓글 입력을 진행할 경우, 유저를 저장한다.
  yield put({
    type: actions.SAVE_USER,
    name: data.name,
    password: data.password,
  });

  try {
    const snapshot = yield call(rsfDB.addDocument, `Channel/${id}/Chat`, {
      ...data,
      channelId: id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      isDeleted: false,
    });
    // delete 기능을 위해 생성된 id값 추가
    yield call(rsfDB.updateDocument, `Channel/${id}/Chat/${snapshot.id}`, { id: snapshot.id });

    // sendNotifier({
    //   type: Notifier.typeConst.Chat,
    //   exhibitionId: id,
    //   objectId: null,
    //   writer: data.name,
    //   content: data.value,
    // });

    yield put({
      type: actions.POST_CHAT_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: actions.POST_CHAT_FAILURE,
      error: err.message,
    });
  }
}

function* deleteChat(action) {
  const { channelId, commentId, password }: { channelId: string; commentId: string; password: string } = action;
  try {
    const target = yield call(
      rsfDB.getDocument,
      firestore()
        .collection('Channel')
        .doc(channelId)
        .collection('Chat')
        .where('id', '==', commentId)
        .where('password', '==', password)
        .limit(1),
    );

    if (target.size > 0)
      yield call(rsfDB.updateDocument, `Channel/${channelId}/Chat/${commentId}`, { isDeleted: true });
    else throw new Error('비밀번호가 틀렸습니다. 비밀번호를 다시 입력해주세요');

    yield put({
      type: actions.DELETE_CHAT_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: actions.DELETE_CHAT_FAILURE,
      error: err.message,
    });
  }
}

function* watchSyncNumberOfChat() {
  yield takeEvery<string>(actions.SYNC_NUMBER_OF_CHAT_REQUEST, syncNumberOfChat);
}
function* watchPostChat() {
  yield takeEvery<string>(actions.POST_CHAT_REQUEST, postChat);
}
function* watchDeleteChat() {
  yield takeEvery<string>(actions.DELETE_CHAT_REQUEST, deleteChat);
}

// function* watchUpdateGlobalData() {
//   yield takeEvery<string>(actions.UPDATE_GLOBAL_DATA_REQUEST, updateGlobalData);
// }
export default function* chatSaga() {
  yield all([fork(watchSyncNumberOfChat), fork(watchPostChat), fork(watchDeleteChat)]);
}
