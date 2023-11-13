import { Action } from './common';

// ONNA Exhibition/RoomMenu type
export type RoomMenu = {
  id: string; // RoomMenu.id;
  roomId: string; //Room.id;
  hasChild: boolean;
  parentId: string; //RoomMenu.id;
  order: number; // 오더 순서로 메뉴 표시
  depth: number; // parent 와 child 구분
  title: string;
  action: Action['type']; //Action;
  version: 1;
};
