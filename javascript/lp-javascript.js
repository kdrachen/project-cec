const faqs = document.querySelectorAll('.faq');

faqs.forEach((faq) => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('active');
    });
});

var minutos = 14;
var segundos = 00;

function atualizaContador() {
  var minutosElemento = document.getElementById("minutos");
  var segundosElemento = document.getElementById("segundos");

  // Subtrai um segundo dos minutos e segundos restantes
  if (segundos > 0) {
    segundos--;
  } else if (minutos > 0) {
    minutos--;
    segundos = 59;
  } else {
    // Acabou o tempo, para a contagem
    clearInterval(intervalId);
    alert("Tempo acabou!");
    return;
  }

  // Atualiza os elementos HTML com o novo valor
  var segundosTexto = segundos < 10 ? "0" + segundos : segundos;
  minutosElemento.innerHTML = minutos;
  segundosElemento.innerHTML = segundosTexto;
}

// Inicia a contagem
var intervalId = setInterval(atualizaContador, 1000);

// Pegar geo
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showLocation, errorHandler, { 
    enableHighAccuracy: true, 
    maximumAge: 0 
  });
} else {
  console.log("Geolocalização não é suportada neste navegador");
}

function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var city = data.address.city;
      document.getElementById('city').innerHTML = city;
    }
  };
  xhr.send();
}

function errorHandler(error) {
  console.log(error);
}