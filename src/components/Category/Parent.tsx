import React, { useState } from "react";
import styled from "@emotion/styled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Child from "@components/Category/Child";
import { Link } from "react-router-dom";
import { ACTION } from "@src/types/category";
import Modal from "@components/Modal";

const Parent = styled(Accordion)`
  width: 250px;
  transition: all 0.2s;
  position: relative;
  padding: 0;
  vertical-align: baseline;
  margin-bottom: 16px;
  background-color: #094fad;
`;

const Contents = styled(AccordionSummary)`
  opacity: 1;
  color: #fff;
  background-color: #094fad;

  &:hover {
    background-color: #799ccb;
  }
`;

const BtnStyle = {
  color: "#fff",
  fontSize: "16px",
  fontWeight: 600,
  marginLeft: "7px",
  justifyContent: "left",
  backgroundColor: "#094fad"
} as const;

function CategoryParent({ parent, children }) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState({});

  const handleClick = (e, v) => {
    if (v.type === ACTION.SIDE_MODAL) {
      setIsModalOpen(true);
      setModalValue(v);
    }
  };

  return (
    <>
      {parent.map((v) => (
        <Parent key={v.id} expanded={expanded === v.id} onChange={handleChange(v.id)}>
          {v.hasChild && (
            <Contents expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
              <Typography sx={{ color: "#fff", fontWeight: 700 }}>{v.title}</Typography>
            </Contents>
          )}
          {!v.hasChild && (
            <Button
              component={v.type === ACTION.NEW_WINDOW_LINK ? Link : undefined}
              target="_blank"
              to={v.type === ACTION.NEW_WINDOW_LINK ? v.linkUrl : undefined}
              disableRipple
              sx={BtnStyle}
              onClick={(e) => handleClick(e, v)}
            >
              {v.title}
            </Button>
          )}
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              value={modalValue}
              actions={
                <Button onClick={() => setIsModalOpen(false)} color="primary">
                  Close
                </Button>
              }
            />
          )}
          {children[v.id] && <Child value={children[v.id]} />}
        </Parent>
      ))}
    </>
  );
}

export default CategoryParent;
