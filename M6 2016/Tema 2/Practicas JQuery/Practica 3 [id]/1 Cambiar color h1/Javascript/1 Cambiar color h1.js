/*
	Descripción de la práctica
		• Mostrar un html con 2 títulos h1.
		• Click en he:
			· cambiar color
			· cambiar fondo
			· cambiar fuente
	Añadidos:
		• Color, fondo y fuente son valores aleatorios.
*/
$(document).ready(function(){
	var colores	= [
		"rgba(0,0,0,0.5)",			// negro
		"rgba(128,128,128,0.5)",	// Gris
		"rgba(245,245,245,0.5)",	// Humo
		"rgba(255,255,255,0.5)",	// Blanco
		"rgba(255,0,0,0.5)",		// Rojo
		"rgba(255,128,0,0.5)",		// Naranja
		"rgba(255,255,0,0.5)",		// Amarillo
		"rgba(255,0,128,0.5)",		// Fucsia
		"rgba(255,0,255,0.5)",		// Rosa
		"rgba(0,255,0,0.5)",		// Verde
		"rgba(128,255,0,0.5)",		// Lima
		"rgba(0,0,255,0.5)",		// Azul
		"rgba(0,255,255,0.5)",		// Azul claro
		"rgba(128,0,255,0.5)",		// Morado
		"rgba(0,200,200,0.5)"		// Turquesa
		
	];
	var fuentes	= [
		"Algerian", "Bauhaus 93", "Bookshelf Symbol 7",
		"Broadway", "Calibri", "Castellar", "Century Gothic",
		"Magneto", "Webdings",
		"Harrington", "Impact", "Lucida Console", "French Script MT",
		"Copperplate Gothic Bold"
	];
	
	// click en h1
	$("h1").click(function(){
		// NOTA aleatorio() es un metodo de ayuda
		var h1_click	= $(this);
		var colorAleatorio	= aleatorio(colores);
		var fondoAleatorio	= aleatorio(colores);
		var fuenteAleatoria	= aleatorio(fuentes);
		
		h1_click
			.css("color", colorAleatorio)
			.css("background-color", fondoAleatorio)
			.css("font-family", fuenteAleatoria);
	});
});