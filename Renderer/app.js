var fs = require('fs');
const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window')

var { desktopCapturer } = require('electron');
var recorder, blobs = [];

document.getElementById('record').addEventListener("click", function(){startRecord();});
document.getElementById('stop').addEventListener("click", function(){stopRecording();});

var startRecord = function () {
    console.log('started');
    desktopCapturer.getSources({types: ['window', 'screen']}, function(error) {
        if (error) throw error;
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop'
                },
            },
            frameRate: {
                min: 145,
                max: 500
            }
        })
        .then((stream) => handleStream(stream))
        .catch((e) => handleError(e))
        return
    });
};

function handleError(err) {
    console.log('something went wrong but it shouldnt');
}

function handleStream(stream) {
    recorder = new MediaRecorder(stream);
    blobs = [];
    recorder.ondataavailable = function (event) {
        blobs.push(event.data);
    };
    recorder.start();
}

function toArrayBuffer(blob, cb) {
    var fileReader = new FileReader();
    fileReader.onload = function() {
        var arrayBuffer = this.result;
        cb(arrayBuffer);
    };
    fileReader.readAsArrayBuffer(blob);
}

function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var arr = new Uint8Array(ab);
    for (var i = 0; i < arr.byteLength; i++) {
        buffer[i] = arr[i];
    }
    return buffer;
}

function stopRecording() {
    var save = function() {
        console.log(blobs);
        toArrayBuffer(new Blob(blobs, {type: 'video/webm'}), function(ab) {
            console.log(ab);
            var buffer = toBuffer(ab);
            var file = `./videos/example.webm`;
            fs.writeFile(file, buffer, function(err) {
                if (err) {
                    console.error('Failed to save video ' + err);
                } else {
                    console.log('Saved video: ' + file);
                }
            });
        });
    };
    recorder.stop();
}
