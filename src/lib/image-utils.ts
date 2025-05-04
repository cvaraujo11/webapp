/**
 * Utilitários para manipulação de imagens
 */

/**
 * Gera uma URL de imagem com qualidade reduzida
 * @param url URL original da imagem
 * @param width Largura da imagem de baixa qualidade (padrão: 20)
 * @returns URL para versão de baixa qualidade da imagem
 */
export function getLowQualityImageUrl(url: string, width: number = 20): string {
  // Se a URL for da pasta pública local
  if (url.startsWith('/')) {
    // Para imagens locais, retornamos uma versão blur placeholder
    return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=10`;
  }
  
  // Se for uma URL externa
  // Verificar se é uma URL do ImageKit, Cloudinary ou outros serviços conhecidos
  if (url.includes('imagekit.io')) {
    // ImageKit permite parâmetros de transformação
    return `${url}?tr=w-${width},q-10`;
  }
  
  if (url.includes('cloudinary.com')) {
    // Cloudinary permite parâmetros de transformação
    // Encontrar "upload/" na URL e inserir transformações
    return url.replace('/upload/', `/upload/w_${width},q_10/`);
  }
  
  // Para outras URLs, retornamos a URL original
  // Uma alternativa seria usar um serviço de proxy de imagem
  return url;
}

/**
 * Gera um data URL de placeholder blur para imagens
 * @param width Largura do placeholder
 * @param height Altura do placeholder 
 * @returns Data URL do placeholder
 */
export function generateBlurPlaceholder(
  width: number = 10,
  height: number = 10
): string {
  // Gerar um SVG simples com efeito blur
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="b" x="0" y="0">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <rect width="${width}" height="${height}" fill="#cccccc" filter="url(#b)" />
    </svg>
  `;
  
  const encodedSvg = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encodedSvg}`;
}

/**
 * Verifica se uma imagem está em cache
 * @param src URL da imagem
 * @returns Booleano indicando se a imagem está em cache
 */
export function isImageCached(src: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const img = new Image();
  img.src = src;
  return img.complete;
} 