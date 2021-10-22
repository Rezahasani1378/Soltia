import React, { useEffect } from 'react';

const useServiceWorker = () => {
  let swRegistration;
  let soltiaServiceWorker: ServiceWorker | null;

  async function initServiceWorker() {
    swRegistration =
      navigator &&
      (await navigator?.serviceWorker.register('/SW.js', {
        updateViaCache: 'none',
      }));

    soltiaServiceWorker =
      swRegistration.installing ||
      swRegistration.waiting ||
      swRegistration.active;
    sendStatusUpdate(soltiaServiceWorker);

    // listen for new service worker to take over
    if (navigator) {
      navigator?.serviceWorker.addEventListener(
        'controllerchange',
        async function onController() {
          soltiaServiceWorker = navigator?.serviceWorker.controller;
          sendStatusUpdate(soltiaServiceWorker);
        },
      );

      navigator?.serviceWorker.addEventListener('message', onSWMessage, false);
    }
  }

  function onSWMessage(evt: { ports?: any; data?: any }) {
    let { data } = evt;
    if (data.statusUpdateRequest) {
      console.log('Status update requested from service worker, responding...');
      sendStatusUpdate(evt.ports && evt.ports[0]);
    } else if (data == 'force-logout') {
      sendStatusUpdate();
    }
  }

  function sendStatusUpdate(target?: ServiceWorker | null | undefined) {
    sendSWMessage(
      { statusUpdate: { isOnline: navigator && navigator.onLine } },
      target,
    );
  }

  function sendSWMessage(
    msg: { statusUpdate: { isOnline: boolean } },
    target: ServiceWorker | null | undefined,
  ) {
    if (target) {
      target.postMessage(msg);
    } else if (soltiaServiceWorker) {
      soltiaServiceWorker.postMessage(msg);
    } else if (navigator && navigator?.serviceWorker.controller) {
      navigator?.serviceWorker.controller.postMessage(msg);
    }
  }

  useEffect(() => {
    if (navigator && 'serviceWorker' in navigator)
      initServiceWorker().catch(console.error);
  }, []);
}

export default useServiceWorker;
