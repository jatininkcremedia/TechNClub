(function () {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' == document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') +
    '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

googletag.cmd.push(function () {
  googletag.pubads().disableInitialLoad();
});
var currentPageSlots = [];
var REFRESH_KEY = "refresh";
var REFRESH_VALUE = "true";
var SECONDS_TO_WAIT_AFTER_VIEWABILITY = Math.floor(Math.random() * (35 - 30 + 1)) + 30;
googletag.cmd.push(function () {
  googletag.pubads().addEventListener("impressionViewable", function (event) {
    var slot = event.slot;
    var slotId = event.slot.getSlotId().getName();
    if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
      setTimeout(function () {
        refreshBid(slot, slotId);
      }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
    }
  });
});

function refreshBid(slot, slotId) {
  pbjs.que.push(function () {
    pbjs.requestBids({
      timeout: PREBID_TIMEOUT,
      adUnitCodes: [slotId],
      bidsBackHandler: function () {
        pbjs.setTargetingForGPTAsync([slotId]);
        googletag.pubads().refresh([slot]);
      }
    });
  });
}


function getDeviceType() {
  try {
    var ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  } catch (e) {
    console.log("getDeviceType:" + e);
  }
}


var PREBID_TIMEOUT = 1500;
var FAILSAFE_TIMEOUT = 2000;

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

function initAdserver() {
  if (pbjs.initAdserverSet) return;

  googletag.cmd.push(function () {
    pbjs.que.push(function () {
      pbjs.setTargetingForGPTAsync();
      googletag.pubads().refresh(currentPageSlots);
    });
  });
  pbjs.initAdserverSet = true;
}

function prebid() {
  try {
    var prebidAdUnits = [];
    var allAds = document.querySelectorAll("div[data-adslot]");
    if (allAds.length > 0) {
      allAds.forEach(function (ele) {
        var adSlot = ele.getAttribute('data-adslot');
        //var adSize = JSON.parse(ele.getAttribute('data-size'));
        let r = (Math.random() + 1).toString(36).substring(7);
        ele.setAttribute('id', r);
        if (getDeviceType() == "desktop") {
          adSize = JSON.parse(ele.getAttribute('data-size'));
        }
        if (getDeviceType() == "mobile") {
          adSize = JSON.parse(ele.getAttribute('data-size-mobile'));
        }
        var objPrebid = { //prebid
          code: adSlot,
          mediaTypes: {
            banner: {
              sizes: adSize
            }
          },
          bids: [{
            bidder: 'appnexus',
            params: {
              placementId: 13144370
            }
          }]
        };
        prebidAdUnits.push(objPrebid); //prebid
      });

      pbjs.que.push(function () {
        pbjs.addAdUnits(prebidAdUnits);
        pbjs.requestBids({
          timeout: PREBID_TIMEOUT,
          bidsBackHandler: function (bidResponses) {
            initAdserver();
          }
        });
      });
      setTimeout(initAdserver, FAILSAFE_TIMEOUT);
    }
  } catch (e) {
    console.log("prebid:" + e);
  }

}


function constructAds() {
  try {
    var allAds = document.querySelectorAll("div[data-adslot]");
    if (allAds.length > 0) {
      allAds.forEach(function (ele) {
        var adSlot = ele.getAttribute('data-adslot');
        var adSize = JSON.parse(ele.getAttribute('data-size'));
        var refresh = ele.getAttribute('data-ad-refresh');
        if (getDeviceType() == "desktop") {
          adSize = JSON.parse(ele.getAttribute('data-size'));
        }
        if (getDeviceType() == "mobile") {
          adSize = JSON.parse(ele.getAttribute('data-size-mobile'));
        }

        var divId = ele.getAttribute('id');
        if (typeof googletag != 'undefined') {
          googletag.cmd.push(function () {
            var slot = googletag.defineSlot(adSlot, adSize, divId);
            currentPageSlots && currentPageSlots.push(slot);


            if (refresh === 'true') {

              slot.setTargeting(REFRESH_KEY, REFRESH_VALUE);
            }

            slot.addService(googletag.pubads());
            googletag.enableServices();
          });
        }

      });
    }
  } catch (e) {
    console.log("constructAd:" + e);
  }
}


async function displayAds() {
  try {
    await prebid();

    await constructAds();
    var allAds = document.querySelectorAll("div[data-adslot]");
    if (allAds.length > 0) {
      allAds.forEach(function (ele) {
        var adSlot = ele.getAttribute('data-adslot');
        var divId = ele.getAttribute('id');
        if (typeof googletag != 'undefined') {
          googletag.cmd.push(function () {
            googletag.display(divId);
          });
          ele.removeAttribute('data-adslot');
        }

      });

    }
  } catch (e) {
    console.log("displayAds:" + e);
  }
}

window.addEventListener('DOMContentLoaded', function () {
  displayAds();
});

function fetchNewArticle() {
  try {
    fetch('2nd_page.html')
      .then(response => {
        return response.text();
      })
      .then((html) => {
        document.body.insertAdjacentHTML('beforeend', html);
      })
      .then(function () {
        window.currentPageSlots = [];
        pbjs.initAdserverSet = false;
        displayAds();
      });
  } catch (e) {
    console.log("fetchNewArticle:" + e);
  }
}

var firstExcution = 1;
window.onscroll = function (ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    // you are at the bottom of the page
    if (firstExcution == 1) {
      setTimeout(() => {
        fetchNewArticle();
      }, 2000);
      firstExcution++;
    }
  }
};

// Here Start The Google Analytics

(function (i, r) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
})(window, 'ga');
ga('create', 'UA-197881310-1', 'auto');
ga('send', 'pageview');

document.addEventListener('scroll', function () {

  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';

  var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;

  //document.getElementById('scroll').textContent = 'scrolled: ' + percent.toFixed(0) + '%';
  sessionStorage.setItem("Percentage_Scroll", percent.toFixed(0) + '%');
});

window.addEventListener('beforeunload', function () {
  var percentage_Scrolled = sessionStorage.getItem('Percentage_Scroll');
  ga('send', 'event', 'Page_Scrolled', percentage_Scrolled);
});

function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}
