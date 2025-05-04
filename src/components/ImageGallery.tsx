'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import ProgressiveImage from './ui/ProgressiveImage';
import { getLowQualityImageUrl } from '../lib/image-utils';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  columns?: 1 | 2 | 3 | 4;
  showCaptions?: boolean;
  enableZoom?: boolean;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  showCaptions = true,
  enableZoom = true,
  className = '',
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  
  // Determinar o número de colunas com base na prop
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };
  
  // Navegar para a próxima imagem
  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };
  
  // Navegar para a imagem anterior
  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };
  
  // Lidar com teclas de navegação
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch (e.key) {
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'Escape':
        setSelectedImage(null);
        break;
      case 'i':
        setShowInfo(!showInfo);
        break;
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      {/* Grade de miniaturas */}
      <div className={`grid ${gridColumns[columns]} gap-4`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative group overflow-hidden rounded-lg"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video bg-muted overflow-hidden rounded-lg cursor-pointer"
              onClick={() => enableZoom && setSelectedImage(index)}
            >
              <ProgressiveImage
                src={image.src}
                alt={image.alt}
                lowQualitySrc={getLowQualityImageUrl(image.src)}
                blurDataURL={image.blurDataURL}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 4} // Priorizar as primeiras 4 imagens
              />
              
              {/* Overlay de hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                {enableZoom && (
                  <ZoomIn 
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    size={24}
                  />
                )}
              </div>
            </motion.div>
            
            {/* Legenda da imagem */}
            {showCaptions && image.caption && (
              <div className="mt-2 text-sm text-muted-foreground">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Modal de visualização em tela cheia */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div 
              className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagem ampliada */}
              <motion.div
                className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-full">
                  <ProgressiveImage
                    src={images[selectedImage].src}
                    alt={images[selectedImage].alt}
                    lowQualitySrc={getLowQualityImageUrl(images[selectedImage].src, 40)}
                    blurDataURL={images[selectedImage].blurDataURL}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority={true} // Priorizar a imagem em tela cheia
                  />
                </div>
              </motion.div>
              
              {/* Botão de fechar */}
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Fechar visualização"
              >
                <X size={24} />
              </button>
              
              {/* Botão de informações */}
              <button
                className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={() => setShowInfo(!showInfo)}
                aria-label={showInfo ? "Ocultar informações" : "Mostrar informações"}
              >
                <Info size={24} />
              </button>
              
              {/* Botões de navegação */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <button
                    className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              {/* Painel de informações */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold mb-1">
                      {images[selectedImage].alt}
                    </h3>
                    {images[selectedImage].caption && (
                      <p className="text-sm text-gray-300">
                        {images[selectedImage].caption}
                      </p>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      Imagem {selectedImage + 1} de {images.length}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
