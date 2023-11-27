import React, { useState } from 'react';
import styled from '@emotion/styled';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Child from '@components/Category/Child';
import { Link } from 'react-router-dom';

const Parent = styled(Accordion)`
  width: 250px;
  background: #094fad;
  transition: all 0.2s;
  position: relative;
  padding: 0;
  vertical-align: baseline;
  margin-bottom: 16px;
`;

const Contents = styled(AccordionSummary)`
  opacity: 1;
  color: #fff;

  &:hover {
    background-color: #0563ce; // Add your desired hover background color
  }
`;

const BtnStyle = {
  color: '#fff',
  width: '100%',
  fontSize: '16px',
  fontWeight: 600,
  marginLeft: '7px',
  justifyContent: 'left',
} as const;

function CategoryParent({ parent, children }) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  return (
    <>
      {parent.map((v) => (
        <Parent key={v.id} expanded={expanded === v.id} onChange={handleChange(v.id)}>
          {v.hasChild && (
            <Contents expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
              <Typography sx={{ color: '#fff', fontWeight: 700 }}>{v.title}</Typography>
            </Contents>
          )}
          {!v.hasChild && (
            <Button component={Link} to={v.linkUrl} disableRipple sx={BtnStyle}>
              {v.title}
            </Button>
          )}
          {children[v.id] && <Child value={children[v.id]} />}
        </Parent>
      ))}
    </>
  );
}

export default CategoryParent;
