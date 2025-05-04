/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32', // Verde principal
          light: '#4CAF50',   // Verde mais claro
          dark: '#1B5E20',    // Verde mais escuro
          contrast: '#004D00', // Alto contraste para modo de acessibilidade
        },
        accent: {
          DEFAULT: '#FFC107', // Amarelo principal
          light: '#FFD54F',   // Amarelo mais claro
          dark: '#FFA000',    // Amarelo mais escuro
          contrast: '#804000', // Alto contraste para modo de acessibilidade
        },
        action: {
          DEFAULT: '#1976D2', // Azul principal
          light: '#42A5F5',   // Azul mais claro
          dark: '#0D47A1',    // Azul mais escuro
          contrast: '#003366', // Alto contraste para modo de acessibilidade
        },
        neutral: {
          50: '#F5F5F5',
          100: '#EEEEEE',
          200: '#E0E0E0',
          300: '#BDBDBD',
          400: '#9E9E9E',
          500: '#757575',
          600: '#616161',
          700: '#424242',
          800: '#212121',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'slide-out': 'slideOut 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideIn: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      outline: {
        'focus-visible': '2px solid var(--focus-ring)',
      },
      boxShadow: {
        'focus-visible': '0 0 0 2px var(--focus-ring)',
      },
      borderWidth: {
        focus: '2px',
      },
    },
  },
  plugins: [
    // Plugin para gerar classes de alto contraste
    function({ addUtilities, theme }) {
      const highContrastUtilities = {
        '.high-contrast': {
          '--color-primary': theme('colors.primary.contrast'),
          '--color-accent': theme('colors.accent.contrast'),
          '--color-action': theme('colors.action.contrast'),
          '--border-width': '2px',
          '--focus-ring-width': '3px',
        },
        // Cores invertidas para modo de alto contraste
        '.high-contrast .text-white': {
          color: 'black',
          backgroundColor: 'white',
        },
        '.high-contrast .bg-white': {
          backgroundColor: 'black',
          color: 'white',
        },
        // Aumentar o contraste de texto em modo de alto contraste
        '.high-contrast .text-muted-foreground': {
          color: 'black',
        },
        // Aumentar bordas em modo de alto contraste
        '.high-contrast .border': {
          borderWidth: '2px',
        },
        // Melhorar o foco em modo de alto contraste
        '.high-contrast :focus': {
          outlineWidth: '3px',
          outlineStyle: 'solid',
          outlineColor: theme('colors.accent.contrast'),
        },
      };
      
      addUtilities(highContrastUtilities);
    },
    
    // Plugin para melhorar a acessibilidade de foco
    function({ addUtilities }) {
      const focusUtilities = {
        '.focus-ring': {
          outline: 'none',
          boxShadow: '0 0 0 2px var(--focus-ring, #FFC107)',
        },
      };
      
      addUtilities(focusUtilities);
    },
  ],
  // Classes de utilidade personalizadas para acessibilidade
  corePlugins: {
    accessibility: true,
    ringWidth: true,
    ringColor: true,
    outline: true,
    outlineColor: true,
  },
}
