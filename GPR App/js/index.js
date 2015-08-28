var everlive = new Everlive({
    apiKey: 'JiHugAPcEgftCWfK',
    scheme: 'http' // switch this to 'https' if you'd like to use TLS/SSL encryption and if it is included in your subscription tier
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
                var devicePushSettings = {
            iOS: {
                badge: 'true',
                sound: 'true',
                alert: 'true'
            },
            android: {
                projectNumber: 'api-project-214937294494'
            },
            wp8: {
                channelName: 'EverlivePushChannel'
            },
            notificationCallbackIOS: onPushNotificationReceived,
            notificationCallbackAndroid: onPushNotificationReceived,
            notificationCallbackWP8: onPushNotificationReceived
        };
		everlive.push.register(devicePushSettings, function() {
            alert("Successful registration in Backend Services. You are ready to receive push notifications.");
        }, function(err) {
            alert("Error: " + err.message);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function onPushNotificationReceived(e) {
    alert(JSON.stringify(e));
};
