export type Action = {
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
    | 'none'; // none,  blog, teleport
  filename?: string;
  value: Array<string>;
};
