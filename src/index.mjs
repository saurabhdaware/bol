import { bolVoices, fallbacks } from './voices.mjs';

// Helpers
function getFallbackVoices(voiceName) {
  return bolVoices[voiceName].map(id => fallbacks[id]);
}

function getCommonVoice(fallbackVoices, systemVoices) {
  for(let item of fallbackVoices) {
    let commonVoice = systemVoices.find(val => val.name === item.name);
    if(commonVoice) return commonVoice;
  }
}

async function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  })
}


function getSupportedVoice(bolVoice, systemVoices) {
  const fallbackVoices = getFallbackVoices(bolVoice);
  // getCommonValue returns common value between two arrays
  const supportedVoice = getCommonVoice(fallbackVoices, systemVoices)
  return supportedVoice;
}

// Helpers end

class Bol {
  constructor(defaultVoice = 'UK English Female', { rate, pitch, volume } = {rate: 1, pitch: 1, volume: 1}) {
    this.systemVoices = [];
    this.rate = rate;
    this.pitch = pitch;
    this.volume = volume;
    this.defaultVoice = defaultVoice;

    this.init();
    this.speak = this.speak.bind(this);
    this.init = this.init.bind(this);
    speechSynthesis.onvoiceschanged = this.init;
  }

  init() {
    if(typeof speechSynthesis === 'undefined') return;
    this.systemVoices = speechSynthesis.getVoices();
  }

  async speak(text, newVoice = null) {
    if(this.systemVoices.length === 0) {
      await wait(600);
      return this.speak(text, newVoice);
    }
    
    const voice = getSupportedVoice((newVoice || this.defaultVoice), this.systemVoices);
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voice || '';
    utterThis.voiceURI = voice.voiceURI || '';
    utterThis.volume = this.volume || 1;
    utterThis.rate = this.rate || .8;
    utterThis.pitch = this.pitch || 1;
    utterThis.text = text;
    utterThis.lang = voice.lang || 'en-US';
    console.log(speechSynthesis);
    speechSynthesis.speak(utterThis);
  }

}

export default Bol;