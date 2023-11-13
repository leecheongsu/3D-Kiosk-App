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
import { i18n } from '../plugins/i18next';
import { firestore } from '../lib/firebase';
import isMobile from '../utils/isMobile';
enableAllPlugins();
type Global = {
  // 글로벌 콜렉션에서 불러오는 데이터를 저장.
};

interface GlobalState {
  globalData: Global; // 글로벌 콜렉션에서 불러오는 데이터를 저장.

  menuButton: boolean; // 메뉴버튼이 켜져있는지, 꺼져있는지를 나타냄.
  // 특정 개체를 갖고있는지를 나타내는 값.
  hasTitle: boolean; // 제목
  hasMenuButton: boolean; // 메뉴버튼 및 메뉴.
  hasSize: boolean; // 그림의 상세정보창에서 사이즈 값.
  hasView: boolean; // 방문자 수를 보여주는지 보여주지 않는지를 나타냄.

  hasIntro: boolean; // ** 인트로가 있는지 없는지를 나타내지만 사용되지 않고있음.
  hasTag: boolean; // ** 태그가 달려있는 전시관인지를 표시합니다. 이 표시가 켜져 있으면, 지속적으로 태그창이 열렸는지 체크하여, 주변 메뉴와 겹쳐지는 현상을 해결합니다.

  screen: {
    // 스크린 사이즈와 방향을 저장하는 값.
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    orientation: string; // 'landscape' | 'portrait';
  };

  // 로딩이 되었는지를 체크하는 값.
  isSpaceLoaded: boolean; // 공간 로딩 체크
  isBGMLoaded: boolean; // 배경음악 로딩 시작 체크

  // 메타포트 내에 설정된 쿼리 옵션에 다한 설정값.
  queryOption: {
    vr: boolean;
    dh: boolean; // 처음 진입 애니메이션
    lang: 'ko' | 'en';
    play: boolean;
    title: boolean;
  };

  // 메뉴 구성을 각 전시관으로 다르게 주기 위해 만들었으나, 실제로 사용되지 않음.
  hasMenuOptions: {
    infoButton: boolean;
    chatButton: boolean;
    BGMButton: boolean;
    fullScreenButton: boolean;
  };

  // 현재 쇼룸의 메뉴 내부의 버튼 또는 특정 상태가 켜져있는지, 껴져있는지를 나타냄.
  globalOption: {
    infoButton: boolean; // 전시 정보 모달.
    chatButton: boolean; // 방명록 모달
    BGMButton: boolean; // 배경음악 재생
    fullScreenButton: boolean; // 전체 화면
    detailView: boolean; // 이미지 모달 온 오프하는 플래그
    videoModal: boolean; // ** 비디오 모달 온 오프하는 플래그. 사용되지 않고있음.
    webLinkModal: boolean; // 웹링크(보물찾기)
    componentPlaying: boolean; // 컴포넌트(비디오, 도슨트) 재생중
    highlightButton: boolean; // 공간에 하이라이트가 설정된 경우, 그것의 온 오프를 나타냄.
    isObjectHovered: boolean;
    isSweepVisible: boolean;
    isHighDefinitionMode: boolean;
    language: string;
    pdfViewModal: boolean;
    detailedInfo: boolean;
  };
  currentAction: Array<{
    type:
      | 'none'
      | 'imageView'
      | 'pdfView'
      | 'videoView'
      | 'smartEditor'
      | 'audioPlay'
      | 'link'
      | 'popupMenu'
      | 'teleport';
    select:
      | 'upload' // videoView, imageView, pdfView, audioPlay
      | 'youtube' // videoView
      | 'currentWindow'
      | 'newWindow'
      | 'iframe' // link
      | 'tile'
      | 'list' // popupMenu
      | 'none'; // none,  smartEditor, teleport
    value: Array<string>;
    title: string;
  }>;

  currentWebLink?: string; // ?
  wasPlayingMusic: boolean; // 컴포넌트가 플레이되고 있을 때 최근 배경음악이 재생되고 있었는지를 체크함.
  playingComponentCount: number; // 다른 컴포넌트의 재생으로 넘어가는 것을 체크하기 위한 옵션. 이 숫자가 변하면 재생되던 컴포넌트가 정지함.

  // 데이터 로딩 상태관리.
  syncGlobalDataStatus: ActionStatus;
  getGlobalDataStatus: ActionStatus;
  updateGlobalDataStatus: ActionStatus;
}

// 글로벌 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: GlobalState = {
  globalData: {
    value: '',
    isWebLinkActive: false,
    posterLink: '',
    posterLinkEn: '',
    guideTextEn: '',
    guideText: '',
  },
  menuButton: isMobile() ? false : true, // 기본값 꺼져있음
  hasSize: true,
  hasView: true,
  hasIntro: false,
  screen: {
    width: null,
    orientation: window.screen.orientation ? window.screen.orientation.type.split('-')[0] : 'landscape',
  },
  hasMenuButton: false,
  hasTitle: true,
  hasTag: false,
  isSpaceLoaded: false,
  isBGMLoaded: false,
  hasMenuOptions: {
    infoButton: true,
    chatButton: true,
    BGMButton: true,
    fullScreenButton: true,
    // detailView: boolean;
  },
  queryOption: {
    vr: false,
    dh: false,
    lang: 'ko',
    play: true,
    title: false,
  },
  globalOption: {
    infoButton: false,
    chatButton: false,
    BGMButton: true,
    webLinkModal: false,
    fullScreenButton: false,
    detailView: false, // 비디오 모달 온 오프 하는 플래그
    videoModal: false, // 비디오 모달 온 오프하는 플래그
    componentPlaying: false,
    highlightButton: false,
    isObjectHovered: false,
    isSweepVisible: false,
    isHighDefinitionMode: false,
    language: i18n.language,
    pdfViewModal: false,
    detailedInfo: false,
  },
  currentAction: [
    {
      type: 'none',
      select: 'none',
      value: [],
      title: '',
    },
  ],
  currentWebLink: null,
  wasPlayingMusic: false,
  playingComponentCount: 0,
  // status는 loading, done, error을 갖고있음.
  syncGlobalDataStatus: createStatus(),
  getGlobalDataStatus: createStatus(),
  updateGlobalDataStatus: createStatus(),
};

// 액션들의 집합.
export const actions = {
  // vvidcall
  SET_VR_TYPE: 'SET_VR_TYPE',

  // onthewall
  SYNC_GLOBAL_DATA_REQUEST: 'SYNC_GLOBAL_DATA_REQUEST',
  SYNC_GLOBAL_DATA_SUCCESS: 'SYNC_GLOBAL_DATA_SUCCESS',
  SYNC_GLOBAL_DATA_FAILURE: 'SYNC_GLOBAL_DATA_FAILURE',
  GET_GLOBAL_DATA_REQUEST: 'GET_GLOBAL_DATA_REQUEST',
  GET_GLOBAL_DATA_SUCCESS: 'GET_GLOBAL_DATA_SUCCESS',
  GET_GLOBAL_DATA_FAILURE: 'GET_GLOBAL_DATA_FAILURE',
  UPDATE_GLOBAL_DATA_REQUEST: 'UPDATE_GLOBAL_DATA_REQUEST',
  UPDATE_GLOBAL_DATA_SUCCESS: 'UPDATE_GLOBAL_DATA_SUCCESS',
  UPDATE_GLOBAL_DATA_FAILURE: 'UPDATE_GLOBAL_DATA_FAILURE',
  UPDATE_GLOBAL_DATA_STATUS_RESET: 'UPDATE_GLOBAL_DATA_STATUS_RESET',
  SYNC_GLOBAL_DATA_DONE: 'SYNC_GLOBAL_DATA_DONE',
  SYNC_GET_POINTS_DONE: 'SYNC_GET_POINTS_DONE',
  TOGGLE_GLOBAL_OPTION_CHANGE: 'TOGGLE_GLOBAL_OPTION_CHANGE',
  TOGGLE_MENU_BUTTON: 'TOGGLE_MENU_BUTTON',
  SET_SCREEN_SIZE: 'SET_SCREEN_SIZE',
  INCREASE_PLAYING_COMPONENT_COUNT: 'INCREASE_PLAYING_COMPONENT_COUNT',
  SET_WAS_PLAYING_BGM: 'SET_WAS_PLAYING_BGM',
  SET_CURRENT_WEB_LINK: 'SET_CURRENT_WEB_LINK',
  SET_SPACE_LOADED: 'SET_SPACE_LOADED',
  SET_BGM_LOADED: 'SET_BGM_LOADED',
  SET_CLIENT_ID: 'SET_CLIENT_ID',
  SET_ACTION: 'SET_ACTION',
  PUSH_ACTION: 'PUSH_ACTION',
  POP_ACTION: 'POP_ACTION',
};

export const setAction = (action) => ({
  type: actions.SET_ACTION,
  action,
});
export const pushAction = (action) => ({
  type: actions.PUSH_ACTION,
  action,
});
export const popAction = () => ({
  type: actions.POP_ACTION,
});

export const setClientIdAction = (clientId) => ({
  type: actions.SET_CLIENT_ID,
  clientId,
});
// 액션 크리에이터. dispatch 내부에서 사용.
export const getGlobalDataAction = (exhibitionId) => ({
  type: actions.GET_GLOBAL_DATA_REQUEST,
  exhibitionId,
});
export const increasePlayingComponent = () => ({
  type: actions.INCREASE_PLAYING_COMPONENT_COUNT,
});
export type OptionType =
  | 'infoButton'
  | 'chatButton'
  | 'BGMButton'
  | 'fullScreenButton'
  | 'detailView'
  | 'componentPlaying'
  | 'highlightButton'
  | 'webLinkModal'
  | 'isObjectHovered'
  | 'isSweepVisible'
  | 'isHighDefinitionMode'
  | 'language'
  | 'videoModal'
  | 'pdfViewModal'
  | 'detailedInfo';

//인자로 가진 globalOption을 켜고 끄는 액션
export const toggleGlobalOptionChangeAction = (target: OptionType, value: boolean | null = null) => ({
  type: actions.TOGGLE_GLOBAL_OPTION_CHANGE,
  target,
  value,
});
export const toggleMenuButtonAction = (forced: boolean = false) => ({
  type: actions.TOGGLE_MENU_BUTTON,
  forced,
});
export const syncGlobalDataAction = () => ({
  type: actions.SYNC_GLOBAL_DATA_REQUEST,
});
export const updateGlobalDataAction = (target, value) => ({
  type: actions.UPDATE_GLOBAL_DATA_REQUEST,
  target,
  value,
});
export const syncGlobalDataDoneAction = () => ({
  type: actions.SYNC_GLOBAL_DATA_DONE,
});
export const resetStatusAction = (type) => ({ type });
export const setScreenSizeAction = (width: string, orientation: ScreenOrientation) => ({
  type: actions.SET_SCREEN_SIZE,
  width,
  orientation: window.screen.orientation ? window.screen.orientation.type.split('-')[0] : 'landscape',
});
export const setWasPlayingBGMAction = (value: boolean) => ({
  type: actions.SET_WAS_PLAYING_BGM,
  value,
});
export const setCurrentWebLink = (data) => ({
  type: actions.SET_CURRENT_WEB_LINK,
  data,
});
export const setSpaceLoaded = () => ({
  type: actions.SET_SPACE_LOADED,
});
export const setBGMLoaded = () => ({
  type: actions.SET_BGM_LOADED,
});

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_ACTION:
        draft.currentAction[0] = action.action;
        break;
      case actions.PUSH_ACTION:
        draft.currentAction.push(action.action);
        break;
      case actions.POP_ACTION:
        if (draft.currentAction.length > 1) {
          draft.currentAction.pop();
        } else {
          draft.currentAction[0] = {
            type: 'none',
            select: 'none',
            value: [],
            title: '',
          };
        }
        break;
      case actions.SYNC_GLOBAL_DATA_REQUEST:
        draft.syncGlobalDataStatus = createRequestStatus();
        break;
      case actions.SYNC_GLOBAL_DATA_SUCCESS:
        draft.syncGlobalDataStatus = createSuccessStatus();
        draft.globalData = action.data;
        break;
      case actions.SYNC_GLOBAL_DATA_FAILURE:
        draft.syncGlobalDataStatus = createFailureStatus(action.error);
        break;
      case actions.GET_GLOBAL_DATA_REQUEST:
        draft.getGlobalDataStatus = createRequestStatus();
        break;
      case actions.GET_GLOBAL_DATA_SUCCESS:
        draft.getGlobalDataStatus = createSuccessStatus();
        draft.globalData = action.globalData;
        draft.hasSize = action.hasSize ?? true;
        draft.hasTag = action.hasTag ?? false;
        draft.hasMenuOptions.infoButton = action.hasMenuOptions?.infoButton ?? true;
        draft.hasMenuOptions.chatButton = action.hasMenuOptions?.chatButton ?? true;
        draft.hasMenuOptions.BGMButton = action.hasMenuOptions?.BGMButton ?? true;
        draft.hasMenuOptions.fullScreenButton = action.hasMenuOptions?.fullScreenButton ?? true;
        draft.globalOption.infoButton = action.globalOption?.infoButton ?? false;
        draft.globalOption.BGMButton = action.globalOption?.BGMButton ?? true;
        draft.globalOption.chatButton = action.globalOption?.chatButton ?? true;
        draft.globalOption.fullScreenButton = action.globalOption?.fullScreenButton ?? false;
        draft.globalOption.language = i18n.language;
        draft.hasTitle = true;
        if (action.queryOption) draft.queryOption = { ...draft.queryOption, ...action.queryOption };
        if (action.isPlatform) {
          draft.hasMenuButton = true;
          draft.globalOption.BGMButton = true;
          draft.hasTitle = true;
          draft.hasView = true;
        }
        if (action.isCustomized) {
          draft.globalOption.BGMButton = action.globalOption?.BGMButton ?? true;
          draft.hasMenuButton = action.hasMenuButton ?? true;
          draft.hasTitle = action.hasTitle ?? true;
          draft.globalOption.isSweepVisible = action.globalOption?.isSweepVisible ?? false;
          draft.globalOption.isHighDefinitionMode = action.globalOption?.isHighDefinitionMode ?? false;
          // highDefinitionMode은 모바일에서 실행될 수 없음.
          // if (action.globalOption?.isHighDefinitionMode !== null) {
          //   draft.globalOption.isHighDefinitionMode = !isMobile() && action.globalOption.isHighDefinitionMode;
          // }
        }
        // query string, search 추가함
        // chat, bgm, hd 으로 초기설정 가능하며,
        // title, menu로 영구 설정 가능함.

        const search = new URLSearchParams(window.location.search);
        if (search.get('chat') === '0') {
          draft.globalOption.chatButton = false;
        }
        if (search.get('bgm') === '0') {
          draft.globalOption.BGMButton = false;
        }
        if (search.get('hd') === '1') {
          draft.globalOption.isHighDefinitionMode = true;
        }
        if (search.get('title') === '0') {
          draft.hasTitle = true;
        }
        if (search.get('menu') === '0') {
          draft.globalOption.chatButton = false;
          draft.hasMenuButton = false;
          draft.globalOption.BGMButton = false;
        }
        break;
      case actions.GET_GLOBAL_DATA_FAILURE:
        draft.getGlobalDataStatus = createFailureStatus(action.error);
        break;
      case actions.UPDATE_GLOBAL_DATA_REQUEST:
        draft.updateGlobalDataStatus = createRequestStatus();
        break;
      case actions.UPDATE_GLOBAL_DATA_SUCCESS:
        draft.updateGlobalDataStatus = createSuccessStatus();
        break;
      case actions.UPDATE_GLOBAL_DATA_FAILURE:
        draft.updateGlobalDataStatus = createFailureStatus(action.error);
        break;
      case actions.UPDATE_GLOBAL_DATA_STATUS_RESET:
        draft.updateGlobalDataStatus = resetStatus();
        break;
      case actions.TOGGLE_GLOBAL_OPTION_CHANGE:
        if (action.value !== null) {
          draft.globalOption[action.target] = action.value;
        } else {
          draft.globalOption[action.target] = !draft.globalOption[action.target];
        }
        break;
      case actions.TOGGLE_MENU_BUTTON:
        draft.menuButton = !draft.menuButton;
        break;
      case actions.SET_SCREEN_SIZE:
        draft.screen.width = action.width;
        if (action.width === 'xs' && document.body.clientHeight > document.body.clientWidth) {
          draft.screen.orientation = 'portrait';
        } else draft.screen.orientation = action.orientation;
        break;
      case actions.INCREASE_PLAYING_COMPONENT_COUNT:
        draft.playingComponentCount += 1;
        break;
      case actions.SET_WAS_PLAYING_BGM:
        draft.wasPlayingMusic = action.value;
        break;
      case actions.SET_CURRENT_WEB_LINK:
        draft.currentWebLink = action.data;
        break;
      case actions.SET_SPACE_LOADED:
        draft.isSpaceLoaded = true;
        break;
      case actions.SET_BGM_LOADED:
        draft.isBGMLoaded = true;
        break;
      default:
        break;
    }
  });

export default reducer;
