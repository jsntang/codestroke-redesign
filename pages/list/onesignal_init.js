var OneSignal = window.OneSignal || [];
OneSignal.push(function() {
  console.log('onesignal is initialised');
  OneSignal.init({
    appId: "7e8e43b8-5253-41e3-8975-057dd60e2b1f",
    autoRegister: true,
    notifyButton: {
      enable: false,
    },
    notificationClickHandlerMatch: 'origin',
    notificationClickHandlerAction: 'focus',

  });
});

if (OneSignal.installServiceWorker) {
  OneSignal.installServiceWorker();
} else {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/OneSignalSDKWorker.js?appId=a704a88e-9e37-41f6-99b8-6ded41926c03');
  }
}
