/* Only fill real IDs. Empty IDs never load vendor scripts.
   GTM mode: set gtmId and leave other IDs empty; use the documented dataLayer events.
   Direct mode: leave gtmId empty. Route-local GA4 / Ads / Meta IDs only.
   Consent: connect your consent manager to PASMeasurement.setConsent(). */
window.PAS_TRACKING = {
  creative: { ga4Id: '', adsId: '', adsConversions: {}, metaPixelId: '', gtmId: '' },
  music: { ga4Id: '', adsId: '', adsConversions: {}, metaPixelId: '', gtmId: '' }
};
