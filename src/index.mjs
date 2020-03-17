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

const emotions = {
  "happy": {
    rate: 1.1,
    pitch: 1.2,
    volume: 2
  },
  "sad": {
    rate: .6,
    pitch: .7,
    volume: 1
  }
}

let retriesToSpeak = 0;
class Bol {
  constructor(defaultVoice = 'UK English Female', { rate, pitch, volume, emotion } = {rate: 1, pitch: 1, volume: 1}) {
    this.systemVoices = [];
    
    // if emotion is set then voice parameters according to emotion else set the once that are passed
    if(emotion){
      ({rate: this.rate, pitch: this.pitch, volume: this.volume} = emotions[emotion]);
    }else {
      this.rate = rate;
      this.pitch = pitch;
      this.volume = volume;
    }


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

  /**
   * 
   * @param text :String (text that we have to speak out)
   * @param options? :String or Object (If String: then it is newVoice, Else destructure to get the voiceParams)  
   * 
   * Example: 
   * bol.speak("HTML is love", "UK English Male")
   * or 
   * bol.speak("HTML sucks", {voice: "UK English Male", rate: 2})
   */
  
  async speak(text, options=null) {
    let newVoice, emotion, rate, pitch, volume;

    // options can either be String (newVoice), null or an object of options
    if(options) {
      if(typeof options === 'string'){
        newVoice = options;
      }else{
        ({voice: newVoice, emotion, rate, pitch, volume} = options)
      }
    }

    if(this.systemVoices.length === 0 && retriesToSpeak < 10) {
      await wait(600);
      retriesToSpeak++;
      return this.speak(text, {voice: newVoice});
    }
    

    const finalVolume = volume || this.volume;
    const voice = getSupportedVoice((newVoice || this.defaultVoice), this.systemVoices);
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