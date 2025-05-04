/**
 * Módulo de Analytics para rastreamento de uso da aplicação
 */

// Definição de tipos de eventos
export interface PageViewEvent {
  type: 'pageview';
  pathname: string;
  referrer?: string;
}

export interface ModuleEvent {
  type: 'module_view';
  moduleId: string;
  moduleName: string;
  topicId?: string;
  topicName?: string;
}

export interface InteractionEvent {
  type: 'interaction';
  category: 'click' | 'download' | 'checklist' | 'search' | 'other';
  action: string;
  label?: string;
  value?: number;
}

export interface AccessibilityEvent {
  type: 'accessibility';
  feature: 'high_contrast' | 'font_size' | 'reduced_motion' | 'screen_reader';
  enabled: boolean;
}

export type AnalyticsEvent = PageViewEvent | ModuleEvent | InteractionEvent | AccessibilityEvent;

/**
 * Enviar evento de analytics para o serviço configurado
 * @param event Evento de analytics
 */
export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  if (typeof window === 'undefined') return;
  
  // Adicionar metadados comuns a todos os eventos
  const enrichedEvent = {
    ...event,
    timestamp: new Date().toISOString(),
    sessionId: getOrCreateSessionId(),
    userId: getUserId(),
    deviceInfo: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    },
  };
  
  // Enviar para serviço de analytics configurado
  // Verificar se estamos em modo de produção para evitar rastreamento em dev
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
    try {
      if (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER === 'plausible') {
        await sendToPlausible(enrichedEvent);
      } else if (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER === 'vercel') {
        await sendToVercelAnalytics(enrichedEvent);
      } else if (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER === 'custom') {
        await sendToCustomAnalytics(enrichedEvent);
      } else {
        // Fallback para console.log em ambiente de desenvolvimento
        console.log('[Analytics]', enrichedEvent);
      }
    } catch (error) {
      // Silenciar erros de analytics para não interromper a experiência do usuário
      console.error('[Analytics Error]', error);
    }
  } else if (process.env.NODE_ENV === 'development') {
    // Log de eventos em desenvolvimento
    console.log('[Analytics Dev]', enrichedEvent);
  }
}

/**
 * Track page view events automatically
 */
export function initializeAnalytics(): void {
  if (typeof window === 'undefined') return;
  
  // Rastrear visualização de página inicial
  trackEvent({
    type: 'pageview',
    pathname: window.location.pathname,
    referrer: document.referrer,
  });
  
  // Interceptar navegações com Next.js Router
  if ('next' in window) {
    try {
      // @ts-ignore - Verificar existência do router em runtime
      const router = window.next.router;
      if (router && router.events) {
        router.events.on('routeChangeComplete', (url: string) => {
          trackEvent({
            type: 'pageview',
            pathname: url,
          });
        });
      }
    } catch (e) {
      console.warn('[Analytics] Failed to hook into Next.js router events', e);
    }
  }
}

// Funções Auxiliares

/**
 * Gerar ou recuperar ID de sessão
 */
function getOrCreateSessionId(): string {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  
  return sessionId;
}

/**
 * Obter ID de usuário anônimo
 */
function getUserId(): string {
  let userId = localStorage.getItem('analytics_user_id');
  
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('analytics_user_id', userId);
  }
  
  return userId;
}

/**
 * Gerar UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Implementações para serviços específicos

async function sendToPlausible(event: any): Promise<void> {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!plausibleDomain) return;
  
  // Adaptar formato do evento para Plausible
  let eventName = event.type;
  if (event.type === 'interaction') {
    eventName = `${event.category}:${event.action}`;
  } else if (event.type === 'module_view') {
    eventName = `module:${event.moduleId}`;
  } else if (event.type === 'accessibility') {
    eventName = `accessibility:${event.feature}:${event.enabled ? 'on' : 'off'}`;
  }
  
  // Ignorar erros de fetch para não interromper o fluxo
  try {
    await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: plausibleDomain,
        name: eventName,
        url: window.location.href,
        referrer: document.referrer,
        props: event,
      }),
    });
  } catch (e) {
    console.warn('[Plausible]', e);
  }
}

async function sendToVercelAnalytics(event: any): Promise<void> {
  // @ts-ignore - Verificar existência da biblioteca web vitals em runtime
  if (window.va) {
    try {
      let eventName = event.type;
      
      if (event.type === 'pageview') {
        // @ts-ignore
        window.va('pageview', {
          path: event.pathname,
        });
      } else {
        // @ts-ignore
        window.va('event', {
          name: eventName,
          data: event,
        });
      }
    } catch (e) {
      console.warn('[Vercel Analytics]', e);
    }
  }
}

async function sendToCustomAnalytics(event: any): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_CUSTOM_ANALYTICS_ENDPOINT;
  if (!endpoint) return;
  
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  } catch (e) {
    console.warn('[Custom Analytics]', e);
  }
} 