// Practica
$(document).ready(function(){
	
// Añadir los accesorios al select html
	 // obtiene la etiqueta select
	var select_Accesorio = $("#accesorios");
	
	// Recorre todos los accesorios
	for( objeto in accesorios ){
		// objeto = "acc", "acc2", etc. (el objeto dentro de accesorios)
		
		 // $("#accesorios").append();
		 // Añade dentro de <select> lo que le pongas
		 // append() lo pone al final
		 // el caracter \ ommite el siguiente caracter para poder imprimir unas comillas ""
		select_Accesorio.append(
			"<option value=\""+ objeto +"\">"+ accesorios[objeto]["etiqueta"] +" ("+ accesorios[objeto]["precio"] +"€)</option>"
		);
		// <option value="objeto"> accesorios[objeto]["etiqueta"]  ( accesorios[objeto]["precio"] €)</option>"
	}
	
// Click en comprar
	$("#boton").click(function(){
		// select_Accesorio = $("#select")
		 // Obtengo el tipo de accesorio (acc1, acc2, etc.)
		var accesorio	= select_Accesorio.val();
		
		 // Obtengo la cantidad
		var cantidad	= $("#cantidad").val();
		
		 // ParseFloat para obtener numeros con decimales
		var precioAccesorio	= parseFloat(accesorios[accesorio]["precio"])
		 // precio = precio accesorio * cantidad
		var precio			= precioAccesorio * parseFloat(cantidad);
		
		 // $("#compra") es la tabla
		 // tr:last es el último tr de la tabla (fila)
		 // con before quiere decir antes de.
		 // Antes del precio total añade el nuevo tr
		$("#compra tr:last").before(
			"<tr>"
				+"<td>"+ accesorios[accesorio]["etiqueta"] +"</td>"
				+"<td>"+ cantidad +"</td>"
				+"<td>"+ precio +"€</td>"
			+"</tr>"
		);
		
		 // Obtengo el valor total ("400€")
		var total	= $("#totalval").text();
		
		 // substr() cortar una frase
		 // total.lenght obtiene la cantidad total de caracteres
		 // de 4 al final -1 = (400)
		 // parseFloat para obtener los decimales
		total		= parseFloat(total.substr(0, (total.length -1)));
		 // Solo resta sumar
		total		= total + precio;
		 // Cambiar el texto total
		$("#totalval").text(total +"€");
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