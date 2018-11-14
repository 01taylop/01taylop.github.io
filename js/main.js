document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

window.addEventListener("load", pageFullyLoaded, false);

function theDomHasLoaded(e) {
  console.log("theDomHasLoaded");
}

function pageFullyLoaded(e) {
  console.log("pageFullyLoaded");
}
