!(function (a9, a, p, s, t, A, g) {
  if (a[a9]) return;

  function q(c, r) {
    a[a9]._Q.push([c, r]);
  }

  a[a9] = {
    init: function () {
      q("i", arguments);
    },
    fetchBids: function () {
      q("f", arguments);
    },
    setDisplayBids: function () {
    },
    targetingKeys: function () {
      return [];
    },
    _Q: [],
  };
  A = p.createElement(s);
  A.async = !0;
  A.src = t;
  g = p.getElementsByTagName(s)[0];
  g.parentNode.insertBefore(A, g);
})("apstag", window, document, "script", "//c.amazon-adsystem.com/aax2/apstag.js");
apstag.init({
  pubID: "ac0d98fe-1a9c-4701-aede-efc3ec6932fa",
  adServer: "googletag",
  simplerGPT: true,
});
window.googletag = window.googletag || {
  cmd: []
};
var slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9, slot10, slot11, slot12, slot13, slot14, slot15,
  slot16, slot17, slot18, slot19, slot20, slot21;
googletag.cmd.push(function () {
  var Responsive_Ad = googletag.sizeMapping().addSize([992, 0], [
      [728, 90]
    ]).addSize([768, 0], [
      [300, 250]
    ]).addSize([320, 0], [
      [300, 250]
    ]).addSize([0, 0], [
      [320, 50],
      [1, 1],
    ]).build(),
    Bottom_Overlay = googletag.sizeMapping().addSize([992, 0], [
      [728, 90]
    ]).addSize([768, 0], [
      [320, 50]
    ]).addSize([320, 0], [
      [320, 50]
    ]).addSize([0, 0], [
      [320, 50],
      [1, 1],
    ]).build(),
    Leaderboard_ad = googletag.sizeMapping().addSize([992, 0], [
      [728, 90]
    ]).addSize([768, 0], [
      [320, 50]
    ]).addSize([320, 0], [
      [320, 50]
    ]).addSize([0, 0], [
      [320, 50],
      [1, 1],
    ]).build(),
    hp_Leaderboard_ad = googletag.sizeMapping().addSize([992, 0], [
      [728, 90]
    ]).addSize([768, 0], [
      [320, 50]
    ]).addSize([320, 0], [
      [320, 50]
    ]).addSize([0, 0], [
      [320, 50],
      [1, 1],
    ]).build(),
    mtf_A_ads = googletag.sizeMapping().addSize([992, 0], [
      [300, 250]
    ]).addSize([768, 0], [
      [320, 50]
    ]).addSize([320, 0], [
      [320, 50]
    ]).addSize([0, 0], [
      [320, 50],
      [1, 1],
    ]).build();
  slot1 = googletag.defineSlot("/21742552194/NueGamers/MTF_2", [
    [300, 250],
    [728, 90],
  ], "div-gpt-ad-hp-Leaderboard").defineSizeMapping(hp_Leaderboard_ad).addService(googletag.pubads());
  slot2 = googletag.defineSlot("/21742552194/NueGamers/MTF_1", [
    [300, 250],
    [728, 90],
  ], "div-gpt-ad-Leaderboard").defineSizeMapping(Leaderboard_ad).addService(googletag.pubads());
  slot3 = googletag.defineSlot("/21742552194/NueGamers/MTF_3", [300, 250], "div-gpt-ad-ATF_1").addService(googletag.pubads());
  slot4 = googletag.defineSlot("/21742552194/NueGamers/MTF_4", [300, 250], "div-gpt-ad-ATF_1_A").defineSizeMapping(mtf_A_ads).addService(googletag.pubads());
  slot5 = googletag.defineSlot("/21742552194/NueGamers/MTF_5", [300, 250], "div-gpt-ad-MTF_1").addService(googletag.pubads());
  slot6 = googletag.defineSlot("/21742552194/NueGamers/leaderboard", [300, 250], "div-gpt-ad-MTF_1_A").defineSizeMapping(mtf_A_ads).addService(googletag.pubads());
  slot7 = googletag.defineSlot("/21742552194/NueGamers/MTF_2", [300, 250], "div-gpt-ad-MTF_2").addService(googletag.pubads());
  slot8 = googletag.defineSlot("/21742552194/NueGamers/MTF_1", [300, 250], "div-gpt-ad-MTF_2_A").defineSizeMapping(mtf_A_ads).addService(googletag.pubads());
  slot8 = googletag.defineSlot("/21742552194/NueGamers/MTF_2", [300, 250], "div-gpt-ad-MTF_3").addService(googletag.pubads());

  slot19 = googletag.defineSlot("/1019715/Zodiacsigns-horoscope.com/ZSH_videoads_1", [1, 1], "div-gpt-ad-1626345283854-0").addService(googletag.pubads());
  var SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
  googletag.pubads().disableInitialLoad();
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
  googletag.display("div-gpt-ad-LSB_Sticky");
  googletag.display("div-gpt-ad-BO");
});
googletag.cmd.push(function () {
  apstag.fetchBids({
    timeout: 1000
  }, function (bids) {
    apstag.setDisplayBids();
    googletag.pubads().refresh();
  });
});
