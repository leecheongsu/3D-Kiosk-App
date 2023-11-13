import { enableAllPlugins } from 'immer';
import { produce } from 'immer';
import {
  createStatus,
  createRequestStatus,
  createSuccessStatus,
  createFailureStatus,
  resetStatus,
  ActionStatus,
} from '../utils/reducerUtils';

enableAllPlugins();
export type Chat = {
  id: string;
  target?: string;
  name: string;
  type: 'text' | 'file';
  value: string;
  createdAt: number;
  channelId: string;
};

interface GlobalState {
  chatLength: number;
  currentChats: Array<Chat>;
  objectChats: Array<Chat>;
  currentUser: {
    name: string;
    password: string;
    audio: boolean;
    video: boolean;
  };
  syncNumberOfChatsStatus: ActionStatus;
  syncNumberOfObjectChatsStatus: ActionStatus;
  postChatStatus: ActionStatus;
  postObjectChatStatus: ActionStatus;
  deleteChatStatus: ActionStatus;
  deleteObjectChatStatus: ActionStatus;
}
// 채팅 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: GlobalState = {
  chatLength: 0,
  currentChats: [],
  objectChats: [],
  // 댓글 입력한 사람 임시 저장소. 세션스토리지에도 저장할 예정.
  currentUser: {
    name: '',
    password: '',
    audio: false,
    video: false,
  },
  // status는 loading, done, error을 갖고있음.
  syncNumberOfChatsStatus: createStatus(),
  syncNumberOfObjectChatsStatus: createStatus(),
  postChatStatus: createStatus(),
  deleteChatStatus: createStatus(),
  postObjectChatStatus: createStatus(),
  deleteObjectChatStatus: createStatus(),
};

// 액션들의 집합.
export const actions = {
  SYNC_NUMBER_OF_CHAT_REQUEST: 'SYNC_NUMBER_OF_CHAT_REQUEST',
  SYNC_NUMBER_OF_CHAT_SUCCESS: 'SYNC_NUMBER_OF_CHAT_SUCCESS',
  SYNC_NUMBER_OF_CHAT_FAILURE: 'SYNC_NUMBER_OF_CHAT_FAILURE',
  SYNC_NUMBER_OF_CHAT_DONE: 'SYNC_NUMBER_OF_CHAT_DONE',
  POST_CHAT_REQUEST: 'POST_CHAT_REQUEST',
  POST_CHAT_SUCCESS: 'POST_CHAT_SUCCESS',
  POST_CHAT_FAILURE: 'POST_CHAT_FAILURE',
  DELETE_CHAT_REQUEST: 'DELETE_CHAT_REQUEST',
  DELETE_CHAT_SUCCESS: 'DELETE_CHAT_SUCCESS',
  DELETE_CHAT_FAILURE: 'DELETE_CHAT_FAILURE',
  POST_OBJECT_CHAT_REQUEST: 'POST_OBJECT_CHAT_REQUEST',
  POST_OBJECT_CHAT_SUCCESS: 'POST_OBJECT_CHAT_SUCCESS',
  POST_OBJECT_CHAT_FAILURE: 'POST_OBJECT_CHAT_FAILURE',
  DELETE_OBJECT_CHAT_REQUEST: 'DELETE_OBJECT_CHAT_REQUEST',
  DELETE_OBJECT_CHAT_SUCCESS: 'DELETE_OBJECT_CHAT_SUCCESS',
  DELETE_OBJECT_CHAT_FAILURE: 'DELETE_OBJECT_CHAT_FAILURE',
  LOAD_CHAT_NUMBER: 'LOAD_CHAT_NUMBER',
  SYNC_NUMBER_OF_OBJECT_CHAT_REQUEST: 'SYNC_NUMBER_OF_OBJECT_CHAT_REQUEST',
  SYNC_NUMBER_OF_OBJECT_CHAT_SUCCESS: 'SYNC_NUMBER_OF_OBJECT_CHAT_SUCCESS',
  SYNC_NUMBER_OF_OBJECT_CHAT_FAILURE: 'SYNC_NUMBER_OF_OBJECT_CHAT_FAILURE',
  SYNC_NUMBER_OF_OBJECT_CHAT_DONE: 'SYNC_NUMBER_OF_OBJECT_CHAT_DONE',
  RESET_DELETE_CHAT_STATUS: 'RESET_DELETE_CHAT_STATUS',
  // 댓글 입력을 위한 유저 저장 및 로드.
  SAVE_USER: 'SAVE_USER',
  LOAD_USER: 'LOAD_USER',
  SAVE_AVATAR_USER: 'SAVE_AVATAR_USER',
  LOAD_AVATAR_USER: 'LOAD_AVATAR_USER',
};

// 액션 크리에이터. dispatch 내부에서 사용.
export const postChatAction = (id: string, data: { type: 'text'; name: string; value: string; password: string }) => ({
  type: actions.POST_CHAT_REQUEST,
  id,
  data,
});
export const postObjectChatAction = (
  id: string,
  target: string,
  data: { type: 'text'; name: string; value: string; password: string },
) => ({
  type: actions.POST_OBJECT_CHAT_REQUEST,
  id,
  target,
  data,
});
export const deleteChatAction = (channelId: string, commentId: string, password: string) => ({
  type: actions.DELETE_CHAT_REQUEST,
  channelId,
  commentId,
  password,
});
export const deleteObjectChatAction = (channelId: string, targetId: string, commentId: string, password: string) => ({
  type: actions.DELETE_OBJECT_CHAT_REQUEST,
  channelId,
  targetId,
  commentId,
  password,
});
export const syncNumberOfObjectChatAction = (id: string, target: string, limit: number) => ({
  type: actions.SYNC_NUMBER_OF_OBJECT_CHAT_REQUEST,
  id,
  target,
  limit,
});
export const resetDeleteChatStatusAction = () => ({
  type: actions.RESET_DELETE_CHAT_STATUS,
});
export const loadUserAction = () => ({
  type: actions.LOAD_USER,
});
export const loadChatNumberAction = (num: number) => ({
  type: actions.LOAD_CHAT_NUMBER,
  num,
});
export const syncNumberOfChatAction = (id: string, number: number) => ({
  type: actions.SYNC_NUMBER_OF_CHAT_REQUEST,
  id,
  number,
});
export const syncNumberOfChatDoneAction = () => ({
  type: actions.SYNC_NUMBER_OF_CHAT_DONE,
});
export const syncNumberOfObjectChatDoneAction = () => ({
  type: actions.SYNC_NUMBER_OF_OBJECT_CHAT_DONE,
});

export const saveAvatarUserAction = (name: string, avatarType: number) => ({
  type: actions.SAVE_AVATAR_USER,
  name,
  avatarType,
});
export const saveUserAction = (name: string, password: string, audio: boolean, video: boolean) => ({
  type: actions.SAVE_USER,
  name,
  password,
  audio,
  video,
});

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // 기본 방명록 채팅 동기화
      case actions.LOAD_CHAT_NUMBER:
        draft.chatLength = action.num;
        break;
      case actions.SYNC_NUMBER_OF_CHAT_REQUEST:
        draft.syncNumberOfChatsStatus = createRequestStatus();
        break;
      case actions.SYNC_NUMBER_OF_CHAT_SUCCESS:
        draft.syncNumberOfChatsStatus = createSuccessStatus();
        draft.currentChats = action.data;
        break;
      case actions.SYNC_NUMBER_OF_CHAT_FAILURE:
        draft.syncNumberOfChatsStatus = createFailureStatus(action.error);
        break;
      // 그림에 딸려있는 채팅 동기화
      case actions.SYNC_NUMBER_OF_OBJECT_CHAT_REQUEST:
        draft.syncNumberOfChatsStatus = createRequestStatus();
        break;
      case actions.SYNC_NUMBER_OF_OBJECT_CHAT_SUCCESS:
        draft.syncNumberOfChatsStatus = createSuccessStatus();
        draft.objectChats = action.data;
        break;
      case actions.SYNC_NUMBER_OF_OBJECT_CHAT_FAILURE:
        draft.syncNumberOfChatsStatus = createFailureStatus(action.error);
        break;
      case actions.POST_CHAT_REQUEST:
        draft.postChatStatus = createRequestStatus();
        break;
      case actions.POST_CHAT_SUCCESS:
        draft.postChatStatus = createSuccessStatus();
        break;
      case actions.POST_CHAT_FAILURE:
        draft.postChatStatus = createFailureStatus(action.error);
        break;
      case actions.DELETE_CHAT_REQUEST:
        draft.deleteChatStatus = createRequestStatus();
        break;
      case actions.DELETE_CHAT_SUCCESS:
        draft.deleteChatStatus = createSuccessStatus();
        break;
      case actions.DELETE_CHAT_FAILURE:
        draft.deleteChatStatus = createFailureStatus(action.error);
        break;
      case actions.POST_OBJECT_CHAT_REQUEST:
        draft.postObjectChatStatus = createRequestStatus();
        break;
      case actions.POST_OBJECT_CHAT_SUCCESS:
        draft.postObjectChatStatus = createSuccessStatus();
        break;
      case actions.POST_OBJECT_CHAT_FAILURE:
        draft.postObjectChatStatus = createFailureStatus(action.error);
        break;
      case actions.DELETE_OBJECT_CHAT_REQUEST:
        draft.deleteObjectChatStatus = createRequestStatus();
        break;
      case actions.DELETE_OBJECT_CHAT_SUCCESS:
        draft.deleteObjectChatStatus = createSuccessStatus();
        break;
      case actions.DELETE_OBJECT_CHAT_FAILURE:
        draft.deleteObjectChatStatus = createFailureStatus(action.error);
        break;
      case actions.RESET_DELETE_CHAT_STATUS:
        draft.deleteChatStatus = resetStatus();
        break;
      case actions.SYNC_NUMBER_OF_OBJECT_CHAT_DONE:
        draft.objectChats = [];
        draft.syncNumberOfObjectChatsStatus = resetStatus();
        break;
      case actions.SYNC_NUMBER_OF_CHAT_DONE:
        draft.syncNumberOfChatsStatus = resetStatus();
        break;
      case actions.LOAD_USER:
        try {
          const user = window.sessionStorage.getItem('currentUser');
          if (user) {
            draft.currentUser = JSON.parse(user);
          }
        } catch {
          console.log('Session Storage is disabled');
        }
        break;
      case actions.SAVE_USER:
        try {
          draft.currentUser.name = action.name;
          draft.currentUser.password = action.password;
          draft.currentUser.audio = action.audio;
          draft.currentUser.video = action.video;
          window.sessionStorage.setItem('currentUser', JSON.stringify(draft.currentUser));
        } catch {
          console.log('Session Storage is disabled');
        }
        break;
      case actions.SAVE_AVATAR_USER:
        break;
      default:
        break;
    }
  });

export default reducer;
