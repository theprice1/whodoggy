// packages/web/src/components/Image/ResponsiveImage.tsx
import React, { useState } from 'react';
import styles from './ResponsiveImage.module.css';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  placeholder?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  className,
  placeholder = '/images/placeholders/dog-placeholder.png',
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Generate srcset for different resolutions
  const generateSrcSet = () => {
    const baseName = src.replace(/\.[^/.]+$/, '');
    const extension = src.match(/\.[^/.]+$/)?.[0] || '.png';

    return `
      ${baseName}@1x${extension} 1x,
      ${baseName}@2x${extension} 2x,
      ${baseName}@3x${extension} 3x
    `;
  };

  // WebP support with fallback
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');

  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet={webpSrc}
        sizes={sizes}
      />
      <source
        type="image/png"
        srcSet={generateSrcSet()}
        sizes={sizes}
      />
      <img
        src={error ? placeholder : src}
        alt={alt}
        loading={loading}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`${styles.image} ${loaded ? styles.loaded : ''}`}
      />
    </picture>
  );
};
