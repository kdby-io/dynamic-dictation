import { createAudioMeter } from '../utils/volumeMeter'

export const connectMediaStreamToMeter = () => {
  if (window) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    if (!audioCtx) {
      alert('Audio API not supported.')
      return
    }
    if (!navigator.mediaDevices.getUserMedia) {
      alert('User Media API not supported.')
      return
    }

    const meter = createAudioMeter(audioCtx)
    const constraint = { video: false, audio: true }
    navigator.mediaDevices.getUserMedia(constraint).then(stream => {
      const source = audioCtx.createMediaStreamSource(stream)
      source.connect(meter)
    }).catch(e => {
      throw e
      alert('Error: ' + e)
      return
    })

    return meter
  }
}