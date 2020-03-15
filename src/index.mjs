import { bolVoices, fallbacks } from './voices.mjs';

// Helpers
function getFallbackVoices(voiceName) {
  // return first voice (Google UK English Female) if the voice does not exist in list
  if(!bolVoices[voiceName]) return [fallbacks[0]];

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

let retriesToSpeak = 0;
class Bol {
  constructor(defaultVoice = 'UK English Female', { rate, pitch, volume } = {rate: 1, pitch: 1, volume: 1}) {
    this.systemVoices = [];
    this.rate = rate;
    this.pitch = pitch;
    this.volume = volume;

    if(Object.keys(bolVoices).includes(defaultVoice)) {
      this.defaultVoice = defaultVoice;
    }else {
      this.defaultVoice = 'UK English Female';
    }
    
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
    if(this.systemVoices.length === 0 && retriesToSpeak < 10) {
      await wait(600);
      retriesToSpeak++;
      return this.speak(text, newVoice);
    }
    
    const voice = getSupportedVoice((newVoice || this.defaultVoice), this.systemVoices);
    console.log(this.defaultVoice);
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voice || '';
    utterThis.voiceURI = voice.voiceURI || '';
    utterThis.volume = (this.volume === undefined || this.volume === null) ? 1 : this.volume;
    utterThis.rate = (this.rate === undefined || this.rate === null) ? .8 : this.rate;
    utterThis.pitch = (this.pitch === undefined || this.pitch === null) ? 1 : this.pitch;
    utterThis.text = text;
    utterThis.lang = voice.lang || 'en-US';

    speechSynthesis.speak(utterThis);
    
    return new Promise(resolve => {
      utterThis.onend = e => {
        resolve(e.elapsedTime);
      }
    })
  }

}

export default Bol;