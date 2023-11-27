export enum ACTION {
  NONE = "none",
  // IFRAME = "iframe",
  NEW_WINDOW_LINK = "newWindowLink",
  CUR_WINDOW_LINK = "currentWindowLink",
  SIDE_MODAL = "sideModal",
  /**
   * AsIs) 복제사용
   * ToBe) 아이콘 타입별로 분리해야됨. 추후 리팩토링 할 것.
   */
  MODAL = "modal",
  LINK = "link",
}

export type Icons = {
  actionType: ACTION;
  color: string;
  imageUrl: string;
  label: string;
  linkUrl: string;
  radius: number;
  size: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  version: 1;
}

export type Categories = {
  id: string; //각 ID를 primary key 로 설정.
  parentId : string;
  title : string;
  type: ACTION;
  level : number;
  order : number;
  hasChild : boolean;
  pathway : {};
  version : 1;
  createdAt : Date;
  updatedAt : Date;
  deletedAt : Date;
}