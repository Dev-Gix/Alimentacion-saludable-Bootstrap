
/*Validar Formulario */

//Formulario Contacto
(function() {
  'use strict';
  window.addEventListener('load', function() {
    
    let forms = document.getElementsByClassName('needs-validation');
    
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();




let Nivel = 0;
let IntentosFallidos = 0;


const Respuesta = document.querySelector("#Respuesta");
const Pista = document.querySelector("#Pista");
const Intento = document.querySelector("#Intentos-Adivinanza");
const DescripcionAdivinanza = document.querySelector("#Descripcion");
const BotonIniciar = document.querySelector("#Btn-Iniciar");
const BotonAceptar = document.querySelector("#Btn-Aceptar");
const BotonReintentar =document.querySelector("#Btn-Reintentar");
const ImgAdivinanza = document.querySelector("#img-adivinanza");

let AdivinanzaNiveles = [
  {
    descripcion:
      "Era un sol en miniatura, en la hierba la encontré. Cuando sin piel la dejé, me fascinó su frescura.",
    pista1: "Fruta que da nombre a un color",
    pista2: " n _ r _ _ _a",
    solucion: "naranja",
    img: "img/naranja.jpg"
  },
  {
    descripcion: "Oro parece, plata no es,el que no lo adivine, bien tonto es.",
    pista1: "Lee bien, la respuesta está escrita en la pregunta.",
    pista2: " _ l_ ta_ o",
    solucion: "platano",
    img: "img/platano.jpg"
  },
  {
    descripcion:
      "En el campo me crié, mis hermanos son los ajos y aquel que llora por mí, me está partiendo en pedazos.",
    pista1:
      "Se echa en las ensaladas, pero también se frien e incluso interrumpe la tos si te la acercas",
    pista2: "ce_ oll_",
    solucion: "cebolla",
    img: "img/cebolla.jpg"
  },
  {
    descripcion:
      "Tiene ojos y no ve, tiene agua y no la bebe, tiene carne y no la come, tiene barba y no es hombre.",
    pista1: "Fruta cuyo nombre da miedo a los niños.",
    pista2: "_ o _ o",
    solucion: "coco",
    img: "img/coco.jpg"
  },
  {
    descripcion:
      "Soy la redondez del mundo, de esperanza estoy vestida y no hay noche para mí, porque conmigo está el día.",
    pista1: "Es verde por fuera y roja por dentro",
    pista2: " _ _ nd_ _",
    solucion: "sandia",
    img: "img/sandia.jpg"
  },
];

EventListener();

  function EventListener(){
    BotonIniciar.addEventListener('click',newGame);
    BotonAceptar.addEventListener('click',startGame);
    BotonReintentar.addEventListener('click',restartGame);
  }




//Nuevo Juego
function newGame() {
  ImgAdivinanza.setAttribute('class', 'Ocultar');
  Respuesta.setAttribute('class','form-control-lg Mostrar');
  Nivel = 0;
  IntentosFallidos = 0;
  level(Nivel);

  BotonIniciar.setAttribute('class', 'btn btn btn-success Ocultar');
  BotonAceptar.setAttribute('class', 'btn btn btn-success Mostrar');
} 


//InicioJuego
function startGame() {
  
  if (!isEmpty()) {
    
    if (Respuesta.value.localeCompare(AdivinanzaNiveles[Nivel].solucion) == 0) {

      if(Nivel == 4){
        gameWin();
        
      }
      Nivel++;
      level(Nivel);
      alert("Felicidades Respuesta Correcta Pasas al siguiente nivel");
      console.log(`NIVEL:${Nivel}`);
      clearScreen();
    }else{
        console.log("PERDISTE UN INTENTO");
        IntentosFallidos++;
        helpGame(IntentosFallidos);
        clearScreen();
    }
  }else{
    alert("INGRESA UNA RESPUESTA");
  }
}


//Niveles de Juego
function level(Nivel) {
  DescripcionAdivinanza.textContent = `${AdivinanzaNiveles[Nivel].descripcion}`;
}

//Pistas
function helpGame(Intentos) {

  Intento.textContent = `Intentos: ${IntentosFallidos}/4`;

  switch (IntentosFallidos) {
    case 2:
      Pista.textContent = `PISTA 1:${AdivinanzaNiveles[Nivel].pista1}`;
      break;
    case 3:
      Pista.textContent = `PISTA 2:${AdivinanzaNiveles[Nivel].pista2}`;
      break;
    case 4:
        DescripcionAdivinanza.textContent = `PARTIDAS GANADAS: ${Nivel+1}/${AdivinanzaNiveles.length}`;
        ImgAdivinanza.setAttribute('class', 'Mostrar');
        ImgAdivinanza.setAttribute('src', `${AdivinanzaNiveles[Nivel].img}`);
        Pista.textContent = `LA RESPUESTA CORRECTA ERA:${AdivinanzaNiveles[Nivel].solucion}`;
        BotonAceptar.setAttribute('class', 'btn btn btn-success Ocultar');
        BotonReintentar.setAttribute('class', 'btn btn btn-danger Mostrar');
        Respuesta.setAttribute('class','form-control-lg Ocultar');
       
        break;
  }
}

//Validamos Si la caja esta vacia
function isEmpty() {
  let caja = document.getElementById("Respuesta").value;
  if (caja == "") {
    return true;
  }
  return false;
}

//Limpia la caja de respuesta
function clearScreen() {
  document.getElementById("Respuesta").value = "";
}


//Reintentar
function restartGame() {
    console.log("Juego Reiniciado");
    DescripcionAdivinanza.textContent = "¿LISTOS?"
    ImgAdivinanza.setAttribute('src', 'img/adivinanza.png');
    
    Intento.textContent = "";
    Pista.textContent = "";
    BotonReintentar.setAttribute('class', 'btn btn btn-danger Ocultar');
    BotonIniciar.setAttribute('class', 'btn btn btn-success Mostrar');
    
}

function gameWin(){

DescripcionAdivinanza.textContent = `PARTIDAS GANADAS: ${Nivel+1}/${AdivinanzaNiveles.length}`;
DescripcionAdivinanza.setAttribute('class', 'Mostrar');

ImgAdivinanza.setAttribute('class', 'Mostrar ');
ImgAdivinanza.setAttribute('src','img/ganador1.png');

 Respuesta.setAttribute('class','Ocultar'); 
 Pista.setAttribute('class','Ocultar'); 
 Intento.setAttribute('class','Ocultar'); 
 
 BotonIniciar.setAttribute('class','Ocultar'); 
 BotonAceptar.setAttribute('class','Ocultar'); 
 BotonReintentar.setAttribute('class','Ocultar'); 
 
}








  
