import { createAudioMeter } from '../utils/volumeMeter'

export const connectMediaStreamToMeter = () => {
  if (window) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const meter = createAudioMeter(audioCtx)
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
      const source = audioCtx.createMediaStreamSource(stream)
      source.connect(meter)
    })

    return meter
  }
}