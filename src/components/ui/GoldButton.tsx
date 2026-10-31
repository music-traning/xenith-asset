import React from 'react';

export type GoldButtonVariant = 'primary' | 'outline' | 'ghost';
export type GoldButtonSize = 'md' | 'lg';

export interface GoldButtonProps {
  readonly children: React.ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly variant?: GoldButtonVariant;
  readonly size?: GoldButtonSize;
  readonly scaleOnHover?: boolean;
  readonly className?: string;
  readonly ariaLabel?: string;
}

/**
 * 4-1 / 4-2 / 4-4. 共通UIコンポーネント: GoldButton
 * - カラー: custom-gold (#C6A87C) / custom-gold-light (#E0CFA7) / custom-gold-dark (#A38558)
 * - フォント: Body用 font-sans font-medium (Noto Sans JP + Inter)
 * - インタラクション: transition-all duration-300 ease-in-out + hover:shadow-gold-glow
 */
export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  scaleOnHover = false,
  className = '',
  ariaLabel,
}) => {
  const sizeClasses: Record<GoldButtonSize, string> = {
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4 text-sm sm:px-9 sm:py-5 sm:text-base',
  };

  const variantClasses: Record<GoldButtonVariant, string> = {
    primary:
      'bg-custom-gold text-slate-950 font-medium border border-custom-gold-light/40 hover:bg-custom-gold-light active:bg-custom-gold-dark hover:shadow-gold-glow',
    outline:
      'bg-slate-800/40 backdrop-blur-md text-slate-50 font-medium border border-custom-gold/60 hover:border-custom-gold-light hover:bg-custom-gold/15 hover:text-custom-gold-light hover:shadow-gold-glow',
    ghost:
      'bg-slate-800/40 backdrop-blur-md text-slate-50 font-normal border border-slate-700/50 hover:border-custom-gold/50 hover:text-custom-gold-light hover:shadow-gold-glow',
  };

  const scaleClasses = scaleOnHover ? 'hover:scale-105' : '';

  const combinedClasses = `group inline-flex items-center justify-center gap-3 rounded-xl font-sans tracking-wider transition-all duration-300 ease-in-out ${sizeClasses[size]} ${variantClasses[variant]} ${scaleClasses} ${className}`.trim();

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};
