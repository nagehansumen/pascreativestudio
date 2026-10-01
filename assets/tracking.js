(function () {
  'use strict';
  const brand = document.body.dataset.brand;
  const config = (window.PAS_TRACKING || {})[brand];
  if (!config || !['creative', 'music'].includes(brand)) return;
  const path = location.pathname;
  const consent = { analytics: false, marketing: false };
  let googleLoaded = false, metaLoaded = false, gtmLoaded = false;
  const configured = new Set();
  window.dataLayer = window.dataLayer || [];
  const gtag = function () { window.dataLayer.push(arguments); };
  function script(src) { const el = document.createElement('script'); el.async = true; el.src = src; document.head.appendChild(el); }
  const ga = /^G-[A-Z0-9]+$/.test(config.ga4Id || '') ? config.ga4Id : '';
  const ads = /^AW-\d+$/.test(config.adsId || '') ? config.adsId : '';
  const pixel = /^\d+$/.test(config.metaPixelId || '') ? config.metaPixelId : '';
  const gtm = /^GTM-[A-Z0-9]+$/.test(config.gtmId || '') ? config.gtmId : '';
  function loadGoogle() {
    if (!googleLoaded) {
      googleLoaded = true; window.gtag = gtag;
      gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      gtag('js', new Date()); script('https://www.googletagmanager.com/gtag/js?id=' + ((consent.analytics && ga) || ads));
    }
    gtag('consent', 'update', { analytics_storage: consent.analytics ? 'granted' : 'denied', ad_storage: consent.marketing ? 'granted' : 'denied', ad_user_data: consent.marketing ? 'granted' : 'denied', ad_personalization: consent.marketing ? 'granted' : 'denied' });
    if (ga && consent.analytics && !configured.has(ga)) {
      configured.add(ga); gtag('config', ga, { send_page_view: false, cookie_prefix: 'pas_' + brand });
      gtag('event', 'page_view', { send_to: ga, brand: brand, page_path: path, page_location: location.origin + path, page_title: document.title });
    }
    if (ads && consent.marketing && !configured.has(ads)) { configured.add(ads); gtag('config', ads); }
  }
  function loadMeta() {
    if (metaLoaded || !pixel || !consent.marketing) return;
    metaLoaded = true;
    if (!window.fbq) {
      const n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      script('https://connect.facebook.net/en_US/fbevents.js');
    }
    window.fbq('consent', 'grant'); window.fbq('init', pixel);
    window.fbq('trackSingle', pixel, 'PageView', { brand: brand });
  }
  function setConsent(value) {
    consent.analytics = value.analytics === true; consent.marketing = value.marketing === true;
    if (gtm) {
      if (!gtmLoaded && (consent.analytics || consent.marketing)) {
        gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        gtmLoaded = true; window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js', brand: brand });
        script('https://www.googletagmanager.com/gtm.js?id=' + gtm);
      }
      if (gtmLoaded) {
        gtag('consent', 'update', { analytics_storage: consent.analytics ? 'granted' : 'denied', ad_storage: consent.marketing ? 'granted' : 'denied', ad_user_data: consent.marketing ? 'granted' : 'denied', ad_personalization: consent.marketing ? 'granted' : 'denied' });
        window.dataLayer.push({ event: 'pas_consent_update', brand: brand, analytics_consent: consent.analytics, marketing_consent: consent.marketing });
      }
      return;
    }
    if ((ga && consent.analytics) || (ads && consent.marketing) || googleLoaded) loadGoogle();
    if (metaLoaded) window.fbq('consent', consent.marketing ? 'grant' : 'revoke');
    loadMeta();
  }
  const intents = new Set(['contact', 'quote_request', 'space_inquiry', 'rehearsal_inquiry', 'recording_inquiry', 'production_inquiry', 'lesson_inquiry']);
  function intentFor(el) {
    if (intents.has(el.dataset.intent)) return el.dataset.intent;
    if (path.includes('creative-space') || el.closest('#creative-space')) return 'space_inquiry';
    if (path.includes('prova-studyosu')) return 'rehearsal_inquiry';
    if (path.includes('kayit-studyosu')) return 'recording_inquiry';
    if (path.includes('muzik-produksiyonu')) return 'production_inquiry';
    return 'contact';
  }
  function emit(action, intent) {
    if (!consent.analytics && !consent.marketing) return;
    const name = brand + '_' + action;
    // Never include email, telephone, free text, query strings or form field values.
    const params = { brand: brand, intent: intents.has(intent) ? intent : 'contact', page_path: path };
    if (gtm) { window.dataLayer.push(Object.assign({ event: name }, params)); return; }
    if (ga && consent.analytics) gtag('event', name, Object.assign({ send_to: ga }, params));
    const label = (config.adsConversions || {})[name];
    if (ads && consent.marketing && typeof label === 'string' && /^[A-Za-z0-9_-]+$/.test(label)) gtag('event', 'conversion', Object.assign({ send_to: ads + '/' + label }, params));
    if (metaLoaded && consent.marketing) window.fbq('trackSingleCustom', pixel, name, params);
  }
  document.addEventListener('click', function (event) {
    const a = event.target.closest('a[href]'); if (!a) return;
    const href = a.getAttribute('href'); let action;
    if (/^tel:/i.test(href)) action = 'phone_click';
    else if (/^mailto:/i.test(href)) action = 'email_click';
    else if (/^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) action = 'whatsapp_click';
    if (action) emit(action, intentFor(a));
  });
  window.PASMeasurement = {
    setConsent: setConsent,
    // Call only after your backend has confirmed a successful submission/booking.
    leadSuccess: function (intent) { emit('generate_lead', intent); }
  };
  window.addEventListener('pas:consent', e => setConsent(e.detail || {}));
  if (window.PAS_CONSENT) setConsent(window.PAS_CONSENT);
})();
