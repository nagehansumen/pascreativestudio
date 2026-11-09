# PAS — SEO yapısı ve yayın notları

2 Ekim 2026. Kaynak: Kullanıcının verdiği pas-website(1).zip.

## Uygulanan yapı

| URL | Amaç / işletme |
| --- | --- |
| `/` | Mevcut Creative / Music seçim ekranı; ortak PAS girişi |
| `/creative/` | PAS Creative Studio; tasarım ve prodüksiyon ana markası |
| `/creative/creative-space/` | Kiralık fotoğraf / video stüdyosu; Creative altında hizmet |
| `/creative/hizmetler/` | Marka kimliği, tasarım, sosyal medya, web ve prodüksiyon |
| `/creative/isler/` | Mevcut markalar listesi; uydurma vaka çalışması eklenmedi |
| `/music/` | PAS Music Studio; prova, kayıt ve müzik üretimi |
| `/music/prova-studyosu/` | Yüksek öncelikli lokal prova sayfası |
| `/music/kayit-studyosu/` | Kayıt stüdyosu sayfası |
| `/music/muzik-produksiyonu/` | Aranje, mix ve mastering |
| `/promptlar/` ve mevcut üç alt sayfası | Korunan Creative arşivi |

13 indexlenebilir URL, her biri kendi canonical adresiyle sitemap.xml içinde. 404 sayfası noindex. Yeni hizmet sayfaları gerçek statik HTML dosyalarıdır; JavaScript olmadan da içerik ve bağlantılar çalışır.

Mevcut ana ekranların CSS tasarımı, fontları, renkleri, logoları ve görselleri korundu. Menüdeki Studio ve Creative Space linkleri artık ayrı hizmet sayfalarına gider. Music hizmet listesine prova ve kayıt satırları eklendi. Yeni sayfalarda aynı tasarım bileşenleri ve renkler kullanıldı.

## Kaynakta bulunan ve düzeltilen konular

- Creative yalnızca `#creative` görünümüydü; `/creative/` oluşturuldu.
- Ortak giriş ve Creative artık farklı title, açıklama, canonical ve schema taşır.
- Hizmetler, markalar ve Creative iletişim bilgileri JavaScript ile dolduruluyordu; kaynak HTML içine de yazıldı.
- Her ana ve hizmet sayfasına özgün title, meta description, Open Graph/Twitter etiketleri; uygun WebPage, BreadcrumbList ve Service verileri eklendi.
- Creative ve Music için ayrı ve kalıcı `@id`: `/creative/#business`, `/music/#business`. Creative Space ayrı üçüncü işletme olarak tanımlanmadı; Service sağlayıcısı Creative.
- Fotoğrafların HTML boyutları gerçek dosya boyutlarıyla eşleştirildi. Mevcut alt metinler ve lazy loading korundu; hero fotoğrafına yüksek yükleme önceliği eklendi. Fotoğraflar yeniden sıkıştırılmadı; mevcut JPEG dosyaları aynen korundu.
- Arşivdeki Creative dönüş bağlantıları ve schema marka bağlantıları güncellendi. Prompt metinleri korundu.
- Telefon / e-posta tıklamalarının gerçek tamamlanmış rezervasyon veya form gönderimi gibi sayılması önlendi.

## Yayına alma

ZIP içeriğini domain'in kök klasörüne koyun; üstte fazladan klasör bırakmayın. Ana dosya `index.html` doludur. Statik hosting yeterli; npm kurulumu veya build gerekmez. Domain `https://pascreativestudio.com` olarak kaynak dosyadan korundu. Başka domain kullanılacaksa canonical, schema, Open Graph, robots ve sitemap birlikte güncellenmeli.

Yerel inceleme için bu klasörde `python3 -m http.server 8000` çalıştırıp http://localhost:8000 açın. Dosyaya çift tıklamak yerine HTTP kullanın; kökten başlayan bağlantılar vardır.

- Apache: `.htaccess` dizin ana sayfası, gerçek 404 ve explicit index.html → dizin 301 yönlendirmesi içerir. Sunucuda mod_rewrite ve AllowOverride etkin olmalı.
- Netlify / Cloudflare Pages: `_redirects` explicit index.html aliaslarını 301 ile normalleştirir; kökteki 404.html kullanılır.
- GitHub Pages: `.nojekyll` eklendi; özel domain kökünde yayınlayın. `_redirects` GitHub Pages'te uygulanmaz; dosya aliasları canonical ile birleştirilir. Proje alt dizini için bu paket doğrudan uygun değildir.
- Diğer hostlar: klasör/index.html çözümlemesini ve bulunmayan URL'lerin HTTP 404 dönmesini ayarlayın. Her URL'yi ana index.html dosyasına düşüren SPA fallback kullanmayın.

Eski `/#creative`, `/#studio`, `/#creative-space`, `/#paslastik`, `/#hakkimizda`, `/#iletisim` bağlantıları tarayıcıda karşılıklarına aktarılır. Fragment (`#`) sunucuya gönderilmediğinden bunlar sunucu 301'i değildir. Site içindeki bağlantılar doğrudan yeni URL'leri kullanır.

Bu çalışma mevcut canlı siteye yüklenmedi. Sunucu erişimi / yayın işlemi bu ZIP tesliminin dışındadır.

## Ölçüm ve reklam kurulumu — hesap bilgileri bekleniyor

`assets/tracking-config.js` içinde Creative ve Music alanları ayrıdır. Gerçek kimlikler gelene kadar boş kalır, harici takip scripti yüklenmez. Ortak giriş iki markaya da page_view göndermez. `/promptlar/` Creative'e aittir.

İki seçenekten birini kullanın:

1. **Doğrudan etiket:** Markanın `ga4Id`, `adsId`, `metaPixelId` alanlarını doldurun. `gtmId` boş kalmalı. GA4 olayları `send_to` ile yalnızca o markanın mülküne; Meta olayları `trackSingle` / `trackSingleCustom` ile yalnızca o markanın Pixel'ine gider.
2. **GTM:** Her markanın `gtmId` alanını doldurun. Doğrudan ID'leri boş bırakın. Konteynerde o markanın GA4, Ads ve Meta etiketlerini kurun, izin kontrollerini uygulayın. Data layer'daki `brand`, `intent`, `page_path` alanlarını ve aşağıdaki eventleri kullanın. Konteyner içinde page_view'u tek kez ayarlayın; mükerrer etiket kurmayın.

Hesap kimliği eklemek tek başına yeterli değildir. Mevcut veya eklenecek izin yönetimi arayüzünün sonucunu aşağıdaki API'ye bağlayın. Yeni bir çerez banner'ı tasarımı eklenmedi.

```js
// Kullanıcı tercihi alındıktan sonra; bu örneği koşulsuz çalıştırmayın.
window.PASMeasurement.setConsent({ analytics: true, marketing: false });
// Erken hazır olan tercihler için tracking.js yüklenmeden önce:
window.PAS_CONSENT = { analytics: true, marketing: false };
// İptal / tercih değişikliği:
window.PASMeasurement.setConsent({ analytics: false, marketing: false });
```

Ölçüm kodu tercih saklamaz; tercih kalıcılığını izin yöneticiniz sağlamalıdır. Tercih yokken GA4, Ads, Meta ve GTM yüklenmez. GTM içindeki özel Meta etiketlerinin de aynı tercihe uyması gerekir.

| Event | Anlamı |
| --- | --- |
| `creative_phone_click` / `music_phone_click` | Telefon linki tıklandı |
| `creative_email_click` / `music_email_click` | E-posta linki tıklandı |
| `creative_whatsapp_click` / `music_whatsapp_click` | Gelecekte eklenecek gerçek WhatsApp linki tıklandı |
| `creative_generate_lead` / `music_generate_lead` | Yalnızca sunucu başarılı sonuç verdiğinde çağrılır |

`intent`: `contact`, `quote_request`, `space_inquiry`, `rehearsal_inquiry`, `recording_inquiry`, `production_inquiry`, `lesson_inquiry`. Hizmet sayfası ve CTA bağlamından ayrılır. Telefon/e-posta tıklaması tamamlanmış rezervasyon değildir. Query string, telefon, e-posta ve form içeriği özel event parametrelerine gönderilmez.

Kaynakta çalışan form altyapısı, online rezervasyon sistemi veya WhatsApp bağlantısı yoktu. Bunlar varmış gibi sahte başarı olayı eklenmedi. İleride form/rezervasyon bağlanınca **yalnızca backend başarı yanıtından sonra**:

```js
window.PASMeasurement.leadSuccess('rehearsal_inquiry');
// Creative örneği: leadSuccess('space_inquiry')
// Ders örneği: leadSuccess('lesson_inquiry')
```

Ads dönüşüm aksiyonları hesaplarda oluşturulduktan sonra `adsConversions` içine event adı → gerçek label yazın. Örnek şekil: `{ creative_generate_lead: 'GERCEK_LABEL' }`. GA4'te amaçlanan olayları key event olarak işaretleyin; intent bazında ayrı sonuç istiyorsanız koşullu event tanımlayın. Meta özel olaylarını ilgili Dataset'te doğrulayıp custom conversion eşleyin.

Google/Meta hesapları oluşturulmadı veya bağlanmadı. Gerçek ID, izin entegrasyonu ve sağlayıcı testleri olmadan ölçüm canlı kabul edilmemeli.

## Google Business ve Search Console teslim adımları

- Creative profil website URL: https://pascreativestudio.com/creative/
- Music profil website URL: https://pascreativestudio.com/music/
- Creative Space hizmet bağlantısı: https://pascreativestudio.com/creative/creative-space/
- Music prova hizmet bağlantısı: https://pascreativestudio.com/music/prova-studyosu/
- Mevcut telefon/adres/e-posta bilgileri kaynaktan korundu; yayın öncesi işletmelerle teyit edin.
- GBP profil URL'leri, çalışma saatleri, koordinatlar, yorum puanları ve ders enstrümanları uydurulmadı. Gerçek profil bağlantıları geldiğinde ilgili entity sameAs alanına eklenebilir.
- İki Google işletme profili üzerinde değişiklik yapılmadı. Gerçek işletme uygunluğu ve profil doğrulaması Google tarafında ayrıca değerlendirilir; schema tek başına bu onayı sağlamaz.
- Search Console'da domain doğrulayın, sitemap.xml gönderin; öncelikle Creative Space, prova ve kayıt sayfalarında canlı URL inceleme yapın. Indexlenme ve sıralama sonuçları yayın sonrası ölçülür.
- Canlı sunucuda canonical alan adı, HTTPS, 301/404 yanıtları ve robots erişimini kontrol edin.
- Gerçek Core Web Vitals saha ölçümü yapılmadı. Hosting, gerçek font yüklemesi ve trafik altında PageSpeed Insights / Search Console verileri ayrıca izlenmeli.

## Yapılan doğrulamalar

- 13 indexlenebilir URL + 404 için HTML, yerel linkler, fragmentler, görseller ve JSON-LD sözdizimi kontrolü; eksik yerel hedef bulunmadı.
- 1440 px masaüstü ve 390 px mobilde giriş, Creative, Music, altı hizmet/arşiv sayfası ve Promptlar ana sayfası: JavaScript hatası ve yatay sayfa taşması yok.
- Giriş, Creative ve Music hero/header yerleşim boyutları, font ve renk değerleri iki genişlikte orijinalle karşılaştırıldı; eşleşti. Yeni sayfalardan ekran görüntüleri görsel olarak incelendi.
- Creative kapısı, masaüstü/mobil Creative Space menüsü ve eski #creative-space geçişi çalıştı.
- JavaScript kapalıyken ana branch ve hizmet içerikleri göründü; Creative hizmet listesi kaynak HTML'de mevcut.
- Takip kodu izole testinde Creative olayı Music mülküne / Pixel'ine gönderilmedi; tersi de kontrol edildi. İzin verilmeden script yüklenmedi; iptalden sonra özel lead olayı üretilmedi. Gerçek sağlayıcı hesaplarına test verisi gönderilmedi.

Teknik referanslar:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/tag-platform/gtagjs/routing
