/*
	• Detector por sonido
*/

// Configuración predeterminada
var buscaminas_anchura	= 1;
var buscaminas_altura	= 1;

//IniciarEstructura
$(document).ready(function(){
	$("body")
});

// Configuración
$(document).ready(function(){
	Buscaminas();
});

function Buscaminas(){
	Buscaminas_estructuraHtml();
}

function Buscaminas_estructuraHtml(){
	$("body").append(
		"<h1>Buscaminas</h1>"
	);
}

function crearTablero(anchura, altura){
	$("body").append("<div id=\"buscaminas\">"+ anchura +"x"+ altura +"</div>");
}