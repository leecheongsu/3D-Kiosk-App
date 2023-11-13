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
import type { ObjectsType } from './collection';
import firebase from 'firebase';
import { i18n } from '../plugins/i18next';
enableAllPlugins();

export type ExhibitionObject = {
  // 왜 name & title 둘 다 있을까요?
  id: string;
  name?: string;
  title?: string;
  description?: string;
  thumbnailImageUrl?: string;
  originalImageUrl?: string;
  compressedImageUrl?: string;
  compressedImageUrl_1600?: string;
  author?: string;
  height?: number;
  width?: number;
  link?: {
    isActive?: boolean;
    title?: string;
    url?: string;
  };
  links?: Array<{
    isActive?: boolean;
    title?: string;
    url?: string;
  }>;

  like?: {
    count?: number;
  };
  likedIPs?: Array<String>;
  // video
  youtubeLink?: string;
  videoType?: string;
  playType?: string;
  videoUrl?: string;
  // video
  value: string;
};

export type ObjectType = 'mp.paintingModel' | 'mp.videoModel' | 'mp.audioModel' | 'none';
interface ExhibitionState {
  exhibitionData: {
    // 사용 o
    id: string;
    title: string;
    serializedData: string;
    currentSerializedData: string;
    matterportId: string;

    // 사용 x
    effectFXAA: boolean;
    views: {
      todayView: number;
      totalView: number;
    };
  };
  selectedObject: ExhibitionObject;
  hoveredObject: {
    id: string;
    title: string;
    type: ObjectType;
  };
  getObjectDataStatus: ActionStatus;
  syncExhibitionDataStatus: ActionStatus;
  getExhibitionDataStatus: ActionStatus;
  updateExhibitionDataStatus: ActionStatus;
  toggleLikeButtonStatus: ActionStatus;
  toggleLikeExhibitionButtonStatus: ActionStatus;
  countViewStatus: ActionStatus;
}
// Exhibition 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: ExhibitionState = {
  exhibitionData: {
    // 사용 o
    id: '',
    title: '',
    serializedData: '',
    currentSerializedData: '',
    effectFXAA: false,
    matterportId: '',
    views: {
      todayView: 0,
      totalView: 0,
    },
  },
  // status는 loading, done, error을 갖고있음.
  selectedObject: {
    id: '',
    name: '',
    title: '',
    description: '',
    thumbnailImageUrl: '',
    originalImageUrl: '',
    compressedImageUrl: '',
    compressedImageUrl_1600: '',
    //
    value: '',
  },
  hoveredObject: {
    id: '',
    title: '',
    type: 'none',
  },
  getObjectDataStatus: createStatus(),
  syncExhibitionDataStatus: createStatus(),
  getExhibitionDataStatus: createStatus(),
  updateExhibitionDataStatus: createStatus(),
  toggleLikeButtonStatus: createStatus(),
  toggleLikeExhibitionButtonStatus: createStatus(),
  countViewStatus: createStatus(),
};

// 액션들의 집합.
export const actions = {
  SYNC_EXHIBITION_DATA_REQUEST: 'SYNC_EXHIBITION_DATA_REQUEST',
  SYNC_EXHIBITION_DATA_SUCCESS: 'SYNC_EXHIBITION_DATA_SUCCESS',
  SYNC_EXHIBITION_DATA_FAILURE: 'SYNC_EXHIBITION_DATA_FAILURE',
  GET_EXHIBITION_DATA_REQUEST: 'GET_EXHIBITION_DATA_REQUEST',
  GET_EXHIBITION_DATA_SUCCESS: 'GET_EXHIBITION_DATA_SUCCESS',
  GET_EXHIBITION_DATA_FAILURE: 'GET_EXHIBITION_DATA_FAILURE',
  UPDATE_EXHIBITION_DATA_REQUEST: 'UPDATE_EXHIBITION_DATA_REQUEST',
  UPDATE_EXHIBITION_DATA_SUCCESS: 'UPDATE_EXHIBITION_DATA_SUCCESS',
  UPDATE_EXHIBITION_DATA_FAILURE: 'UPDATE_EXHIBITION_DATA_FAILURE',
  GET_OBJECT_DATA_REQUEST: 'GET_OBJECT_DATA_REQUEST',
  GET_OBJECT_DATA_SUCCESS: 'GET_OBJECT_DATA_SUCCESS',
  GET_OBJECT_DATA_FAILURE: 'GET_OBJECT_DATA_FAILURE',
  SET_CURRENT_OBJECT_VALUE: 'SET_CURRENT_OBJECT_VALUE',
  RESET_OBJECT_DATA: 'RESET_OBJECT_DATA',
  UPDATE_EXHIBITION_DATA_RESET: 'UPDATE_EXHIBITION_DATA_RESET',
  SYNC_EXHIBITION_DATA_DONE: 'SYNC_EXHIBITION_DATA_DONE',
  TOGGLE_LIKE_BUTTON_REQUEST: 'TOGGLE_LIKE_BUTTON_REQUEST',
  TOGGLE_LIKE_BUTTON_SUCCESS: 'TOGGLE_LIKE_BUTTON_SUCCESS',
  TOGGLE_LIKE_BUTTON_FAILURE: 'TOGGLE_LIKE_BUTTON_FAILURE',
  TOGGLE_LIKE_EXHIBITION_BUTTON_REQUEST: 'TOGGLE_LIKE_EXHIBITION_BUTTON_REQUEST',
  TOGGLE_LIKE_EXHIBITION_BUTTON_SUCCESS: 'TOGGLE_LIKE_EXHIBITION_BUTTON_SUCCESS',
  TOGGLE_LIKE_EXHIBITION_BUTTON_FAILURE: 'TOGGLE_LIKE_EXHIBITION_BUTTON_FAILURE',
  COUNT_VIEW_REQUEST: 'COUNT_VIEW_REQUEST',
  COUNT_VIEW_SUCCESS: 'COUNT_VIEW_SUCCESS',
  COUNT_VIEW_FAILURE: 'COUNT_VIEW_FAILURE',
  PLUS_CURRENT_VIEW_REQUEST: 'PLUS_CURRENT_VIEW_REQUEST',
  PLUS_CURRENT_VIEW_SUCCESS: 'PLUS_CURRENT_VIEW_SUCCESS',
  PLUS_CURRENT_VIEW_FAILURE: 'PLUS_CURRENT_VIEW_FAILURE',
  MINUS_CURRENT_VIEW_REQUEST: 'MINUS_CURRENT_VIEW_REQUEST',
  MINUS_CURRENT_VIEW_SUCCESS: 'MINUS_CURRENT_VIEW_SUCCESS',
  MINUS_CURRENT_VIEW_FAILURE: 'MINUS_CURRENT_VIEW_FAILURE',
  SET_HOVERED_OBJECT: 'SET_HOVERED_OBJECT',
  SET_SERIALIZED_DATA: 'SET_SERIALIZED_DATA',
  SET_CURRENT_SERIALIZED_DATA: 'SET_CURRENT_SERIALIZED_DATA',
};

// 액션 크리에이터. dispatch 내부에서 사용.
// 오브젝트(이미지)의 데이터를 불러옴.
export const getObjectDataAction = (objectType: ObjectsType, exhibitionId, id) => ({
  type: actions.GET_OBJECT_DATA_REQUEST,
  objectType,
  exhibitionId,
  id,
});
// 오브젝트(이미지)의 데이터를 초기화.
export const resetObjectDataAction = () => ({
  type: actions.RESET_OBJECT_DATA,
});

export const setHoveredObject = (payload: { id: string; type: ObjectType; title: string }) => ({
  type: actions.SET_HOVERED_OBJECT,
  payload,
});

export const syncExhibitionDataAction = (id: string) => ({
  // 추후 실시간 유저 접속 수 혹은 view 수 동기화 등에 활용할 예정
  type: actions.SYNC_EXHIBITION_DATA_REQUEST,
  id,
});
export const getExhibitionDataAction = (id: string) => ({
  // 현재는 get 요청으로 데이터를 불러올 것.
  type: actions.GET_EXHIBITION_DATA_REQUEST,
  id,
});
// 전시회 데이터 업데이트
export const updateExhibitionDataAction = (id: string, target: string, value: string) => ({
  type: actions.GET_EXHIBITION_DATA_REQUEST,
  id,
  target,
  value,
});

// 전시회 데이터 싱크 종료
export const syncExhibitionDataDoneAction = () => ({
  type: actions.SYNC_EXHIBITION_DATA_DONE,
});

// 좋아요 버튼 실행 및 실행 취소
export const toggleLikeButtonAction = (id, target, isLiked, ip, objectType = 'Paintings') => ({
  type: actions.TOGGLE_LIKE_BUTTON_REQUEST,
  id,
  target,
  isLiked,
  ip,
  objectType,
});

// 전시회 좋아요 버튼 실행 및 실행 취소
export const toggleExhibitionLikeButtonAction = (id, ip) => ({
  type: actions.TOGGLE_LIKE_EXHIBITION_BUTTON_REQUEST,
  id,
  ip,
});

// 뷰 +1 올려줌. 하루 뷰 초기화는 클라우드 펑션을 실행.
export const countViewAction = (id: string, ip: string) => ({
  type: actions.COUNT_VIEW_REQUEST,
  id,
  ip,
});

// 현재 접속자수 +1
export const plusCurrentViewAction = (id: string, randomKey: string) => ({
  type: actions.PLUS_CURRENT_VIEW_REQUEST,
  id,
  randomKey,
});
export const setCurrentObjectValue = (value, target = 'value') => ({
  type: actions.SET_CURRENT_OBJECT_VALUE,
  value,
  target,
});

export const setSerializedData = (data: string) => ({
  type: actions.SET_SERIALIZED_DATA,
  data,
});
export const setCurrentSerializedData = (data: string) => ({
  type: actions.SET_CURRENT_SERIALIZED_DATA,
  data,
});

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_SERIALIZED_DATA:
        draft.exhibitionData.serializedData = action.data;
        break;
      case actions.SET_CURRENT_SERIALIZED_DATA:
        draft.exhibitionData.currentSerializedData = action.data;
        break;
      case actions.SYNC_EXHIBITION_DATA_REQUEST:
        draft.syncExhibitionDataStatus = createRequestStatus();
        break;
      case actions.SYNC_EXHIBITION_DATA_SUCCESS:
        draft.syncExhibitionDataStatus = createSuccessStatus();
        draft.exhibitionData.id = action.id;
        draft.exhibitionData.title = action.data.title ?? '';
        draft.exhibitionData.matterportId = action.data.matterportId?.trim() ?? '';
        draft.exhibitionData.effectFXAA = action.data.effectFXAA ?? false;
        draft.exhibitionData.views = action.data.views ?? { todayView: 0, totalView: 0 };
        break;
      case actions.SYNC_EXHIBITION_DATA_FAILURE:
        draft.syncExhibitionDataStatus = createFailureStatus(action.error);
        break;
      case actions.GET_EXHIBITION_DATA_REQUEST:
        draft.getExhibitionDataStatus = createRequestStatus();
        break;
      case actions.GET_EXHIBITION_DATA_SUCCESS:
        draft.getExhibitionDataStatus = createSuccessStatus();
        draft.exhibitionData.id = action.id;
        draft.exhibitionData.title = action.data.title ?? '';
        draft.exhibitionData.matterportId = action.data.matterportId?.trim() ?? '';
        draft.exhibitionData.effectFXAA = action.data.effectFXAA ?? false;
        draft.exhibitionData.views = action.data.views ?? { todayView: 0, totalView: 0 };
        break;
      case actions.GET_EXHIBITION_DATA_FAILURE:
        draft.getExhibitionDataStatus = createFailureStatus(action.error);
        break;
      case actions.UPDATE_EXHIBITION_DATA_REQUEST:
        draft.updateExhibitionDataStatus = createRequestStatus();
        break;
      case actions.UPDATE_EXHIBITION_DATA_SUCCESS:
        draft.updateExhibitionDataStatus = createSuccessStatus();
        break;
      case actions.UPDATE_EXHIBITION_DATA_FAILURE:
        draft.updateExhibitionDataStatus = createFailureStatus(action.error);
        break;
      case actions.UPDATE_EXHIBITION_DATA_RESET:
        draft.updateExhibitionDataStatus = resetStatus();
        break;
      case actions.TOGGLE_LIKE_BUTTON_REQUEST:
        draft.toggleLikeButtonStatus = createRequestStatus();
        break;
      case actions.TOGGLE_LIKE_BUTTON_SUCCESS:
        draft.toggleLikeButtonStatus = createSuccessStatus();
        break;
      case actions.TOGGLE_LIKE_BUTTON_FAILURE:
        draft.toggleLikeButtonStatus = createFailureStatus(action.error);
        break;
      case actions.SET_CURRENT_OBJECT_VALUE:
        draft.selectedObject[action.target] = action.value;
        break;
      case actions.TOGGLE_LIKE_EXHIBITION_BUTTON_REQUEST:
        draft.toggleLikeExhibitionButtonStatus = createRequestStatus();
        break;
      case actions.TOGGLE_LIKE_EXHIBITION_BUTTON_SUCCESS:
        draft.toggleLikeExhibitionButtonStatus = createSuccessStatus();
        break;
      case actions.TOGGLE_LIKE_EXHIBITION_BUTTON_FAILURE:
        draft.toggleLikeExhibitionButtonStatus = createFailureStatus(action.error);
        break;
      case actions.GET_OBJECT_DATA_REQUEST:
        draft.getObjectDataStatus = createRequestStatus();
        break;
      case actions.GET_OBJECT_DATA_SUCCESS:
        draft.getObjectDataStatus = createSuccessStatus();
        if (!action.data) break;
        draft.selectedObject.id = action.id;
        draft.selectedObject.name = action.data.name ?? '';
        draft.selectedObject.title = action.data.title ?? '';
        draft.selectedObject.description = action.data.description ?? '';
        draft.selectedObject.width = action.data.width ?? 0;
        draft.selectedObject.height = action.data.height ?? 0;
        draft.selectedObject.originalImageUrl = action.data.originalImage?.url ?? '';
        draft.selectedObject.compressedImageUrl = action.data.compressedImage?.url ?? '';
        draft.selectedObject.compressedImageUrl_1600 =
          action.data.compressedImageUrl_1600?.url ?? action.data.compressedImage?.url ?? '';
        draft.selectedObject.author = action.data.author ?? '';
        draft.selectedObject.link = action.data.link ?? {
          isActive: false,
          title: '',
          url: '',
        };
        draft.selectedObject.links = action.data.links ?? [];
        draft.selectedObject.like = action.data.like ?? {
          count: 0,
        };
        draft.selectedObject.likedIPs = action.data.likedIPs ?? [];
        draft.selectedObject.youtubeLink = action.data.youtubeLink ?? '';
        draft.selectedObject.videoType = action.data.videoType ?? '';
        draft.selectedObject.playType = action.data.playType ?? '';
        draft.selectedObject.videoUrl = action.data.videoUrl ?? '';
        break;
      case actions.GET_OBJECT_DATA_FAILURE:
        draft.getObjectDataStatus = createFailureStatus(action.error);
        break;
      // 오브젝트(그림, 동영상 등) 리셋
      case actions.RESET_OBJECT_DATA:
        draft.selectedObject = {
          id: '',
          name: '',
          title: '',
          description: '',
          originalImageUrl: '',
          thumbnailImageUrl: '',
          compressedImageUrl: '',
          compressedImageUrl_1600: '',
          value: '',
        };
        draft.getObjectDataStatus = resetStatus();
        break;
      // 뷰 카운트 + 1
      case actions.COUNT_VIEW_REQUEST:
        draft.updateExhibitionDataStatus = createRequestStatus();
        break;
      case actions.COUNT_VIEW_SUCCESS:
        draft.updateExhibitionDataStatus = createSuccessStatus();
        break;
      case actions.COUNT_VIEW_FAILURE:
        draft.updateExhibitionDataStatus = createFailureStatus(action.error);
        break;
      // 접속자수 +1
      case actions.PLUS_CURRENT_VIEW_REQUEST:
        draft.updateExhibitionDataStatus = createRequestStatus();
        break;
      case actions.PLUS_CURRENT_VIEW_SUCCESS:
        draft.updateExhibitionDataStatus = createSuccessStatus();
        break;
      case actions.PLUS_CURRENT_VIEW_FAILURE:
        draft.updateExhibitionDataStatus = createFailureStatus(action.error);
        break;
      // hover되었을 때 모델 데이터를 저장함.
      case actions.SET_HOVERED_OBJECT:
        draft.hoveredObject = {
          id: action.payload.id,
          title: action.payload.title,
          type: action.payload.type,
        };
        break;
      default:
        break;
    }
  });

export default reducer;
