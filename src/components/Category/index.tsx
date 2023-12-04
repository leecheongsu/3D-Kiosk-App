import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import CategoryIconButton from '@components/Button/CategoryIcon';
import CategoryParent from '@components/Category/Parent';

const Container = styled.div`
  position: absolute;
  top: 20%;
  z-index: 1000;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0;
  //-webkit-animation: forwards 3s; /* Safari and Chrome */
`;

function CategoryContainer({ value, isShowCategory }) {
  const [isShow, setShow] = useState(false);
  const [parent, setParent] = useState([]);
  const [children, setChildren] = useState([]);
  //카테고리 위치
  const [isLeftAlign, setIsLeftAlign] = useState(false);

  useEffect(() => {
    const pIdData = value.reduce(
      (acc, item) => {
        const pId = item.parentId || '';
        if (!acc[pId]) {
          acc[pId] = [];
        }
        acc[pId].push(item);
        return acc;
      },
      [value],
    );

    try {
      const topLevel = pIdData[''].filter((item) => !item.parentId);
      const sorted = [...topLevel].sort((a, b) => a.order - b.order);

      setParent(sorted);
      setChildren(pIdData);
      /**
       *  TODO. 리팩토링
       */
      setIsLeftAlign(topLevel[0].leftAlign);
      setShow(isShowCategory);
    } catch (e) {
      console.error('There is no data', e);
    }
  }, [value]);

  //외부영역 마우스다운 감지
  const categoryBoxRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryBoxRef.current && !categoryBoxRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categoryBoxRef]);

  return (
    <>
      {isShow && (
        <Container
          ref={categoryBoxRef}
          style={{ left: isLeftAlign ? '43px' : 'auto', right: isLeftAlign ? 'auto' : '43px' }}
        >
          <CategoryParent parent={parent} children={children} />
        </Container>
      )}
      {!isShow && (
        <CategoryIconButton
          aria-label="DehazeRounded"
          disableRipple
          onClick={() => setShow(true)}
          isLeftAlign={isLeftAlign}
        />
      )}
    </>
  );
}

export default CategoryContainer;
