'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '../../lib/utils';

interface ProgressiveImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  lowQualitySrc?: string;
  blurDataURL?: string;
  className?: string;
  containerClassName?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  lowQualitySrc,
  blurDataURL,
  className,
  containerClassName,
  priority = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  
  return (
    <div
      className={cn(
        'overflow-hidden relative',
        containerClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300 ease-in-out',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        {...(blurDataURL && { blurDataURL, placeholder: 'blur' })}
        {...(!priority && { loading: 'lazy' })}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
      
      {isLoading && lowQualitySrc && (
        <Image
          src={lowQualitySrc}
          alt={alt}
          className={cn(
            'absolute inset-0 transition-opacity duration-300 ease-in-out',
            'opacity-100 filter blur-[2px] scale-105',
            className
          )}
          fill={!props.width && !props.height}
          {...(props.width && { width: props.width })}
          {...(props.height && { height: props.height })}
        />
      )}
    </div>
  );
};

export default ProgressiveImage; 