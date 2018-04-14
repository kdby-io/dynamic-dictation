import React from 'react'
import { Word } from '../components/Word'
import { createAudioMeter } from '../utils/volumeMeter'
import { getRecognition } from '../utils/recognition'
import { connectMediaStreamToMeter } from '../utils/mediaStream';

class IndexPage extends React.Component {
  state = {
    transcript: null,
    volumes: [],
    logs: [],
  }

  isThereNewWord = (newTranscript) => {
    if (!this.state.transcript) return true
    const oldScriptLength = this.state.transcript.split(' ').length
    const newScriptLength = newTranscript.split(' ').length 
    
    if (oldScriptLength < this.state.volumes.length) return false
    if (oldScriptLength < newScriptLength) return true
  }

  componentDidMount() {
    const meter = connectMediaStreamToMeter()
    // recognition.onspeechstart = () => {
    //   this.setState({ volumes: meter.volume })
    // }

    const recognition = getRecognition(e => {
      const transcript = e.results[0][0].transcript
      const volume = meter.volume

      console.log(transcript, this.isThereNewWord(transcript))
      console.log(this.state.volumes.length)

      if (this.isThereNewWord(transcript))
        this.setState({ volumes: [...this.state.volumes, volume] })

      this.setState({ transcript })
      if (e.results[0].isFinal) {
        const log = {
          transcript: this.state.transcript,
          volumes: [...this.state.volumes, volume]
        }
        this.setState({
          transcript: null,
          volumes: [],
          logs: [...this.state.logs, log],
        })
      }
    })
    recognition && recognition.start()
  }

  render() {
    return (
      <div>
        <div>마이크에 음성을 입력해보자!</div>
        <div>⚠️ 데스크탑 크롬에서만 작동합니다.</div>
        {this.state.logs.map(
          log => log.transcript.split(' ').map(
            (word, index) => (
              <Word key={index} word={word} volume={log.volumes[index]} />
            )
          )
        )}
        {this.state.transcript && this.state.transcript.split(' ').map(
          (word, index) => (
            <Word key={index} word={word} volume={this.state.volumes[index]} />
          )
        )}
      </div>
    )
  }
}


export default IndexPage
