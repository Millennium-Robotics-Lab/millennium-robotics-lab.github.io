(function () {
  'use strict';

  function isMobileDevice(device) {
    return device.userAgentData?.mobile === true ||
      /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(device.userAgent || '') ||
      (device.platform === 'MacIntel' && device.maxTouchPoints > 1);
  }

  function destination(page, mobile) {
    if (page === 'original' && !mobile) return 'clubroom/';
    if (page === 'clubroom' && mobile) return '../';
    return null;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isMobileDevice, destination };
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const page = document.currentScript?.dataset.page;
    const path = destination(page, isMobileDevice(window.navigator));
    if (!path) return;
    const target = new URL(path, window.location.href);
    target.search = window.location.search;
    target.hash = window.location.hash;
    window.location.replace(target.href);
  }
})();
