import React from 'react';

export interface GlassCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly interactive?: boolean;
  readonly highlighted?: boolean;
  readonly as?: 'div' | 'article' | 'section';
}

/**
 * 4-4. 共通UIコンポーネント: GlassCard (グラスモーフィズム・サーフェス)
 * ベースクラス: bg-slate-800/40 backdrop-blur-md border border-slate-700/50 shadow-glass
 * インタラクティブ時は transition-all duration-300 ease-in-out hover:border-custom-gold hover:shadow-gold-glow
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  interactive = false,
  highlighted = false,
  as: Component = 'div',
}) => {
  const baseClasses = 'rounded-2xl backdrop-blur-md shadow-glass';
  const surfaceClasses = highlighted
    ? 'border-2 border-custom-gold bg-gradient-to-b from-custom-gold/15 via-slate-900/90 to-slate-950 shadow-gold-glow'
    : 'bg-slate-800/40 border border-slate-700/50';
  const interactiveClasses = interactive
    ? 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-custom-gold hover:bg-slate-800/60 hover:shadow-gold-glow'
    : 'transition-all duration-300 ease-in-out';

  return (
    <Component
      className={`${baseClasses} ${surfaceClasses} ${interactiveClasses} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};
