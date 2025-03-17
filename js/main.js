/*
 * GREETINGS
 */

const GREETINGS = [{
  flag: "🇬🇧",
  time: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
  },
}, {
  flag: "🇧🇷",
  time: {
    morning: "Bom dia",
    afternoon: "Boa tarde",
    evening: "Boa noite",
  },
}, {
  flag: "🇨🇳",
  greeting: "Nǐ hǎo",
}, {
  flag: "🇩🇰",
  greeting: "Hej",
}, {
  flag: "🇪🇪",
  greeting: "Tere",
}, {
  flag: "🇫🇮",
  greeting: "Hei",
}, {
  flag: "🇫🇷",
  time: {
    morning: "Bonjour",
    afternoon: "Bonjour",
    evening: "Bonsoir",
  },
}, {
  flag: "🇩🇪",
  time: {
    morning: "Guten Morgen",
    afternoon: "Guten Tag",
    evening: "Guten Abend",
  },
}, {
  flag: "🇮🇹",
  time: {
    morning: "Buongiorno",
    afternoon: "Buon pomeriggio",
    evening: "Buonasera",
  },
}, {
  flag: "🇰🇷",
  greeting: "ㅇㅏㄴ ㄴㅕㅇ ㅎㅏ ㅅㅔ ㅇㅛ ",
}, {
  flag: "🇯🇵",
  time: {
    morning: "Ohayou",
    afternoon: "Konnichiwa",
    evening: "Konbanwa",
  },
}, {
  flag: "🇳🇱",
  greeting: "Hallo",
}, {
  flag: "🇵🇹",
  time: {
    morning: "Bom dia",
    afternoon: "Boa tarde",
    evening: "Boa noite",
  },
}, {
  flag: "🇷🇴",
  greeting: "Salut",
}, {
  flag: "🇪🇸",
  time: {
    morning: "Buenos días",
    afternoon: "Buenas tardes",
    evening: "Buenas noches",
  },
}, {
  flag: "🇸🇪",
  greeting: "Hej",
}].sort((a, b) => {
  if (a.flag === "🇬🇧") {
    return 1
  }
  if (b.flag === "🇬🇧") {
    return -1
  }
  return Math.random() - 0.5
})

const replaceHangul = greeting => greeting.replace("ㅇㅏㄴ", "안")
  .replace("ㄴㅕㅇ", "녕")
  .replace("ㅎㅏ", "하")
  .replace("ㅅㅔ", "세")
  .replace("ㅇㅛ", "요")

const greetingFn = {
  currentGreeting: {
    flag: "",
    greeting: "",
  },
  currentIndex: -1,
  greetingInterval: undefined,

  init() {
    setTimeout(() => {
      this.typeGreeting({ flag: "🇬🇧", greeting: "Hello" })
      this.startInterval()
    }, 600)
  },

  getNextGreeting() {
    this.currentIndex = (this.currentIndex + 1) % GREETINGS.length

    const { flag, greeting, time } = GREETINGS[this.currentIndex]

    if (time) {
      const hours = new Date().getHours()

      if (hours > 3 && hours < 12) {
        return { flag, greeting: time.morning }
      }
      if (hours >= 12 && hours < 18) {
        return { flag, greeting: time.afternoon }
      }
      return { flag, greeting: time.evening }
    }

    return { flag, greeting }
  },

  startInterval() {
    this.stopInterval()
    this.greetingInterval = setInterval(() => {
      const nextGreeting = this.getNextGreeting()
      this.typeGreeting(nextGreeting)
    }, 6000)
  },

  stopInterval() {
    if (this.greetingInterval) {
      clearInterval(this.greetingInterval)
      this.greetingInterval = undefined
      document.getElementById("flag").textContent = this.currentGreeting.flag
      document.getElementById("greeting").textContent = replaceHangul(this.currentGreeting.greeting)
    }
  },

  typeGreeting({ flag, greeting }) {
    const greetingElement = document.getElementById("greeting")
    const flagElement = document.getElementById("flag")

    let previousGreeting = this.currentGreeting.greeting
    const previousFlag = this.currentGreeting.flag
    let typedIndex = -1
    let typewriterTimeout

    this.currentGreeting = { flag, greeting }

    function typewriter() {
      // Clear Timeout
      if (typewriterTimeout) {
        clearTimeout(typewriterTimeout)
        typewriterTimeout = undefined
      }

      // Delete/Type Logic
      let delay = 120

      if (previousGreeting.length > 0) {
        previousGreeting = previousGreeting.substring(0, previousGreeting.length - 1)
        greetingElement.textContent = replaceHangul(previousGreeting)
        if (previousFlag === "🇰🇷") {
          delay = 160
        }
      } else if (typedIndex === -1) {
        typedIndex += 1
        flagElement.textContent = flag
        if (flag === "🇰🇷") {
          greetingElement.classList.add("korean")
        } else {
          greetingElement.classList.remove("korean")
        }
      } else if (typedIndex < greeting.length) {
        typedIndex += 1
        const nextGreetingText = greeting.substring(0, typedIndex)
        greetingElement.textContent = replaceHangul(nextGreetingText)
        if (flag === "🇰🇷") {
          delay = 180
        }
      }

      // Iterate
      if (typedIndex !== greeting.length) {
        typewriterTimeout = setTimeout(typewriter, delay)
      }
    }

    typewriter()
  },
}

/*
 * Visibility
 */

const visibilityFn = {
  hidden: undefined,
  visibilityChange: undefined,

  init() {
    if (typeof document.hidden !== "undefined") {
      this.hidden = "hidden"
      this.visibilityChange = "visibilitychange"
    } else if (typeof document.msHidden !== "undefined") {
      this.hidden = "msHidden"
      this.visibilityChange = "msvisibilitychange"
    } else if (typeof document.webkitHidden !== "undefined") {
      this.hidden = "webkitHidden"
      this.visibilityChange = "webkitvisibilitychange"
    }

    if (typeof document.addEventListener === "undefined" || this.hidden === undefined) {
      console.log("Page Visibility API not supported.")
    } else {
      document.addEventListener(this.visibilityChange, this.handleVisibilityChange.bind(this), false)
    }
  },

  handleVisibilityChange() {
    if (document[this.hidden]) {
      greetingFn.stopInterval()
    } else {
      greetingFn.startInterval()
    }
  },
}

/*
 * INIT
 */

const domContentLoaded = () => {
  visibilityFn.init()
  greetingFn.init()
}

// Start
document.addEventListener("DOMContentLoaded", domContentLoaded, false)
