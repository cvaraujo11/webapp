'use client';

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';
import { getLowQualityImageUrl } from '../../lib/image-utils';

interface DescriptiveImageProps {
  src: string;
  alt: string;
  detailedDescription?: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

const DescriptiveImage: React.FC<DescriptiveImageProps> = ({
  src,
  alt,
  detailedDescription,
  caption,
  width,
  height,
  priority = false,
  className = '',
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const imageId = `img-${Math.random().toString(36).substring(2, 9)}`;
  const hasDetailedDescription = !!detailedDescription;
  
  return (
    <figure className="relative overflow-hidden rounded-lg">
      <div className="relative">
        <ProgressiveImage
          src={src}
          alt={alt}
          lowQualitySrc={getLowQualityImageUrl(src)}
          width={width}
          height={height}
          priority={priority}
          className={`rounded-lg ${className}`}
          aria-describedby={hasDetailedDescription ? `${imageId}-desc` : undefined}
        />
        
        {/* Botão de descrição detalhada */}
        {hasDetailedDescription && (
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="absolute bottom-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
            aria-expanded={showDescription}
            aria-controls={`${imageId}-desc`}
            aria-label={showDescription ? "Ocultar descrição detalhada" : "Mostrar descrição detalhada"}
          >
            <Info size={16} />
          </button>
        )}
      </div>
      
      {/* Descrição detalhada */}
      {hasDetailedDescription && (
        <div
          id={`${imageId}-desc`}
          className={`mt-2 p-3 bg-neutral-100 rounded-md text-sm text-neutral-700 transition-opacity ${
            showDescription ? 'block opacity-100' : 'sr-only'
          }`}
          aria-live="polite"
        >
          <h3 className="font-medium mb-1">Descrição detalhada:</h3>
          <p>{detailedDescription}</p>
        </div>
      )}
      
      {/* Legenda */}
      {caption && (
        <figcaption className="mt-2 text-sm text-neutral-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default DescriptiveImage; 