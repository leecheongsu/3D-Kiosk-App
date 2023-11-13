import { combineReducers } from '@reduxjs/toolkit';

// 사용자 리듀서(직접 만든 것들)
import global from './global';
import music from './music';
import chat from './chat';
import exhibition from './exhibition';
import collection from './collection';
import room from './room';
import menu from './menu';
import layer from './layer';

const rootReducer = combineReducers({
  // 사용자 리듀서
  global,
  music,
  // 기존 리듀서 때문에 어쩔 수 없이 이름을 chatting으로 사용함.
  chatting: chat,
  exhibition,
  collection,
  room,
  menu,
  layer,
});

export default rootReducer;
