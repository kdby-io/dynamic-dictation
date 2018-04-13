const getRecognition = (onResult) => {
  if (window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.interimResults = true
    recognition.lang = 'ko-KR'
    recognition.onend = recognition.start
    recognition.onresult = onResult
    return recognition
  }
}

export { getRecognition }