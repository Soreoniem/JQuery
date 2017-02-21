/*
	• Detector por sonido
*/

// Configuración predeterminada
var vg_buscaminas_anchura		= 10;
var vg_buscaminas_altura		= 10;

/*
var v_buscaminas_estado			= "jugando";	// jugando, ganado, perdido
var v_buscaminas_dificultad		= 10;

var v_buscaminas_tablero_datos;
var v_buscaminas_tablero_imagenes;

var v_buscaminas_minas_total		= 0;
var v_buscaminas_minas_aseguradas	= 0;
var v_buscaminas_banderas			= 0;
*/

//IniciarEstructura
$(document).ready(function(){
	buscaminas_actualizar_menu();
});

// Actualizará el menú
function buscaminas_actualizar_menu(){
	$(".menu_anchura .dato").text(vg_buscaminas_anchura);
	$(".menu_altura .dato").text(vg_buscaminas_altura);
}

$(document).ready(function(){
	Buscaminas();
});

// Inicia el Buscaminas
function Buscaminas(){
	Buscaminas_estructuraHtml();
}

// Crea la estructura principal del buscaminas (h1 y div)
function Buscaminas_estructuraHtml(){
	$("body").append(
		"<h1>Buscaminas</h1>"+
		"<div id=\"buscaminas\"></div>"
	);
}