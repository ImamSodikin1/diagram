// components/FloatingNode.js

import React from 'react';
import { useSpring, animated } from 'react-spring';

const FloatingNode = ({ label }) => {
  const styles = useSpring({
    from: { x: 0, y: 0 },
    to: async (next) => {
      while (true) {
        await next({ x: Math.random() * 500, y: Math.random() * 400 });
        await next({ x: Math.random() * 500, y: Math.random() * 400 });
      }
    },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={{
        ...styles,
        position: 'absolute',
        background: '#FFD700',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {label}
    </animated.div>
  );
};

export default FloatingNode;
