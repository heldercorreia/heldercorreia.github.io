/*
 * Copyright (c) 2018 19Labs Inc.. All rights reserved. 
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. 
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution. 
 * 
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// set the api key, if this is not set then no PII will be forwarded
function setApiKey() {
    NineteenGale.setApiKey("229917BE7C3E9B2E88CD01627E2448B8C15572AC8B2C8452AAB8000F9DC92D09");
}

// set the receiver for login changed events
function onLoginChanged() {
    console.log("login changed")
    // getCurrent user information and pass to callback for display
    NineteenGale.getCurrentUser(showUser);
}
NineteenGale.onLoginChanged = onLoginChanged;

// set the receive for language changed events
function onLanguageChanged() {
    console.log("languaged changed")

    var language = NineteenGale.getCurrentLanguage();
    console.log("current href " + location.href);
    console.log("language " + language);


    if (language.indexOf("es") >= 0) {
        console.log("Check spanish href " + location.href);
        if (window.location.href.indexOf("/es/") < 0) {
            var search = '/';
            if (window.location.href.indexOf("/en/") >=0){
                search= '/en/'
            }
            var newloc = window.location.href.substr(0, window.location.href.lastIndexOf(search)) + "/es" + window.location.href.substr(window.location.href.lastIndexOf('/'));
            console.log("switch to " + newloc);
            window.location.href = (newloc);
        }
    } else {
        console.log("Check english " + window.location.href);
        if (window.location.href.indexOf("/en/") < 0) {
            var search = '/';
            if (window.location.href.indexOf("/es/") >=0){
                search= '/es/'
            }
            var newloc = window.location.href.substr(0, window.location.href.lastIndexOf(search)) + "/en" + window.location.href.substr(window.location.href.lastIndexOf('/'));
            console.log("switch to " + newloc);
            window.location.href = (newloc);
        }
    }
    var langel = document.getElementById("lang");
    console.log("lanaguage is " + language);
    if ((typeof langel !== 'undefined')&&(langel != null)) {
        if (language.indexOf("es") >= 0) {
            langel.innerText = "Espanol"
        } else {
            langel.innerText = "English"
        }
    }
}
NineteenGale.setOnLanguageChanged(onLanguageChanged);

var language = NineteenGale.getCurrentLanguage();
var measure = "Measure Now";
var share = "Shared"
var access = "Instant access to the care you need"
var wellcom = "Welcome "
if (language.indexOf("es") >= 0) {
    measure = "Mida ahora"
    shared = "Compartido"
    access = "Acceso instantáneo a la atención que necesita"
    wellcom="Bienvenido "
}

// set the reciever for sensor data events
function onSensorData() {
    // retreive the sensore data and pass to the callback
    NineteenGale.getSensorData(showSensor);
}
NineteenGale.onSensorData = onSensorData;

function showSensor(data) {
    console.log(JSON.stringify(data));
    

    var bpv = data["bloodpressure"];
    var uploadv = data["healthrecord"];
    var scalev = data["weight_scale"];

   


    console.log("health " + JSON.stringify(uploadv));
    console.log("bpa " + JSON.stringify(bpv));
    console.log("scale " + JSON.stringify(scalev));


    var bpel = document.getElementById("bpmeasurment");
    var bpcheck = document.getElementById("bpcheck");
    if (typeof bpv != 'undefined') {
        var bp = bpv.slice(-1)[0];
        bpel.innerText = bp.highpressure + "/" + bp.lowpressure + "/" + bp.heartrate;
        bpcheck.style.display = 'inline-block';
    } else {

        bpel.innerText = measure;
        bpcheck.style.display = 'none';
    }
    var scaleel = document.getElementById("scalemeasurment");
    var scalecheck = document.getElementById("scalecheck");

    if (typeof scalev != 'undefined') {
        var scale = scalev.slice(-1)[0];
        console.log("scale=" + JSON.stringify(scale));
        scaleel.innerText = (scale.weight * 2.20462).toFixed(2) + " lbs";
        scalecheck.style.display = 'inline-block';
    } else {
        scaleel.innerText = measure;
        scalecheck.style.display = 'none';
    }

    var uploadel = document.getElementById("uploaded");
    var uploadcheck = document.getElementById("uploadedcheck");
    uploadel.innerText = "";
    uploadcheck.style.display = 'none';
    if (typeof uploadv != 'undefined') {
        if (uploadv) {
            uploadel.innerText = shared;
            uploadcheck.style.display = 'inline-block';
        }
    }


}
function showUser(user) {
    console.log(JSON.stringify(user));
    
    var userel = document.getElementById("user");
    console.log(" is user logged in " + user.islogin);
    if ((typeof userel != 'undefined') && (userel != null)) {
        if (user.islogin) {
            userel.innerText = wellcom + user.firstName + " " + user.lastName;
        } else {
            userel.innerText = access

        }
    }
}

function showWellness() {
    NineteenGale.showWellness();
}

function showSensors() {
    NineteenGale.showSensors();
}

function showWellness() {
    NineteenGale.showWellness();
}

function showLogin(){
    NineteenGale.showLogin();
}

function showCallCenter(){
    NineteenGale.showCallCenter();
}

function showClinic(name){
    NineteenGale.showClinic(name);
}

function stopVideo(){
    
}



