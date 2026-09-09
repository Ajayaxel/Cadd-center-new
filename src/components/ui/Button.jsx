import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'link'
  size = 'md',        // 'sm' | 'md' | 'lg'
  href,
  onClick,
  className = '',
  icon = true,
  type = 'button',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base'
  };

  // `group` is what makes the trailing arrow animate on hover — without it the
  // group-hover classes on the icon below never fire.
  const baseClasses =
    'group inline-flex items-center justify-center font-bold tracking-wide cursor-pointer select-none ' +
    'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E94B3C] focus-visible:ring-offset-2';

  const variantClasses = {
    primary:
      'bg-[#E94B3C] hover:bg-[#D4382A] text-white rounded-[8px] shadow-sm hover:shadow-lg hover:shadow-[#E94B3C]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]',
    secondary:
      'bg-white hover:bg-slate-50 text-[#1C2533] border border-[rgba(28,37,51,0.18)] hover:border-[#E94B3C]/50 rounded-[8px] shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]',
    link:
      'bg-transparent text-[#1C2533] hover:text-[#E94B3C] p-0 font-bold underline underline-offset-4 decoration-1 hover:decoration-[#E94B3C] hover:underline-offset-[6px] active:scale-[0.98] focus-visible:ring-offset-0'
  };

  const combinedClasses = `${baseClasses} ${variant !== 'link' ? sizeClasses[size] : ''} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && variant !== 'secondary' && (
        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2] ml-1 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
