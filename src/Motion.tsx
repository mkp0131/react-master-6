import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { readBuilderProgram } from 'typescript';

const Container = styled.div`
  background: #c6ffdd; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f7797d,
    #fbd786,
    #c6ffdd
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f7797d,
    #fbd786,
    #c6ffdd
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 70%;
  height: 300px;
  gap: 0.5em;
`;

const Box = styled(motion.div)`
  /* width: 200px;
  height: 200px; */
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  /* position: absolute;
  top: 10px; */
  cursor: pointer;
  &:first-child {
    grid-column: 1 / span 2;
  }
  &:last-child {
    grid-column: 2 / span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Box} {
    width: 400px;
    height: 200px;
  }
`;

const Motion = () => {
  const [click, setClick] = useState('');

  const onClick = (id: string) => {
    setClick(id);
  };

  return (
    <>
      <Container>
        <BoxContainer>
          {['1', '2', '3', '4'].map((v) => {
            return (
              <Box key={v} layoutId={v} onClick={() => onClick(v)}>
                {v}
              </Box>
            );
          })}
        </BoxContainer>
        <AnimatePresence>
          {click ? (
            <Overlay
              initial={{ background: 'rgba(0, 0, 0, 0)' }}
              animate={{ background: 'rgba(0, 0, 0, 0.6)' }}
              exit={{ background: 'rgba(0, 0, 0, 0)' }}
              onClick={() => setClick('')}
            >
              <Box layoutId={click}></Box>
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default Motion;
