import type { ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = ({ src, alt, fallback = '?', size = 'md', className = '', ...props }: AvatarProps) => {
  const sizeMap = {
    sm: { width: '32px', height: '32px', fontSize: 'var(--font-sm)' },
    md: { width: '40px', height: '40px', fontSize: 'var(--font-base)' },
    lg: { width: '56px', height: '56px', fontSize: 'var(--font-lg)' }
  };

  const style = {
    ...sizeMap[size],
    borderRadius: 'var(--radius-full)',
    objectFit: 'cover' as const,
    border: '1px solid var(--color-secondary)'
  };

  if (!src) {
    return (
      <div 
        className={className}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontWeight: 'bold'
        }}
      >
        {fallback}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} style={style} {...props} />;
};
