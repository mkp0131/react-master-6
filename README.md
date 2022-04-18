# 리액트 마스터 6

## Framer Motion

- https://www.framer.com/docs/introduction/

### 사용법

- 애니메이션을 사용할 컴포넌트는 html 컴포넌트가 아닌 <motion.{html}> 컴포넌트를 사용한다.

```js
import { motion } from 'framer-motion';

<motion.div>
```

- syteld-compoents 와 같이 사용가능

```js
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
`;
```

- 컴포넌트의 props 로 애니메이션을 정의해서 사용

```js
<Box
  transition={{ duration: 1, type: 'spring' }}
  animate={{
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 270, 270, 0],
    borderRadius: ['20%', '20%', '50%', '50%', '20%'],
  }}
/>
```

- variants 라는 애니메이션 속성을 정의한 obj 로 사용도 가능

```js
const myVars = {
  start: {},
  end: {
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 270, 270, 0],
    borderRadius: ['20%', '20%', '50%', '50%', '20%'],
    transition: { duration: 1, type: 'spring' },
  },
};

const Motion = () => {
  return (
    <>
      <Container>
        <Box variants={myVars} initial="start" animate="end" />
      </Container>
    </>
  );
};
```

### 속성값

- delayChildren, staggerChildren

```js
transition: {
  delayChildren: 0.3, // 자식들에 붙어있는 애니메이션을 부모 애니메이션이 실행한 후 딜레이를 주어서 실행
  staggerChildren: 0.2, // 자식들끼리 순차적으로 딜레이를 주어서 실행
},
```

- transition 값을 속성별로도 줄 수 있다.

```js
const svgVar = {
  init: { pathLength: 0, fill: 'rgba(255, 255, 255, 0)' },
  end: {
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
    transition: {
      default: { duration: 5 },
      fill: { duration: 3, delay: 3 },
    },
  },
};
```

- whileHover, whileTap

```js
whileHover={{ scale: 1.2, rotate: 90 }}, // 도형에 hover 하고 있는동안
whileTap={{
  scale: 0.8,
  rotate: -90,
  borderRadius: "100%"
}},  // 누르고 있는 동안(keyup 이 되면 애니메이션 풀림)
```

- drag, dragConstraints

```js
drag, // 드레그시 애니메이션 부여: 아무 애니메이션도 없을 경우 / 해당 요소에 드레그 속성을 부여
dragConstraints={constraintsRef}, // 드레그로 이동가능한 영역을 지정, 리액트 useRef 속성을 이용 / 가능한 영역을 지정하지 않을경우 영원히 날라간다.

const constraintsRef = useRef(null)

return (
  <motion.div ref={constraintsRef}>
    <motion.div
      drag
      dragConstraints={constraintsRef}
    />
  </motion.div>
)
```

### motionValue, useTransform

- motionValue: 애니메이션의 값을 트래킹, 해당 기준에 추가적인 애니메이션을 걸 수 있다.

```js
const Motion = () => {
  const x = useMotionValue(0); // motionValue 를 정의

  // useEffect 를 이용하여 값을 추적한다.
  useEffect(() => {
    x.onChange(() => {
      console.log(x.get());
    });
  }, [x]);

  // 추적하고 싶은 element 의 style 에 motionValue 를 넣어준다.
  return (
    <>
      <Container>
        <Box style={{ x }} drag="x" dragSnapToOrigin></Box>
      </Container>
    </>
  );
};
```

- useTransform: motionValue 값을 다른 값으로 손쉽게 변환 할 수 있다.

```js
const Motion = () => {
  const x = useMotionValue(0);
  // 첫번째 인자: motionValue, 두번째 input Value, 세번째 output Value
  const scale = useTransform(x, [400, 0, -400], [2, 1, 0.1]);
  useEffect(() => {
    x.onChange(() => {
      console.log(x.get());
    });
  }, [x]);

  // style 에 원하는 애니메이션을 지정하고 그 값을 넣어준다.
  return (
    <>
      <Container>
        <Box style={{ x, scale: scale }} drag="x" dragSnapToOrigin></Box>
      </Container>
    </>
  );
};
```

### useViewportScroll()

- 뷰포트의 스크롤 양을 체크
- 구조분해할당을 얻은 값 {scrollY, scrollYProgress}
- scrollY: 스크롤의 값
- scrollYProgress: 스크롤한 값 / 뷰포트 = '% 값'

```js
const Motion = () => {
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  useEffect(() => {
    scrollY.onChange(() => {
      console.log('@', scrollY.get(), scrollYProgress.get());
    });
  }, [scrollY]);

  return (
    <>
      <Container>
        <Box style={{ scale }} drag="x" dragSnapToOrigin></Box>
      </Container>
    </>
  );
};
```

### pathLength 선그리기 (svg 요소 애니메이션)

- 0~1 값으로 선의 그려짐을 표현 할 수 있다.

```js
const svgVar = {
  init: { pathLength: 0, fill: 'rgba(255, 255, 255, 0)' },
  end: {
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
    transition: {
      default: { duration: 5 },
      fill: { duration: 3, delay: 3 },
    },
  },
};
```

### <AnimatePresence>

- 컴포넌트들이 사라지고 생길때 애니메이션을 걸 수 있다.

```js
const boxVar = {
  init: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  leaving: {
    opacity: 0,
    scale: 0,
  },
};

// <AnimatePresence> 로 애니메이션 할 컴포넌트를 감싼다.
// 컴포넌트가 생성될때는 initial, animate 가 실행이되고
// 컴포넌트가 사라질때는 exit 가 실행이된다.
return (
  <>
    <Container>
      <AnimatePresence>
        {boxVisible ? (
          <Box
            variants={boxVar}
            initial={'init'}
            animate={'visible'}
            exit={'leaving'}
          />
        ) : null}
      </AnimatePresence>
      <div>
        <button onClick={onClick}>클릭</button>
      </div>
    </Container>
  </>
);
```

### exitBeforeEnter

- 사라지는 애니메이션이 종료되어야 다음 애니메이션이 실행된다.
- 부모 컴포넌트인 <AnimatePresence> 에 값을 부여한다.

```js
<AnimatePresence exitBeforeEnter>
  <Box
    variants={boxVar}
    initial={'init'}
    animate={'visible'}
    exit={'leaving'}
    key={boxVisible}
  >
    {boxVisible}
  </Box>
</AnimatePresence>
```

### custom

- 애니메이션 variants 값에 추가 변수를 넘겨 줄 수 있다.
- 해당하는 컴포넌트와 부모 컴포넌트인 <AnimatePresence> 에 custom 값을 넣어주어야한다.

```js
const boxVar = {
  init: (custom: boolean) => ({ x: custom ? -500 : 500, opacity: 0, scale: 0 }),
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  leaving: (custom: boolean) => ({
    x: custom ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
};

const Motion = () => {
  const [boxVisible, setBoxVisible] = useState(0);
  const [boxDirection, setBoxDirection] = useState(true);

  const onClickNext = () => {
    setBoxDirection(true);
    setBoxVisible((prev) => (prev >= 9 ? 9 : prev + 1));
  };

  const onClickPrev = () => {
    setBoxDirection(false);
    setBoxVisible((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  return (
    <>
      <Container>
        <AnimatePresence custom={boxDirection}>
          <Box
            custom={boxDirection}
            variants={boxVar}
            initial={'init'}
            animate={'visible'}
            exit={'leaving'}
            key={boxVisible}
          >
            {boxVisible}
          </Box>
        </AnimatePresence>
        <div>
          <button onClick={onClickNext}>다음</button>
          <button onClick={onClickPrev}>이전</button>
        </div>
      </Container>
    </>
  );
};
```

### layout, layoutId

- 애니메이션을 자동으로 부여해준다.
- 애니메이션이 실행되는 컴포넌트에 props 로 layout 을 넣어준다.
- layoutId: 두개이상의 컴포넌트에 동일한 layoutId 를 부여, 연결된 애니메이션을 자동으로 부여

```js
const Motion = () => {
  const [click, setClick] = useState(false);

  const onClick = () => {
    setClick((prev) => !prev);
  };

  return (
    <>
      <Container onClick={onClick}>
        <AnimatePresence>
          <Box style={{ alignItems: click ? 'center' : 'flex-start' }}>
            <Circle layout />
          </Box>
        </AnimatePresence>
      </Container>
    </>
  );
};
```

- layoutId 예제

```js
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
```
