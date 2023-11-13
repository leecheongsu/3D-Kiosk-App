export declare type ActionType =
  | "none"
  | "imageView"
  | "pdfView"
  | "videoView"
  | "smartEditor"
  | "audioPlay"
  | "link"
  | "popupMenu"
  | "teleport";
export declare type ActionSelectType =
  | "upload" // videoView, imageView, pdfView, audioPlay
  | "youtube" // videoView
  | "currentWindow" // link
  | "newWindow" // link
  | "iframe" // link
  | "tile" // popupMenu
  | "list" // popupMenu
  | "none"; // none,  smartEditor, teleport

export declare type Action = {
  type: ActionType;
  select: ActionSelectType;
  fileName?: string;
  value: Array<string>;
};
