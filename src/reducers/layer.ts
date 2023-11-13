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
  // resetStatus,
  ActionStatus,
} from '../utils/reducerUtils';

export type Layer = {
  id: string;
  spaceId: string;
  exhibitionId: string;
  order: number;
  isDefault: boolean;
  isHide: boolean;
  isDeleted: boolean;
  title: string;
  createdAt: number;
  version: number;
};

interface LayerState {
  layers: Array<Layer>; // 삭제되지 않은 모든 레이어
  currentLayers: Array<string>; // 활성화 된 레이어 아이디
  getAllLayersStatus: ActionStatus;
}
// 글로벌 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: LayerState = {
  layers: [],
  currentLayers: [],
  getAllLayersStatus: createStatus(),
};

// 액션들의 집합.
export const actions = {
  GET_ALL_LAYERS_REQUEST: 'GET_ALL_LAYERS_REQUEST',
  GET_ALL_LAYERS_SUCCESS: 'GET_ALL_LAYERS_SUCCESS',
  GET_ALL_LAYERS_FAILURE: 'GET_ALL_LAYERS_FAILURE',
  SET_CURRENT_LAYERS: 'SET_CURRENT_LAYERS',
  TOGGLE_LAYER: 'TOGGLE_LAYER',
};

// 액션 크리에이터. dispatch 내부에서 사용.
// 모든 오브젝트를 가져오는 액션. by는 어떤 기준으로 가져올지를 정한다.
export const getAllLayersAction = (id: string) => ({
  type: actions.GET_ALL_LAYERS_REQUEST,
  id, // exhibitionId
});
export const setCurrentLayersAction = (ids: Array<string>) => ({
  type: actions.SET_CURRENT_LAYERS,
  ids,
});
export const toggleLayerAction = (id: string) => ({
  type: actions.TOGGLE_LAYER,
  id,
});

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_CURRENT_LAYERS:
        draft.currentLayers = action.ids;
        break;
      case actions.TOGGLE_LAYER:
        const index = draft.currentLayers.findIndex((id) => id === action.id);
        if (index === -1) {
          draft.currentLayers.push(action.id);
        } else {
          draft.currentLayers.splice(index, 1);
        }
        break;
      case actions.GET_ALL_LAYERS_REQUEST:
        draft.getAllLayersStatus = createRequestStatus();
        break;
      case actions.GET_ALL_LAYERS_SUCCESS:
        draft.getAllLayersStatus = createSuccessStatus();
        draft.layers = action.data;
        break;
      case actions.GET_ALL_LAYERS_FAILURE:
        draft.getAllLayersStatus = createFailureStatus(action.error);
        break;
      default:
        break;
    }
  });

export default reducer;
