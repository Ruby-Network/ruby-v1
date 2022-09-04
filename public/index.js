const form = document.querySelector('form');
const input = document.querySelector('input');


if ('serviceWorker' in navigator) {
window.navigator.serviceWorker.register(window.location.origin + "/sw.js", {scope: __uv$config.prefix})
}

var Stomp = new StompBoot({
  bare_server: "/bare/",
  directory: "/stomp/",
  loglevel: StompBoot.LOG_ERROR,
  codec: StompBoot.CODEC_XOR
})

if ('serviceWorker' in navigator) {
window.navigator.serviceWorker.register(window.location.origin + "/dip-sw.js", {scope: __DIP.config.prefix })
}

navigator.serviceWorker.register(window.location.origin + "/osana/sw.js", {
  scope: __osana$config.prefix,
  updateViaCache: "none"
})

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register(window.location.origin + "/aero-sw.js", {
  scope: "/go/",
  // Don't cache http requests
  updateViaCache: 'none',
  type: 'module'
})
}

form.addEventListener('submit', async event => {
    event.preventDefault();
        let url = input.value.trim();
        let urlstart = localStorage.getItem('urlstart');
        if(urlstart == null) {
          urlstart = 'https://google.com/search?q=';
        }
        if (!isUrl(url)) url = /*'https://www.google.com/search?q='*/urlstart + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        function getLink(url) {
var type = localStorage.getItem("type") || "Ultraviolet"

switch(type) {
case "Ultraviolet":
return "." + __uv$config.prefix + __uv$config.encodeUrl(url)
break;
case "Stomp":
return "." + Stomp.html(url)
break;
case "DIP":
return "." + __DIP.config.prefix + __uv$config.encodeUrl(url)
break;
case "Osana":
return "." + __osana$config.prefix + __osana$config.codec.encode(url)
break;
case "Aero":
return "." + "/go/" + url
break;
default:
return "." + __uv$config.prefix + __uv$config.encodeUrl(url)
break;
}
}

window.location.href = getLink()
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

if (localStorage.getItem("type")) {
  document.querySelector("#select-proxy option[value=" +   localStorage.getItem("type") + "]").setAttribute("selected", "");
}

function setProxy() {
  const selector = document.getElementById('select-proxy');
  const type = selector.value;

  localStorage.setItem("type", type);
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
