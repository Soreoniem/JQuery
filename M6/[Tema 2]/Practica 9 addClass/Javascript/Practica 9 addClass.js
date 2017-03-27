/*
	Descripción de la práctica
	• 
*/
$(document).ready(function(){
	// Variables de control
	var thead	= false;
	var tbody	= false;
	
	// Click en el botón Thead
	$("#modThead").click(function(){
		// Almacena todos los tags de thead (1 esta vez)
		var todosThead	= $("thead");
		
		// If activado (variable thead)
		if(thead){
			// cambio valor de control
			thead	= false;
			
			// Eliminar la clase
			todosThead.removeClass("cssThead");
		} else {
			// cambio valor de control
			thead	= true;
			
			// Añadir la clase
			todosThead.addClass("cssThead");
		}
	});
	
	// Click en el botón Tbody
	$("#modTbody").click(function(){
		// Almacena todos los tags de tbody(1)
		var todosTbody	= $("tbody");
		
		// If activado (variable tbody)
		if(tbody){
			// cambio valor de control
			tbody	= false;
			
			// Eliminar la clase
			todosTbody.removeClass("cssTbody");
		} else {
			// cambio valor de control
			tbody	= true;
			// Añadir la clase
			todosTbody.addClass("cssTbody");
		}
	});
});