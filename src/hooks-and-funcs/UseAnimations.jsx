import React, { useState, useEffect } from 'react';

const UseAnimations = (ref)=> {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const componentTop = ref.current.getBoundingClientRect().top;
        const threshold = window.innerHeight;

        if (componentTop < threshold) {
          setShouldAnimate(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return shouldAnimate;
}

export default UseAnimations;
