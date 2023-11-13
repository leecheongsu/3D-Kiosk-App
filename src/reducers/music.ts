import { enableAllPlugins } from 'immer';
import { produce } from 'immer';
import {
  createStatus,
  createRequestStatus,
  createSuccessStatus,
  createFailureStatus,
  // resetStatus,
  ActionStatus,
} from '../utils/reducerUtils';
enableAllPlugins();

interface MusicState {
  title: string;
  url: string;
  copyRightMessage: string;
  getMusicStatus: ActionStatus;
}
// 글로벌 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: MusicState = {
  title: '',
  url: '',
  copyRightMessage: '',
  // status는 loading, done, error을 갖고있음.
  getMusicStatus: createStatus(),
};

// 액션들의 집합.
export const actions = {
  GET_MUSIC_REQUEST: 'GET_MUSIC_REQUEST',
  GET_MUSIC_SUCCESS: 'GET_MUSIC_SUCCESS',
  GET_MUSIC_FAILURE: 'GET_MUSIC_FAILURE',
};

// 액션 크리에이터. dispatch 내부에서 사용.
export const getMusicAction = (id: string) => ({
  type: actions.GET_MUSIC_REQUEST,
  id,
});

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.GET_MUSIC_REQUEST:
        draft.getMusicStatus = createRequestStatus();
        break;
      case actions.GET_MUSIC_SUCCESS:
        draft.getMusicStatus = createSuccessStatus();
        draft.title = action.data.title;
        draft.url = action.data.url;
        draft.copyRightMessage = action.data.copyRightMessage;
        break;
      case actions.GET_MUSIC_FAILURE:
        draft.getMusicStatus = createFailureStatus(action.error);
        break;
      default:
        break;
    }
  });

export default reducer;
