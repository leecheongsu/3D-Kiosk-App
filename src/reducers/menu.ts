// 편집 시 활용하는 레이어 대한 스토어
// 오브젝트는 레이어에 종속되어 있으며, 레이어는 전시에 종속되어 있다.

import { enableAllPlugins } from 'immer';
enableAllPlugins();
import { produce } from 'immer';
import {
  createStatus,
  createRequestStatus,
  createSuccessStatus,
  createFailureStatus,
  resetStatus,
  ActionStatus,
} from '../utils/reducerUtils';
import { Action, ActionType } from '../types/actions';

export type Menu = {
  id?: string;
  hasChild: boolean;
  parentId: string;
  order: number;
  depth: number;
  title: string;
  action: Action;
  isDeleted?: boolean;
  version: number;
};
export type RoomMenu = {
  id: string;
  roomId: string;
  hasChild: boolean;
  parentId: string;
  order: number;
  depth: number;
  title: string;
  action: any;
  isDeleted: boolean;
  version: number;
};

interface MenuState {
  menu: Array<Menu>;
  roomMenu: Array<RoomMenu>;
  getAllMenuStatus: ActionStatus;
  syncAllMenuStatus: ActionStatus;
  postMenuStatus: ActionStatus;
  updateMenuStatus: ActionStatus;
  deleteMenuStatus: ActionStatus;
}
// 글로벌 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: MenuState = {
  menu: [],
  roomMenu: [],
  getAllMenuStatus: createStatus(),
  syncAllMenuStatus: createStatus(),
  postMenuStatus: createStatus(),
  updateMenuStatus: createStatus(),
  deleteMenuStatus: createStatus(),
};

// 액션들의 집합.
export const actions = {
  GET_ALL_MENU_REQUEST: 'GET_ALL_MENU_REQUEST',
  GET_ALL_MENU_SUCCESS: 'GET_ALL_MENU_SUCCESS',
  GET_ALL_MENU_FAILURE: 'GET_ALL_MENU_FAILURE',
  SYNC_ALL_MENU_REQUEST: 'SYNC_ALL_MENU_REQUEST',
  SYNC_ALL_MENU_SUCCESS: 'SYNC_ALL_MENU_SUCCESS',
  SYNC_ALL_MENU_FAILURE: 'SYNC_ALL_MENU_FAILURE',
  SYNC_ALL_MENU_DONE: 'SYNC_ALL_MENU_DONE',
  POST_MENU_REQUEST: 'POST_MENU_REQUEST',
  POST_MENU_SUCCESS: 'POST_MENU_SUCCESS',
  POST_MENU_FAILURE: 'POST_MENU_FAILURE',
  POST_MENU_STATUS_RESET: 'POST_MENU_STATUS_RESET',
  UPDATE_MENU_REQUEST: 'UPDATE_MENU_REQUEST',
  UPDATE_MENU_SUCCESS: 'UPDATE_MENU_SUCCESS',
  UPDATE_MENU_FAILURE: 'UPDATE_MENU_FAILURE',
  UPDATE_MENU_STATUS_RESET: 'UPDATE_MENU_STATUS_RESET',
  DELETE_MENU_REQUEST: 'DELETE_MENU_REQUEST',
  DELETE_MENU_SUCCESS: 'DELETE_MENU_SUCCESS',
  DELETE_MENU_FAILURE: 'DELETE_MENU_FAILURE',
  DELETE_MENU_STATUS_RESET: 'DELETE_MENU_STATUS_RESET',
  SET_MENU: 'SET_MENU',
};

// 액션 크리에이터. dispatch 내부에서 사용.
// 메뉴를 저장하는 액션
export const getMenuAction = (menu: Array<Menu>) => ({
  type: actions.SET_MENU,
  menu,
});
// 메뉴를 갖고 오는 액션
export const getAllMenuAction = (id: string) => ({
  type: actions.GET_ALL_MENU_REQUEST,
  id,
});
// 메뉴를 갖고 오는 액션
export const syncAllMenuAction = (id: string) => ({
  type: actions.SYNC_ALL_MENU_REQUEST,
  id,
});
// 메뉴 싱크를 끝내는 액션
export const syncAllMenuDoneAction = () => ({
  type: actions.SYNC_ALL_MENU_DONE,
});
// 메뉴를 추가하는 액션
export const postMenuAction = (exhibitionId: string, data: Menu) => ({
  type: actions.POST_MENU_REQUEST,
  exhibitionId,
  data,
});
export const updateMenuAction = (exhibitionId: string, id: string, data) => ({
  type: actions.UPDATE_MENU_REQUEST,
  exhibitionId,
  id,
  data,
});
export const deleteMenuAction = (exhibitionId: string, id: string) => ({
  type: actions.DELETE_MENU_REQUEST,
  exhibitionId,
  id,
});
export const resetPostMenuStatusAction = () => ({
  type: actions.POST_MENU_STATUS_RESET,
});
export const resetUpdateMenuStatusAction = () => ({
  type: actions.UPDATE_MENU_STATUS_RESET,
});
export const resetDeleteMenuStatusAction = () => ({
  type: actions.DELETE_MENU_REQUEST,
});

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_MENU:
        draft.menu = action.menu;
        break;
      case actions.GET_ALL_MENU_REQUEST:
        draft.getAllMenuStatus = createRequestStatus();
        break;
      case actions.GET_ALL_MENU_SUCCESS:
        draft.getAllMenuStatus = createSuccessStatus();
        draft.menu = action.data;
        break;
      case actions.GET_ALL_MENU_FAILURE:
        draft.getAllMenuStatus = createFailureStatus(action.error);
        break;
      case actions.SYNC_ALL_MENU_REQUEST:
        draft.syncAllMenuStatus = createRequestStatus();
        break;
      case actions.SYNC_ALL_MENU_SUCCESS:
        draft.syncAllMenuStatus = createSuccessStatus();
        draft.menu = action.data;
        break;
      case actions.SYNC_ALL_MENU_FAILURE:
        draft.syncAllMenuStatus = createFailureStatus(action.error);
        break;
      case actions.SYNC_ALL_MENU_DONE:
        draft.syncAllMenuStatus = resetStatus();
        draft.menu = [];
        break;
      case actions.POST_MENU_REQUEST:
        draft.postMenuStatus = createRequestStatus();
        break;
      case actions.POST_MENU_SUCCESS:
        draft.postMenuStatus = createSuccessStatus();
        break;
      case actions.POST_MENU_FAILURE:
        draft.postMenuStatus = createFailureStatus(action.error);
        break;
      case actions.POST_MENU_STATUS_RESET:
        draft.postMenuStatus = resetStatus();
        break;
      case actions.UPDATE_MENU_REQUEST:
        draft.updateMenuStatus = createRequestStatus();
        break;
      case actions.UPDATE_MENU_SUCCESS:
        draft.updateMenuStatus = createSuccessStatus();
        break;
      case actions.UPDATE_MENU_FAILURE:
        draft.updateMenuStatus = createFailureStatus(action.error);
        break;
      case actions.UPDATE_MENU_STATUS_RESET:
        draft.updateMenuStatus = resetStatus();
        break;
      case actions.DELETE_MENU_REQUEST:
        draft.deleteMenuStatus = createRequestStatus();
        break;
      case actions.DELETE_MENU_SUCCESS:
        draft.deleteMenuStatus = createSuccessStatus();
        break;
      case actions.DELETE_MENU_FAILURE:
        draft.deleteMenuStatus = createFailureStatus(action.error);
        break;
      case actions.DELETE_MENU_STATUS_RESET:
        draft.deleteMenuStatus = resetStatus();
        break;

      default:
        break;
    }
  });

export default reducer;
