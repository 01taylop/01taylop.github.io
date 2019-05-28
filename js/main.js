// Greeting
const greetingFn = {
  currentGreeting: {
    flag: "🇬🇧",
    greeting: "Hello",
  },
  greetingInterval: undefined,

  greetings: [{
    flag: "🇧🇷",
    greeting: "Oi",
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
    greeting: "Bonjour",
  }, {
    flag: "🇩🇪",
    greeting: "Guten Tag",
  }, {
    flag: "🇮🇹",
    greeting: "Ciao",
  }, {
    flag: "🇯🇵",
    greeting: "Konnichiwa",
  }, {
    flag: "🇳🇱",
    greeting: "Hallo",
  }, {
    flag: "🇵🇹",
    greeting: "Olá",
  }, {
    flag: "🇷🇴",
    greeting: "Salut",
  }, {
    flag: "🇪🇸",
    greeting: "Hola",
  }, {
    flag: "🇸🇪",
    greeting: "Hallå",
  }],

  init() {
    setTimeout(() => {
      greetingFn.typeGreeting("🇬🇧", "Hello")
      greetingFn.startInterval()
    }, 1000)
  },

  startInterval() {
    greetingFn.stopInterval()
    greetingFn.greetingInterval = setInterval(() => {
      const { flag, greeting } = greetingFn.getRandomGreeting()
      greetingFn.typeGreeting(flag, greeting)
    }, 8000)
  },

  stopInterval() {
    if (greetingFn.greetingInterval) {
      clearInterval(greetingFn.greetingInterval)
      greetingFn.greetingInterval = undefined
      document.getElementById("flag").innerHTML = greetingFn.currentGreeting.flag
      document.getElementById("greeting").innerHTML = greetingFn.currentGreeting.greeting
    }
  },

  getRandomGreeting() {
    return greetingFn.greetings[Math.floor(Math.random() * greetingFn.greetings.length)]
  },

  typeGreeting(flag, greeting) {
    greetingFn.currentGreeting = {
      flag,
      greeting,
    }

    let previousGreeting = document.getElementById("greeting").innerHTML
    let typedIndex = 0
    let typewriterTimeout

    function typewriter() {
      // Clear Timeout
      if (typewriterTimeout) {
        clearTimeout(typewriterTimeout)
        typewriterTimeout = undefined
      }

      // Delete/Type Logic
      if (previousGreeting.length > 0) {
        previousGreeting = previousGreeting.substring(0, previousGreeting.length - 1)
        document.getElementById("greeting").innerHTML = previousGreeting
      } else if (typedIndex === 0) {
        typedIndex += 1
        document.getElementById("flag").innerHTML = flag
      } else if (typedIndex < greeting.length) {
        typedIndex += 1
        document.getElementById("greeting").innerHTML = greeting.substring(0, typedIndex)
      }

      // Iterate
      if (typedIndex === greeting.length) {
        previousGreeting = greeting
      } else {
        typewriterTimeout = setTimeout(typewriter, 80)
      }
    }

    typewriter()
  },
}

// Visibility
const visibilityFn = {
  hidden: undefined,
  visibilityChange: undefined,

  init() {
    if (typeof document.hidden !== "undefined") {
      visibilityFn.hidden = "hidden"
      visibilityFn.visibilityChange = "visibilitychange"
    } else if (typeof document.msHidden !== "undefined") {
      visibilityFn.hidden = "msHidden"
      visibilityFn.visibilityChange = "msvisibilitychange"
    } else if (typeof document.webkitHidden !== "undefined") {
      visibilityFn.hidden = "webkitHidden"
      visibilityFn.visibilityChange = "webkitvisibilitychange"
    }

    if (typeof document.addEventListener === "undefined" || visibilityFn.hidden === undefined) {
      console.log("Page Visibility API not supported.")
    } else {
      document.addEventListener(visibilityFn.visibilityChange, visibilityFn.handleVisibilityChange, false)
    }
  },

  handleVisibilityChange() {
    if (document[visibilityFn.hidden]) {
      greetingFn.stopInterval()
    } else {
      greetingFn.startInterval()
    }
  },
}

// Init
function theDomHasLoaded() {
  visibilityFn.init()
  greetingFn.init()
}

function pageFullyLoaded() {
  console.log("pageFullyLoaded")
}

// Start
document.addEventListener("DOMContentLoaded", theDomHasLoaded, false)
window.addEventListener("load", pageFullyLoaded, false)
