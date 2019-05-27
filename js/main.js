document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

window.addEventListener("load", pageFullyLoaded, false);

function theDomHasLoaded(e) {
  const greetings = [{
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
  }]

  const typeSpeed = 80
  let previousI = 0
  let previousGreeting = ""

  function typeWelcome(flag, greeting) {
    let i = 0;
    function typewriter() {
      if (previousI >= 0) {
        document.getElementById("greeting").innerHTML = previousGreeting.substring(0, previousI);
        if (previousI === 0) {
          document.getElementById("flag").innerHTML = flag
        }
        previousI -= 1;
        setTimeout(typewriter, typeSpeed);
      } else if (i < greeting.length) {
        document.getElementById("greeting").innerHTML = greeting.substring(0, i + 1);
        i += 1;
        setTimeout(typewriter, typeSpeed);
      } else {
        previousI = greeting.length
        previousGreeting = greeting
      }
    }
    typewriter()
  }

  setTimeout(function() {
    typeWelcome("🇬🇧", "Hello")
    setInterval(function() {
      const { flag, greeting } = greetings[Math.floor(Math.random() * greetings.length)]
      typeWelcome(flag, greeting)
    }, 8000)
  }, 1000);
}

function pageFullyLoaded(e) {
  console.log("pageFullyLoaded");
}
