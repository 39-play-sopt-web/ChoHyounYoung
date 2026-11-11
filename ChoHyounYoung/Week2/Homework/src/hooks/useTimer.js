import { useCallback, useEffect, useRef, useState } from 'react';

export default function useTimer() {
  const [time, setTime] = useState(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    startTimeRef.current = null;
    setTime(0);
  }, []);

  const start = useCallback(() => {
    if (startTimeRef.current !== null) return;
    startTimeRef.current = performance.now();
    const update = () => {
      setTime(Math.floor((performance.now() - startTimeRef.current) / 10) / 100);
      frameRef.current = requestAnimationFrame(update);
    };
    frameRef.current = requestAnimationFrame(update);
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    const elapsed = startTimeRef.current === null
      ? 0 : (performance.now() - startTimeRef.current) / 1000;
    startTimeRef.current = null;
    setTime(elapsed);
    return elapsed;
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return { time, start, stop, reset };
}
