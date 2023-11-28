import styled from '@emotion/styled';
import AccordionDetails from '@mui/material/AccordionDetails';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { ACTION } from '@src/types/category';
import Modal from '@components/Modal';
import { printLogObj } from '@utils/printLog';
import { Link } from 'react-router-dom';

const Child = styled(AccordionDetails)`
  transform: scale(1);
  opacity: 1;
  height: auto;
  width: 250px;
  padding: 0 9px 8px 9px;
  color: #fff;
  line-height: normal;
  text-transform: none;
  border-top: solid 1px white;
`;

const BtnStyle = {
  fontSize: '16px',
  fontWeight: 500,
  width: '250px',
  marginBottom: '8px',
  justifyContent: 'left',
  transition: 'background-color 0.3s ease',
  padding: '10px',
  color: '#fff',
  "&:hover": {
    background: "#799ccb"
  },
} as const;


function CategoryChild({ value }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [children, setChildren] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e, child) => {
    setAnchorEl(e.currentTarget);

    /**
     *  모달이 있는지만 체크 할 것.
     */
    if (child.Type === ACTION.MODAL) {
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    const sorted = [...value].sort((a, b) => a.order - b.order);
    setChildren(sorted);
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
      {isModalOpen && (
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
      )}
    </Child>
  );
}

export default CategoryChild;
