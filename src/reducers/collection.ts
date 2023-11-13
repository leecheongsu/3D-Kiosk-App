// 현재 사용하지 않는 리듀서. 관리자 업데이트 할 경우 사용할 예정
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

export type CollectionObject = {
  // 왜 name & title 둘 다 있을까요?
  name?: string;
  title?: string;
  description: string;

  originalImage?: {
    path: string;
    url: string;
  };
  thumbnailImage?: {
    path: string;
    url: string;
  };
  compressedImage?: {
    path: string;
    url: string;
  };
  link?: {
    isActive: boolean;
    title: string;
    url: string;
  };
  like?: {
    isActive: boolean;
    count: number;
  };
  isValied?: boolean;
  createdAt?: number;
  updatedAt?: number;

  frameThick: number;
  height: number;
  width: number;
  videoUrl?: string;
  audioUrl?: string;
  path?: string;
  iconId?: string;
  iconName?: string;
};

interface CollectionState {
  objectData: CollectionObject;
  getObjectDataStatus: ActionStatus;
  //   updateGlobalDataStatus: ActionStatus;
}
// 오브젝트의 타입
export type ObjectsType = 'Paintings' | 'Videos' | 'Audios';

// 글로벌 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: CollectionState = {
  objectData: {
    name: '',
    title: '',
    description: '',

    originalImage: {
      path: '',
      url: '',
    },
    thumbnailImage: {
      path: '',
      url: '',
    },
    link: {
      isActive: false,
      title: '',
      url: '',
    },
    like: {
      isActive: false,
      count: 0,
    },
    frameThick: 0,
    height: 0,
    width: 0,
    isValied: true,
  },
  // status는 loading, done, error을 갖고있음.
  getObjectDataStatus: createStatus(),
};

// 액션들의 집합.
export const actions = {
  GET_OBJECT_DATA_REQUEST: 'GET_OBJECT_DATA_REQUEST',
  GET_OBJECT_DATA_SUCCESS: 'GET_OBJECT_DATA_SUCCESS',
  GET_OBJECT_DATA_FAILURE: 'GET_OBJECT_DATA_FAILURE',
  RESET_OBJECT_DATA: 'RESET_OBJECT_DATA',
};

// 액션 크리에이터. dispatch 내부에서 사용.
export const getObjectDataAction = (objectType: ObjectsType, collectionId, id) => ({
  type: actions.GET_OBJECT_DATA_REQUEST,
  objectType,
  collectionId,
  id,
});
export const resetObjectDataAction = () => ({ type: actions.RESET_OBJECT_DATA });

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_OBJECT_DATA_REQUEST:
        draft.getObjectDataStatus = createRequestStatus();
        break;
      case actions.GET_OBJECT_DATA_SUCCESS:
        draft.getObjectDataStatus = createSuccessStatus();
        draft.objectData = action.data;
        break;
      case actions.GET_OBJECT_DATA_FAILURE:
        draft.getObjectDataStatus = createFailureStatus(action.error);
        break;
      case actions.RESET_OBJECT_DATA:
        draft.objectData = {
          name: '',
          title: '',
          description: '',

          originalImage: {
            path: '',
            url: '',
          },
          thumbnailImage: {
            path: '',
            url: '',
          },
          link: {
            isActive: false,
            title: '',
            url: '',
          },
          frameThick: 0,
          height: 0,
          width: 0,
          isValied: true,
          like: {
            isActive: false,
            count: 0,
          },
        };
        draft.getObjectDataStatus = resetStatus();
        break;
      default:
        break;
    }
  });

export default reducer;
