  var PACKAGES = [
    {id:"starter",tab:"Başlangıç",title:"Başlangıç Paketi",tag:"İçerik üretmek için ihtiyacınız olan her şey.",
     desc:"Reels, sosyal medya, YouTube, kişisel marka ve küçük ölçekli içerik çekimleri için hazırlanmış temel stüdyo paketi.",
     prices:{2:2500,4:5000,8:8500},
     inc:["25 m² stüdyo alanı","3,5 metre tavan yüksekliği","Beyaz ve siyah fon seçenekleri","Kamera tripodu","Amaran 120c","Amaran Ace 25c","Hollyland Lark Max 2","Hazırlanma odası","Askılık eşek ve kıyafet askılığı","Buharlı ütü","Wi-Fi ve kahve"],
     addons:["sonyCamera","extraLens","lightingAssistant","photographer","videographer","editing","retouch"]},
    {id:"photo",tab:"Fotoğrafçı",title:"Fotoğrafçı Paketi",tag:"Profesyonel ışık, özgür çekim.",
     desc:"Portre, moda, lookbook, ürün, katalog ve reklam fotoğrafçılığı için profesyonel flaş ve ışık şekillendirme altyapısı.",
     prices:{2:4000,4:7500,8:13000},
     inc:["Godox QT600III-M HSS 600W — 1 adet","Godox QT400III-M HSS 400W — 2 adet","Godox XPro II-S Sony uyumlu tetikleyici","Amaran 120c","Amaran Ace 25c","Octa Dome 90 ve 120","Light Box 30x120 ve 60x90","Lantern ve mevcut reflektörler","Mevcut tüm ışık ayakları","Beyaz ve siyah fon sistemi","Hollyland Lark Max 2","iPad Air M4","iMac M6","Hazırlanma odası","Askılık eşek ve buharlı ütü","Wi-Fi ve kahve"],
     addons:["sonyCamera","extraLens","lightingAssistant","photographer","retouch","editing"]},
    {id:"video",tab:"Video",title:"Video Prodüksiyon Paketi",tag:"Fikirden sete, profesyonel prodüksiyon.",
     desc:"Reklam, röportaj, ürün filmi, müzik videosu ve dijital kampanyalar için kapsamlı sürekli ışık ve ses altyapısı.",
     prices:{2:4500,4:8500,8:15000},
     inc:["Amaran 660c RGB","Amaran 360c RGB","Amaran 120c","Amaran Ace 25c","Octa Dome 90 ve 120","Light Box 30x120 ve 60x90","Lantern ve mevcut ışık şekillendiriciler","Mevcut tüm ışık ayakları","Beyaz ve siyah fon sistemi","Hollyland Lark Max 2","iPad Air M4","iMac M6","Hazırlanma odası","Askılık eşek ve buharlı ütü","Wi-Fi ve kahve"],
     addons:["sonyCamera","extraLens","lightingAssistant","videographer","editing","colorGrading"]},
    {id:"full",tab:"Full Paket",title:"Full Prodüksiyon Paketi",tag:"Tek stüdyo, tüm prodüksiyon altyapısı.",
     desc:"Fotoğraf ve video prodüksiyonları için mevcut flaş, sürekli ışık, ses, fon ve dijital çalışma ekipmanlarının birlikte kullanıldığı kapsamlı paket.",
     prices:{2:6500,4:12000,8:21000},
     inc:["Fotoğrafçı paketindeki tüm ekipmanlar","Video prodüksiyon paketindeki tüm ekipmanlar","Godox QT600III-M ve QT400III-M flaşlar","Amaran 660c, 360c, 120c ve Ace 25c","Mevcut tüm ışık şekillendiriciler","Mevcut tüm ışık ayakları","Beyaz ve siyah fonlar","Hollyland Lark Max 2","iPad Air M4 ve iMac M6","Hazırlanma odası","Askılık eşek ve buharlı ütü","Wi-Fi ve kahve"],
     note:"Sony A7 V ve lensler ayrı opsiyon olarak sunulur. Teknik personel ve çekim hizmetleri pakete dahil değildir.",
     addons:["sonyCamera","extraLens","lightingAssistant","photographer","videographer","editing","retouch","colorGrading"]},
    {id:"workshop",tab:"Workshop",title:"Workshop & Etkinlik Alanı",tag:"Bir araya gelmek, öğrenmek ve üretmek için.",
     desc:"Tarihi Beyoğlu mimarisinde workshop, eğitim, toplantı, film gösterimi ve yaratıcı topluluk etkinlikleri için esnek kullanım alanı.",
     prices:{2:3000,4:6000,8:10000},
     inc:["Masa düzeninde 20 kişiye kadar kapasite","Sandalye düzeninde 30 kişiye kadar kapasite","Esnek masa ve sandalye yerleşimi","ViewSonic PX704HD Full HD projeksiyon","Ses sistemi","Sunum bilgisayarı","Wi-Fi","Kahve ve su","Temel etkinlik öncesi yerleşim desteği"],
     addons:["eventAssistant","eventPhotography","eventVideo","editing"]}
  ];

  var ADDONS = {
    sonyCamera:{name:"Sony A7 V + 35 mm Lens",desc:"Stüdyo içi kullanım. Ön onay ve teslim kontrolü gerektirir.",price:5000,type:"fixed"},
    extraLens:{name:"24–70 mm Lens",desc:"Sony A7 V ile birlikte ek lens seçeneği.",price:1500,type:"fixed",requires:["sonyCamera"]},
    lightingAssistant:{name:"Işık Kurulum Asistanı",desc:"Çekim öncesi ışık kurulumu ve set desteği.",prices:{2:900,4:1500,8:3000},type:"tier"},
    photographer:{name:"Profesyonel Fotoğrafçı",desc:"Brief ve çekim kapsamına göre fiyatlandırılır.",type:"quote"},
    videographer:{name:"Profesyonel Videographer",desc:"Çekim planına göre özel teklif hazırlanır.",type:"quote"},
    editing:{name:"Video Kurgu",desc:"Video süresi ve teslim kapsamına göre fiyatlandırılır.",type:"quote"},
    retouch:{name:"Fotoğraf Retouch",desc:"Görsel adedi ve işlem kapsamına göre fiyatlandırılır.",type:"quote"},
    colorGrading:{name:"Renk Düzenleme",desc:"Projenin süresine ve teslim formatına göre fiyatlandırılır.",type:"quote"},
    eventAssistant:{name:"Etkinlik Asistanı",desc:"Etkinlik kapsamına göre fiyatlandırılır.",type:"quote"},
    eventPhotography:{name:"Etkinlik Fotoğraf Çekimi",desc:"Etkinlik kapsamına göre fiyatlandırılır.",type:"quote"},
    eventVideo:{name:"Etkinlik Video Çekimi",desc:"Etkinlik kapsamına göre fiyatlandırılır.",type:"quote"}
  };

window.PAS_PACKAGES=PACKAGES; window.PAS_ADDONS=ADDONS;