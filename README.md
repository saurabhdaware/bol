# Bol (बोल) 🗣

TTS Library for Web

Currently just a wrapper around speechSynthesis with slightly better consistency in voices, Trying to be super consistent! Text-to-speech for Web.


[![npm](https://img.shields.io/npm/v/bol?style=flat-square)](https://npmjs.com/package/bol)


*Meant to be used on frontend.*

***NOT READY FOR PROD*** 

If you still want to ruin your life, here's how you can do it:

---

## Installation
```sh
npm install --save bol
```

or

```html
<script src="https://unpkg.com/bol@^0/dist/bol.min.js"></script>
```

---

## Usage

### ES Module
```js
import Bol from 'bol';

const bol = new Bol("UK English Female", {rate: .8, pitch: 1, volume: 1})

bol.speak("Whhatta useless package", "UK English Male")
  .then(elapsedTime => console.log(elapsedTime))
```
or

### Vanilla Script Include
```html
<body>
  <button class="talk">Fact of the Day</button>
  <script src="https://unpkg.com/bol@^0/dist/bol.min.js"></script>
  <script>
    const bol = new Bol('UK English Male', {rate: .8});

    document.querySelector('.talk').addEventListener('click', e => {
      bol.speak("HTML is a programming language!")
        .then(elapsedTime => {
          console.log(elapsedTime);
        })
    })
  </script>
</body>

```

Make sure you wrap bol.speak around a user's touch, swipe, click handlers to make it work.

---

## Voices
- "UK English Male"
- "UK English Female"
- "US English Male"
- "US English Female"

---

## Me!
- [GitHub/saurabhdaware](https://github.com/saurabhdaware)
- [Twitter/saurabhcodes](https://twitter.com/saurabhcodes)

🌻
