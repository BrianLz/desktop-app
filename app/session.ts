// import { app, OnBeforeSendHeadersListenerDetails } from 'electron';
// import enhanceWebRequest from 'electron-better-web-request';

// todo(mikael) type correctly the electron-better-web-request public API

// const orderListeners = (listeners: any) => {
//   const orderableOrigins = [
//     'ecx-cors', // warning(hugo) minify all keys
//     'bx-dynamic-user-agent',
//     'ecx-api-handler',
//   ];

//   const orderedListeners = orderableOrigins.reduce(
//     (orderedList: any[], origin: string) => {
//       const listener = listeners.find(
//         (l: any) => l.context.origin && l.context.origin === origin
//       );

//       if (listener) {
//         orderedList.push(listener);

//         return orderedList;
//       }

//       return orderedList;
//     },
//     []
//   );

//   const unorderedListeners = listeners.filter(
//     (l: any) => !orderableOrigins.includes(l.context.origin)
//   );

//   return [...unorderedListeners, ...orderedListeners];
// };

// const webRequestHandler = (listeners: any) => {
//   const sortedListeners = orderListeners(listeners);

//   const response = sortedListeners.reduce(
//     async (accumulator: any, element: any) => {
//       if (accumulator.cancel) {
//         return accumulator;
//       }

//       const result = await element.apply();

//       return { ...accumulator, ...result };
//     },
//     { cancel: false }
//   );

//   return response;
// };

// const callbackMethods = [
//   'onBeforeRequest',
//   'onBeforeSendHeaders',
//   'onHeadersReceived',
// ];

const defaultUserAgent = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  'AppleWebKit/537.36 (KHTML, like Gecko)',
  'Chrome/112.0.0.0',
  'Safari/537.36',
].join(' ');

export const getUserAgentForApp = (url: string, currentUserAgent: string): string => {

  if (url.startsWith('file://') || url.startsWith('http://localhost')) {
    return currentUserAgent;
  }
  else if (url.startsWith('https://accounts.google.com')) {
    return 'Chrome/87.0.4280.141';
  }

  return defaultUserAgent;
};

export const getRefererForApp = (referer: string): string => {
  return referer && referer.startsWith('http://localhost') ? '' : referer;
};
// // @ts-ignore: type
// app.on('session-created', (session: Electron.Session) => {
//   enhanceWebRequest(session);

//   /*
//   for (const callbackMethod of callbackMethods) {
//     // @ts-ignore
//     session.webRequest.setResolver(callbackMethod, webRequestHandler);
//   }
//   */

//   // some webapps have a special behavior when we see we are on Electron
//   // we don't want that so we remove the Electron mention
//   const userAgent = session.getUserAgent();

//   // session.setUserAgent(userAgent.replace(/Electron\/\S*\s/, ''));
//   session.setUserAgent(defaultUserAgent);

//   console.log(`VVVVVV userAgent=${session.getUserAgent()}`);

//   // !! Set User Agent does not affect service workers since
//   // there are outside session context and WhatsApp is not happy
//   // with our custom user agent so we rewrite it on flight,
//   // before send the request
//   const filter = {
//     urls: ['https://web.whatsapp.com/*'],
//   };

//   // @ts-ignore: type
//   session.webRequest.onBeforeSendHeaders(
//     (details: OnBeforeSendHeadersListenerDetails, callback: any) => {
//       const requestHeaders = {
//         ...details.requestHeaders,
//         'User-Agent': getUserAgent(details.url),
//       };
//       callback({ cancel: false, requestHeaders });
//     },
//   );
// });
