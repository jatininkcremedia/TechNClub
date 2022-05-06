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
var REFRESH_KEY = "refresh";
var REFRESH_VALUE = "true";
var SECONDS_TO_WAIT_AFTER_VIEWABILITY = Math.floor(Math.random() * (35 - 30 + 1)) + 30;
googletag.cmd.push(function () {
  googletag.pubads().addEventListener("impressionViewable", function (event) {
    var slot = event.slot;
    var slotId = event.slot.getSlotId().getName();
    console.log(slot);
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
var desktopSizes = [[970, 90], [728, 90], [300, 250]];
var phoneSizes = [[300, 250], [300, 100]];
var tabletSizes = [[728, 90], [300, 250]];
var allSizes = [[1000, 300], [970, 90], [728, 90], [300, 250]];

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

function initAdserver() {
  if (pbjs.initAdserverSet) return;

  googletag.cmd.push(function () {
    pbjs.que.push(function () {
      pbjs.setTargetingForGPTAsync();
      googletag.pubads().refresh();
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
    //prebid();


    /*var pbjs = pbjs || {};
     pbjs.que = pbjs.que || [];

     pbjs.que.push(function() {
         pbjs.addAdUnits(prebidAdUnits);
         pbjs.requestBids({
             bidsBackHandler: initAdserver,
             timeout: PREBID_TIMEOUT
         });
     });


     // in case PBJS doesn't load
     setTimeout(function() {
         initAdserver();
     }, FAILSAFE_TIMEOUT);*/


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


            if (refresh === 'true') {

              slot.setTargeting(REFRESH_KEY, REFRESH_VALUE);
            }

            slot.addService(googletag.pubads());
            //googletag.defineSlot(adSlot, adSize, divId).addService(googletag.pubads());
            //googletag.pubads().enableSingleRequest();
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
  //setTimeout(function(){sendPreBidCall();},1000);
});

function fetchNewArticle() {
  try {
    fetch('2nd_page.html')
      .then(response => {
        return response.text();
      })
      .then((html) => {
        document.body.insertAdjacentHTML('beforeend', html);
        //document.getElementById('loading').style.display = 'none';
      })
      .then(function () {
        pbjs.initAdserverSet = false;
        displayAds();
        //prebid();
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
