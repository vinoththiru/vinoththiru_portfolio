import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { audioEffects } from '../utils/audioEffects';

type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'outline-light' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type NativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type AnchorButtonProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type RouterLinkButtonProps = SharedProps &
  LinkProps & {
    as: 'link';
  };

export type ButtonProps = NativeButtonProps | AnchorButtonProps | RouterLinkButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-burgundy text-ivory border border-burgundy hover:bg-burgundy-deep hover:border-burgundy-deep shadow-card hover:shadow-editorial',
  secondary:
    'bg-white text-burgundy border border-burgundy/25 hover:border-burgundy hover:bg-blush/35',
  gold:
    'bg-gold text-burgundy-deep border border-gold hover:bg-gold-light hover:border-gold-light font-semibold shadow-card',
  'outline-light':
    'bg-transparent text-ivory border border-ivory/35 hover:border-gold hover:text-gold hover:bg-white/5',
  ghost:
    'bg-transparent text-burgundy border border-transparent hover:bg-blush/45',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-sm sm:text-base gap-2.5',
};

function getClasses(variant: ButtonVariant, size: ButtonSize, className: string) {
  return [
    'inline-flex items-center justify-center rounded-xl font-medium text-center transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:whitespace-nowrap',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ');
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const classes = getClasses(variant, size, className);

  if (props.as === 'a') {
    const {
      as: _as,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      onMouseEnter,
      onClick,
      ...anchorProps
    } = props;
    return (
      <a
        className={classes}
        onMouseEnter={(e) => {
          audioEffects.playHover();
          onMouseEnter?.(e);
        }}
        onClick={(e) => {
          audioEffects.playClick();
          onClick?.(e);
        }}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  if (props.as === 'link') {
    const {
      as: _as,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      onMouseEnter,
      onClick,
      ...linkProps
    } = props;
    return (
      <Link
        className={classes}
        onMouseEnter={(e) => {
          audioEffects.playHover();
          onMouseEnter?.(e);
        }}
        onClick={(e) => {
          audioEffects.playClick();
          onClick?.(e);
        }}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    as: _as,
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    onMouseEnter,
    onClick,
    ...buttonProps
  } = props;
  return (
    <button
      className={classes}
      onMouseEnter={(e) => {
        audioEffects.playHover();
        onMouseEnter?.(e);
      }}
      onClick={(e) => {
        audioEffects.playClick();
        onClick?.(e);
      }}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
