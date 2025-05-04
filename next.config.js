/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Domínios permitidos para imagens externas
    domains: ['via.placeholder.com', 'images.unsplash.com', 'cloudinary.com', 'imagekit.io'],
    // Configurações de cache para imagens
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 dias
    // Habilitar formato WebP
    formats: ['image/webp'],
    // Tamanhos de imagem que podem ser gerados pela otimização
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // swcMinify já é padrão no Next.js 15, não precisa ser especificado
  
  // Configuração para habilitar dados dinâmicos em páginas estáticas
  experimental: {
    // Habilitar compilação paralela
    parallelServerCompiles: true,
    // Usar linters durante a compilação
    workerThreads: true,
    // Otimizar para um melhor code splitting
    optimizeCss: true,
    // optimizeFonts foi movido para a raiz da configuração
    // Mantendo apenas as configurações experimentais válidas
  },
  
  // Configuração de compressão
  compress: true,
  
  // Configuração de headers de cache para conteúdo estático
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(jpg|jpeg|png|webp|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Habilitar análise de pacotes
  webpack(config, { isServer, dev }) {
    // Configuração para fazer code splitting mais eficiente
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        // Commons chunk
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
        },
        // Vendor chunk para bibliotecas externas
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Obter o nome do pacote
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            // Normalizar nome (evitar caracteres inválidos)
            return `npm.${packageName.replace('@', '')}`;
          },
          chunks: 'all',
        },
      },
    };
    
    return config;
  },
};

module.exports = nextConfig;
