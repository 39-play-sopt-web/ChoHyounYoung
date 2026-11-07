import { useEffect, useRef } from 'react';

export function useIntersectionObserver(onIntersect: () => void, enabled: boolean) {
  const targetRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    // 스크롤 이벤트를 계속 실행하는 대신 마지막 감지 요소가 보일 때만 다음 페이지를 요청한다.
    // rootMargin을 두어 화면 끝에 닿기 직전에 미리 불러오도록 했다.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callbackRef.current();
    }, { rootMargin: '240px' });

    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled]);

  return targetRef;
}
