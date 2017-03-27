/*
	Descripción de la práctica
	• Tabla con 5 filas
	• Click
		· Cambiar de colo a la fila
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
	
	$("tr").click(function(){
		$(this).css("background-color", aleatorio(colores));
	});
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