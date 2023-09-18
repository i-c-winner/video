function startLocalStream(params: {
  video: boolean|MediaTrackConstraints,
  audio: boolean|MediaTrackConstraints
}) {
  return new Promise<MediaStream>((resolve, reject) => {
    resolve(navigator.mediaDevices.getUserMedia({ video: params.video, audio: params.audio }))
  })
}

export { startLocalStream }
