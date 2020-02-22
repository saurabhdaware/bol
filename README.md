# Bol (बोल) 🗣

TTS Library for Web

Currently just a wrapper around speechSynthesis with slightly better consistency in voices, Trying to be super consistent! Text-to-speech for Web.

[![npm](https://img.shields.io/npm/v/bol?style=flat-square)](https://npmjs.com/package/bol)

***NOT READY FOR PROD*** 

If you still want to ruin your life, here's how you can do it:

## Installation
```sh
npm install --save bol
```

## Usage

```js
import Bol from 'bol';

const bol = new Bol("UK English Female", {rate: .8, pitch: 1, volume: 1})

bol.speak("Whhatta useless package", "UK English Male");
```


## Languages
- "UK English Male"
- "UK English Female"
- "US English Male"
- "US English Female"


## Me!
- [GitHub/saurabhdaware](https://github.com/saurabhdaware)
- [Twitter/saurabhcodes](https://twitter.com/saurabhcodes)