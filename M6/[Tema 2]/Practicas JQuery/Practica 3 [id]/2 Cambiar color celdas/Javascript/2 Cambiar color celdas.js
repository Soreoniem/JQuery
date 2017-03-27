/*
	Descripción de la práctica
	• Crear una tabla con 2 filas.
	• Evento click:
		· Modificar el fondo.
	
	+ Añadidos:
		· Fondo aleatorio.
*/
$(document).ready(function(){
	var colores	= [
		"rgba(0,0,0,0.75)",			// negro
		"rgba(128,128,128,0.75)",	// Gris
		"rgba(245,245,245,0.75)",	// Humo
		"rgba(255,255,255,0.75)",	// Blanco
		"rgba(255,0,0,0.75)",		// Rojo
		"rgba(255,128,0,0.75)",		// Naranja
		"rgba(255,255,0,0.75)",		// Amarillo
		"rgba(255,0,128,0.75)",		// Fucsia
		"rgba(255,0,255,0.75)",		// Rosa
		"rgba(0,255,0,0.75)",		// Verde
		"rgba(128,255,0,0.75)",		// Lima
		"rgba(0,0,255,0.75)",		// Azul
		"rgba(0,255,255,0.75)",		// Azul claro
		"rgba(128,0,255,0.75)",		// Morado
		"rgba(0,200,200,0.75)"		// Turquesa
		
	];
	$("th, td").click(function(){
		var este_TdTh	= $(this);
		este_TdTh.css("background-color", aleatorio(colores));
	});
});