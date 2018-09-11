/* test code only

$(document).ready(function(){

    $("#notification-button").on('click', notificationToggle);

    function notificationToggle(e) {
      $("#notification-button").toggleClass("fas far");
    }

})
*/

//iitialise push notification check on windows load
$( window ).bind("load", function() {

//if push notifications are supported initialise UI
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported')

        initializeUI();

    } else {

        console.warn('Push messaging is not supported');
    }

});

function initializeUI() {

/* for later enablement

    OneSignal.push(function() {
        OneSignal.sendTags({
            role: API.login.signoff.signoff_role,
        }).then(function(tagsSent) {
            console.log('tag sent');
        });
    });

*/

    $("#notification-button").click(function() {
        getSubscriptionState().then(function(state) {

//if already subscribed mute Notifications
          if (state.isPushEnabled) {
              OneSignal.push(function() {
                  OneSignal.setSubscription(false);
              });

              $("#notification-button").removeClass().addClass("far fa-bell fa-fw")
              console.log('User is no longer subscribed');
          } else {

//if notifications currently muted, reactivate Notifications
              if (state.isOptedOut) {
                  OneSignal.push(function() {
                      OneSignal.setSubscription(true);
                  });
                  $("#notification-button").removeClass().addClass("fas fa-bell fa-fw")
                  console.log('User is now subscribed');
              } else {

//if neither muted nor enabled, service worker may not have been registered, so register service Worker
                  OneSignal.push(function() {
                    OneSignal.registerForPushNotifications();
                    OneSignal.setSubscription(true);
                  });
                  $("#notification-button").removeClass().addClass("fas fa-bell fa-fw")
                  console.log('User has been registered for push notifications');
              }
          }
      });

      event.preventDefault();
    })

    updateBtn();

// enable later
//    notiflisten();
//    notifdismiss();

}

/* enable later

//Event Listener for notification click

function notiflisten(){
    OneSignal.push(["addListenerForNotificationOpened", function(data) {
      console.log("Received Notification");
      API.putacknowledge(data.data);
      notiflisten();
    }]);
}


//Event if notification is dismissed
function notifdismiss(){
    try{
        OneSignal.on('notificationDismiss', function (event) {
        	console.warn('OneSignal notification dismissed:', event);
            API.putacknowledge(data.data)
         });
    }
    catch{
        console.log("notifdismiss error")
    }
}

*/

//use OneSignal API to check if service worker is Subscribed
function getSubscriptionState() {
    return Promise.all([
      OneSignal.isPushNotificationsEnabled(),
      OneSignal.isOptedOut()
    ]).then(function(result) {
        var isPushEnabled = result[0];
        var isOptedOut = result[1];

        return {
            isPushEnabled: isPushEnabled,
            isOptedOut: isOptedOut
        };
    });
}


function updateBtn() {
  getSubscriptionState().then(function(state) {
      if (state.isPushEnabled) {
          $("#notification-button").removeClass().addClass("fas fa-bell fa-fw")
          console.log('User is currently subscribed');
      } else {
          if (state.isOptedOut) {
              $("#notification-button").removeClass().addClass("far fa-bell fa-fw")
              console.log('User is not currently subscribed');
          } else {
                OneSignal.push(function() {
                    OneSignal.registerForPushNotifications();
                    OneSignal.setSubscription(true);
                });
                console.log('user has been subscribed')
              }
          }

  });

}

function disableBtn(message) {
    console.log("disabled")
    DOM_Push.button.addClass("far fa-bell-slash fa-fw");

}
