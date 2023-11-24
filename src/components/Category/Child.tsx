import styled from '@emotion/styled';
import AccordionDetails from '@mui/material/AccordionDetails';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { ACTION } from '@src/types/category';
import Modal from '@components/Modal';
import { printLogObj } from "@utils/printLog";

const Child = styled(AccordionDetails)`
  transform: scale(1);
  opacity: 1;
  height: auto;
  padding: 0 9px 8px 9px;
  color: #fff;
  line-height: normal;
  text-transform: none;
`;

const BtnStyle = {
  color: '#fff',
  fontSize: '16px',
  fontWeight: 500,
  width: '100%',
  marginBottom: '8px',
  justifyContent: 'left',
} as const;

function CategoryChild({ value }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [children, setChildren] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Modal 위치
  const [isLeftAlign, setIsLeftAlign] = useState(false)

  const handleClick = (e, child) => {
    setAnchorEl(e.currentTarget);
    setIsModalOpen(true);
    switch (child.type) {
      case ACTION.NEW_WINDOW_LINK:
        {
        }
        break;
      case ACTION.SIDE_MODAL:
        {
        }
        break;
      default: //추후 개발 예정
    }
    console.log(child.linkUrl);
  };

  useEffect(() => {
    const sorted = [...value].sort((a, b) => a.order - b.order);
    setChildren(sorted);

    // printLogObj(sorted)

  }, []);

  return (
    <Child>
      {children.map((v) => (
        <Button
          key={v.id}
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={(e) => handleClick(e, v)}
          sx={BtnStyle}
          // component={Link}
          // to={v.linkUrl}
        >
          {v.title}
        </Button>
      ))}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Your Modal Title"
        content={<p>This is your modal content.</p>}
        actions={
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Close
          </Button>
        }
      />
    </Child>
  );
}

export default CategoryChild;
