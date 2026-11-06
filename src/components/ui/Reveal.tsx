'use client';

import React from 'react';

export interface RevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delayMs?: number;
  readonly as?: 'div' | 'header' | 'article' | 'ul';
  readonly ariaLabel?: string;
}

/**
 * 初期ロード時の強制リフロー（Forced Reflow）およびスタイル再計算コストをゼロにするため、
 * JSによるマウント時DOM状態変更やIntersectionObserverの大量生成を行わず、
 * セマンティックなラッパー要素としてそのまま高速描画します。
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ariaLabel,
}) => {
  return (
    <Component aria-label={ariaLabel} className={className || undefined}>
      {children}
    </Component>
  );
};
