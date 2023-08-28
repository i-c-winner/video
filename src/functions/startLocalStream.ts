import * as stream from "stream";

function startLocalStream() {
  return new Promise((resolve: any, reject: any) => {
    resolve(navigator.mediaDevices.getUserMedia({ video: true, audio: true }))
  })
}

export { startLocalStream }
