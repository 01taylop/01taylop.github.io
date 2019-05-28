document.addEventListener("DOMContentLoaded", theDomHasLoaded, false)

window.addEventListener("load", pageFullyLoaded, false)

function theDomHasLoaded(e) {
  setTimeout(function() {
    greetingFn.typeGreeting("🇬🇧", "Hello")
    setInterval(function() {
      const { flag, greeting } = greetingFn.getRandomGreeting()
      greetingFn.typeGreeting(flag, greeting)
    }, 8000)
  }, 1000)
}

function pageFullyLoaded(e) {
  console.log("pageFullyLoaded")
}

const greetingFn = {
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

  getRandomGreeting: function() {
    return greetingFn.greetings[Math.floor(Math.random() * greetingFn.greetings.length)]
  },

  typeGreeting: function(flag, greeting) {
    let previousGreeting = document.getElementById("greeting").innerHTML
    let typedIndex = 0
    let typewriterTimeout = undefined

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
