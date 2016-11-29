/*
	Descripción de la práctica
	• 
*/
$(document).ready(function(){
});

// Activar / desactivar seleccionar
$(document).ready(function(){
	// No seleccionar al inicio
	$("body")
		.attr("onselectstart", "return false")
		.attr("ondragstart", "return false");
	var botonActivado = false;
	$("#activarDesactivarSeleccionar").hide();
	
	$("h1").dblclick(function(){
		if( botonActivado ){
			botonActivado = false;
			$("#activarDesactivarSeleccionar").hide(450);
		} else {
			botonActivado = true;
			$("#activarDesactivarSeleccionar").show(450);
		}
	});
	
	var activarDesactivarSeleccionar_datos	= [
		false,
		"Seleccionar: Activado",
		"Seleccionar: Desactivado"
	];
	$("#activarDesactivarSeleccionar").text(activarDesactivarSeleccionar_datos[2]);
	
	$("#activarDesactivarSeleccionar").click(function(){
		// Activado → desactivado (no podrás seleccionar)
		if( activarDesactivarSeleccionar_datos[0] ){
			activarDesactivarSeleccionar_datos[0] = false;
			$("body")
				.attr("onselectstart", "return false")
				.attr("ondragstart", "return false");
			$(this).text(activarDesactivarSeleccionar_datos[2]);
		
		// desactivado → Activado (podrás seleccionar)
		} else {
			activarDesactivarSeleccionar_datos[0] = true;
			$("body")
				.attr("onselectstart", "")
				.attr("ondragstart", "");
			$(this).text(activarDesactivarSeleccionar_datos[1]);
		}
	});
});