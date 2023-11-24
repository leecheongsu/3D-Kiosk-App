import React, { useEffect } from 'react';
import Side from '@components/Modal/Side';

function Modal({ open, onClose, title, content, actions }) {
  /**
   * ACTION_TYPE 분기 처리.
   */

  return <Side open={open} onClose={onClose} title={title} content={content} actions={actions} />;
}

export default Modal;
