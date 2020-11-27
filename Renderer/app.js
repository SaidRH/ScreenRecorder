const { desktopCapturer } = require('electron')

document.getElementById('record').addEventListener("click", function(){ console.log("record")});
document.getElementById('stop').addEventListener("click", function(){ console.log("stop")});
const constraints = {
  audio: {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  },
  video: {
    mandatory: {
      chromeMediaSource: 'desktop',
      minWidth: 400,
      maxWidth: 400,
      minHeight: 400,
      maxHeight: 400
    }
  }
}
desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  for (const source of sources) {
    if (source.name === 'Screen Recorder') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        handleStream(stream)
      } catch (e) {
        handleError(e)
      }
      return
    }
  }
})

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}