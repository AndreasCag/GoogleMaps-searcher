
var htmlWorker = require('./htmlWorker');
var geolocationWorker;
var mainMap;
window.mainModule = {
    initMap() {
        let flexSpinnerContainer = document.getElementById('flexSpinnerContainer');
        htmlWorker.removeEl(flexSpinnerContainer);

        let map = require('./mapWorker').initialize();
        var socket = require('./socket')(map);
        require('./vueWorker')(map);
        geolocationWorker = require('./geolocationWorker')(map, socket);
        geolocationWorker.watchGeolocation();
        mainMap = map;
    },
    get mainMap() {
        return mainMap;
    }
};