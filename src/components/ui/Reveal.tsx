'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface RevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delayMs?: number;
  readonly as?: 'div' | 'header' | 'article' | 'ul';
  readonly ariaLabel?: string;
}

/**
 * 強制リフロー（Forced Reflow）を発生させない非同期 IntersectionObserver ベースの
 * スクロールフェードインコンポーネント。
 * offsetWidth / getBoundingClientRect 等の同期ジオメトリ読み取りを一切行いません。
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  as: Component = 'div',
  ariaLabel,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  const transitionStyle: React.CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <Component
      ref={ref as React.RefObject<never>}
      aria-label={ariaLabel}
      style={transitionStyle}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`.trim()}
    >
      {children}
    </Component>
  );
};
