const fs = require('fs');
const { desktopCapturer, ipcRenderer } = require('electron');
let recorder, blobs = [];

document.getElementById('record').addEventListener("click", function () { startRecord(); });
document.getElementById('stop').addEventListener("click", function () { stopRecord('./videos/test.mp4'); });

function startRecord() {
    desktopCapturer.getSources({ types: ['window', 'screen'] })
        .then(async () => {
            const stream = await navigator.webkitGetUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        minWidth: 1280,
                        maxWidth: 1280,
                        minHeight: 720,
                        maxHeight: 720
                    }
                },
                frameRate: {
                    min: 50,
                    ideal: 200,
                    max: 600
                }
            }, this.handleStream, err => {
                console.log('error', err);
            });
        })
        .catch(error => console.log(error))
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
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const arrayBuffer = this.result;
        cb(arrayBuffer);
    };
    fileReader.readAsArrayBuffer(blob);
}

function toBuffer(ab) {
    const buffer = new Buffer.alloc(ab.byteLength);
    const arr = new Uint8Array(ab);
    for (let i = 0; i < arr.byteLength; i++) {
        buffer[i] = arr[i];
    }
    return buffer;
}

function stopRecord(userPath) {
    recorder.onstop = () => {
        this.toArrayBuffer(new Blob(blobs, { type: 'video/mp4' }), (chunk) => {
            const buffer = this.toBuffer(chunk);
            const path = userPath;
            fs.writeFile(path, buffer, function (err) {
                if (!err) {
                    console.log('Saved video: ' + path);
                } else {
                    alert('Failed to save video ' + err);
                }
            });
        });
    };
    recorder.stop();
}
