const { desktopCapturer } = require('electron')

document.getElementById('record').addEventListener("click", function(){recordVideo();});
document.getElementById('stop').addEventListener("click", function(){stopVideo();});


function recordVideo(){
  const constraints = {
    audio: {
      mandatory: {
        chromeMediaSource: 'desktop'
      }
    },
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        minWidth: 600,
        maxWidth: 600,
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
}
function stopVideo(){
  const constraints = {
    audio: {
      mandatory: {
        chromeMediaSource: 'desktop'
      }
    },
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        minWidth: 600,
        maxWidth: 600,
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
    video.onloadedmetadata = (e) => video.pause()
  }
  
  function handleError (e) {
    console.log(e)
  }
}