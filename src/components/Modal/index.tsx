import React, { useEffect } from "react";
import Side from "@components/Modal/Side";
import { printLogObj } from "@utils/printLog";
import { ACTION } from "@src/types/category";

function Modal({ open, onClose, value, actions }) {
  /**
   * ACTION - Modal 만 분기 처리
   */

  return (
  <>
    { value.type === ACTION.SIDE_MODAL && (
      <Side open={open} onClose={onClose} value={value} actions={actions} />
    )}
  </>
  );
}

export default Modal;


