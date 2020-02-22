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
// Helpers end


var systemVoices = [];
function init() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  systemVoices = speechSynthesis.getVoices();
}

init();
speechSynthesis.onvoiceschanged = init

function getSupportedVoice(bolVoice) {
  const fallbackVoices = getFallbackVoices(bolVoice);
  // getCommonValue returns common value between two arrays
  const supportedVoice = getCommonVoice(fallbackVoices, systemVoices)
  return supportedVoice;
}

const defaultVoice = "UK English Male"
async function speak(text, newVoice = null) {
  if(systemVoices.length === 0) {
    await wait(600);
    return speak(text, newVoice);
  }
  
  const voice = getSupportedVoice(newVoice || defaultVoice);
  const utterThis = new SpeechSynthesisUtterance();
  utterThis.voice = voice || '';
  utterThis.voiceURI = voice.voiceURI || '';
  utterThis.volume = 1;
  utterThis.rate = 1;
  utterThis.pitch = 1;
  utterThis.text = text;
  utterThis.lang = voice.lang || 'en-US';

  alert(voice.voiceURI);
  speechSynthesis.speak(utterThis);
}

var bol = {defaultVoice, speak};

export default bol;