// Does not really guarentee consistency but better than worst :(

// Bol Voices
export const bolVoices = {
  "UK English Female": [0, 1, 2, 3, 4, 5, 6],
  "UK English Male": [7, 8, 9, 10, 11, 12, 13],
  "US English Female": [14, 15, 16, 17, 18, 19, 20],
  "US English Male": [7, 8, 9, 10, 11, 12, 13]
}

// System Equivalent Fallbacks
export const fallbacks = [
  // UK English Female
  {
    "name": "Google UK English Female"
  },
  {
    "name": "en-AU",
    "rate": 0.25,
    "pitch": 1
  },
  {
    "name": "Agnes"
  },
  {
    "name": "inglés Reino Unido"
  },
  {
    "name": "English United Kingdom"
  },
  {
    "name": "English United Kingdom",
    "lang": "en_GB"
  },
  {
    "name": "Fallback en-GB Female",
    "lang": "en-GB",
    "fallbackvoice": true
  },


  // UK English Male & US English Male
  {
    "name": "Google UK English Male"
  },
  {
    "name": "en-GB",
    "rate": 0.25,
    "pitch": 1
  },
  {
    "name": "Daniel Compact"
  },
  {
    "name": "inglés Reino Unido"
  },
  {
    "name": "English United Kingdom"
  },
  {
    "name": "Daniel"
  },
  {
    "name": "Fallback UK English Male",
    "lang": "en-GB",
    "fallbackvoice": true,
    "service": "g1",
    "voicename": "rjs"
  },


  // US English Female
  {
    "name": "Google US English",
    "timerSpeed": 1
  },
  {
    "name": "English United States"
  },
  {
    "name": "inglés Estados Unidos"
  },
  {
    "name": "Vicki"
  },
  {
    "name": "en-US",
    "rate": 0.2,
    "pitch": 1,
    "timerSpeed": 1.3
  },
  {
    "name": "English United States",
    "lang": "en_US"
  },
  {
    "name": "Fallback English",
    "lang": "en-US",
    "fallbackvoice": true,
    "timerSpeed": 0
  }
]