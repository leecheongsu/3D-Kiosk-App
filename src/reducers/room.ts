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
import { Sweep, Room } from '../types/room';
enableAllPlugins();

interface RoomState {
  rooms: Array<Room>;
  currentRoom: Room | null;
  getRoomsStatus: ActionStatus;
  sweepMap: { [key: string]: Sweep };
  sweepRoomMap: { [key: string]: { label: string; title: string; id: string } };
  currentSweep: Sweep | null;
  // registeredSweep: Array<{
  //   label: string;
  //   roomTitle: string;
  // }>;
}
// 글로벌 데이터의 상태 기본값. 데이터를 갖고 오기 전
export const initialState: RoomState = {
  rooms: [],
  currentRoom: null,
  getRoomsStatus: createStatus(),
  sweepMap: {},
  sweepRoomMap: {},
  currentSweep: null,
  // registeredSweep: [],
};

// 액션들의 집합.
export const actions = {
  SET_CURRENT_ROOM: 'SET_CURRENT_ROOM',
  GET_ROOMS_REQUEST: 'GET_ROOMS_REQUEST',
  GET_ROOMS_SUCCESS: 'GET_ROOMS_SUCCESS',
  GET_ROOMS_FAILURE: 'GET_ROOMS_FAILURE',
  SET_SWEEP_MAP: 'SET_SWEEP_MAP',
  SET_SWEEP_ROOM_MAP: 'SET_SWEEP_ROOM_MAP',
  SET_CURRENT_SWEEP: 'SET_CURRENT_SWEEP',
};

// 액션 크리에이터. dispatch 내부에서 사용.
export const setCurrentRoomAction = (id: string) => ({
  type: actions.SET_CURRENT_ROOM,
  id,
});
export const getRoomsAction = (exhibitionId: string) => ({
  type: actions.GET_ROOMS_REQUEST,
  exhibitionId,
});
export const setSweepMap = (sweepMap: Array<Sweep>) => ({
  type: actions.SET_SWEEP_MAP,
  sweepMap,
});
export const setSweepRoomMap = () => ({
  type: actions.SET_SWEEP_MAP,
});
export const setCurrentSweep = (sweepId: string) => ({
  type: actions.SET_CURRENT_SWEEP,
  sweepId,
});

// 각 액션에 따라 어떻게 데이터를 변경할 것인가를 정한다.
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_CURRENT_SWEEP:
        if (action.sweepId) {
          draft.currentSweep = draft.sweepMap[action.sweepId];
        } else {
          draft.currentSweep = null;
        }
        break;
      case actions.SET_SWEEP_MAP:
        action.sweepMap.forEach((sweep: Sweep) => {
          draft.sweepMap[sweep.label] = { ...sweep };
        });
        break;

      case actions.SET_CURRENT_ROOM:
        if (action.id) {
          draft.currentRoom = draft.rooms.find((room) => room.id === action.id);
        } else {
          draft.currentRoom = null;
        }
        break;
      case actions.GET_ROOMS_REQUEST:
        draft.getRoomsStatus = createRequestStatus();
        break;
      case actions.GET_ROOMS_SUCCESS:
        draft.getRoomsStatus = createSuccessStatus();
        draft.rooms = action.data.map((room) => {
          const sweepLabels = room.sweeps?.split(',');
          sweepLabels?.forEach((label) => {
            draft.sweepRoomMap[label] = { label, ...room };
          });
          return { ...room, sweeps: sweepLabels ?? [] };
        });

        break;
      case actions.GET_ROOMS_FAILURE:
        draft.getRoomsStatus = createFailureStatus(action.error);
        break;
      default:
        break;
    }
  });

export default reducer;
