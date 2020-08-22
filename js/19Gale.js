/*
 * Copyright (c) 2016- 2018 19Labs Inc.
 * All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */


var NineteenGale = {

hex:  function hex(buffer) {
        var hexCodes = [];
        var view = new DataView(buffer);
        for (var i = 0; i < view.byteLength; i += 4) {
          var value = view.getUint32(i)
          var stringValue = value.toString(16)
           var padding = '00000000'
          var paddedValue = (padding + stringValue).slice(-padding.length)
          hexCodes.push(paddedValue);
        }
        return hexCodes.join("");
      },

sha256: function sha256(str) {
    var buffer = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
		   return NineteenGale.hex(hash);
    });
  },
  


GALE_APIKEY: "notset",

setApiKey: function setApiKey(key){
    GALE_APIKEY=key;
},

stopVideo: function(){

},

getCurrentUser: function getCurrentUser(callback) {
    if (this.GALE_APIKEY.indexOf("notset")<0){
    var nonce = Math.random().toString(36).substring(7);
    this.sha256(nonce + GALE_APIKEY).then(function(hash) {
        console.log("HASH:"+hash+" APIKEY"+GALE_APIKEY);
        if (typeof NineteenGaleAPI != 'undefined') {
            callback(JSON.parse(NineteenGaleAPI.getCurrentUser(nonce,hash)));
        }
        else {
            islogin=false;
            return callback({ "islogin": false });
        }
      });
    } else {
        callback(JSON.parse(NineteenGaleAPI.getCurrentUser()));
    }
},

getCurrentLanguage: function getCurrentLanguage(){
    console.log("get current language ");
    if (typeof NineteenGaleAPI != 'undefined') {
        console.log("calling getCurrentLanguage");
        var language = NineteenGaleAPI.getCurrentLanguage();
        console.log("application lanaguage is "+language);
        return language;
    } else {
        return navigator.language;
    }
},


showLogin: function showLogin() {
    if (typeof NineteenGaleAPI != "undefined") {
        NineteenGaleAPI.showLogin();
    }
},

showSignup: function showSignup() {
    if (typeof NineteenGaleAPI != "undefined") {
        NineteenGaleAPI.showSignup();
    }
},



showCallCenter: function showCallCenter() {
    if (typeof NineteenGaleAPI != "undefined") {
        NineteenGaleAPI.showCallCenter();
    }
},
showClinic: function showClinic(name) {
    if (typeof NineteenGaleAPI != "undefined") {
        NineteenGaleAPI.showClinic(name);
    }
},
showWellness: function showWellness() {
    if (typeof NineteenGaleAPI != "undefined") {
        NineteenGaleAPI.showWellness();
    }
},
showSensors: function showSensors() {
    if (typeof NineteenGaleAPI != "undefined") {
        NineteenGaleAPI.showSensors();
    }
},

onSensorData: function(){

},
onLanguageChanged: function(){

},

setOnLanguageChanged: function setOnLanguageChanged(callback){
    this.onLanguageChanged = callback;
},
onLoginChanged: function(){

},

getSensorData: function getSensorData(callback) {  
    var nonce = Math.random().toString(36).substring(7);
    this.sha256(nonce + GALE_APIKEY).then(function(hash) {
        if (typeof NineteenGaleAPI != "undefined") {
            callback(JSON.parse(NineteenGaleAPI.getCurrentData(nonce,hash)));
        } else {
            callback();
        }
        return;      
      });
},

showSensor: function showSensor(sensor) {  
    var nonce = Math.random().toString(36).substring(7);
    this.sha256(nonce + GALE_APIKEY).then(function(hash) {
        if (typeof NineteenGaleAPI != "undefined") {
            NineteenGaleAPI.showSensor(nonce,hash,sensor);
        }
        return;      
      });
},
showSummary: function showSummary() {  
    console.log("show summary");
    var nonce = Math.random().toString(36).substring(7);
    this.sha256(nonce + GALE_APIKEY).then(function(hash) {
        if (typeof NineteenGaleAPI != "undefined") {
            NineteenGaleAPI.showSummary(nonce,hash);
        }
        return;      
      });
}

}


