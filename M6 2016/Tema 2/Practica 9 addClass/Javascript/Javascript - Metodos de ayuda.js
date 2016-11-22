/**
 Metodos de ayuda versión: 2.4
 © Copyright 2058, JuanLu Corp.
 */
// Math.* w3schools		→ w3schools.com/js/js_math.asp
// Typeof				→ developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/typeof

/* ╔═══♦ Acciones con ratón y teclas ♦═══╗

	✪ No seleccionar	→ <body onselectstart="return false"  ondragstart="return false">

	✪ Saber el botón pulsado: event.which
		event.which == 1 → Botón Izquierdo
		event.which == 2 → Botón Central
		event.which == 3 → Botón Derecho

	✪ Detectar tecla w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode2
		event.which = 13

*/

/* ╔═══♦ INFO: Metodos ♦═══╗

__Metodos__
 	✪ alinearImagen_Horizontal│alinearImagen_Horizontal│alinearImagen = function( imagen )
		► imagen	▬ (<etiqueta/>)	debe pasarse un tag de imagen de Jquery.

		📖 Ejemplo:	 activarDesactivar_Forzar( $("#cabecera img") );

		NOTA:
			1. Horizontal:	Centra la imagen en Horizontal.
			2. Vertical:	Centra la imagen Verticalmente.
			2. Normal:		Centra la imagen Vertical y Horizontalmente.
 */
 
// ╔═══♦ Ejecutar ♦═══╗
/**
	Inicializa Jquery
*/
$(document).ready(function(){
	// Comentar: DesActivar
	// DesComentar: Activar
	
	/* Iniciar el Gif de carga (imagen)
		// Metodos para usarlo
			// • imagenCarga(); para mostrar/ocultar el gif.
		iniciarConfiguraciónGIFCarga();
	// */
});


// ╔═══♦ Variables (html) ♦═══╗

	// Crea una tabulación
	TAB = "<span style=\"padding-left:2em;\"></span>";
	
	// Crea un nuevo espacio de línea
	ENTER = "<br/>";


// ╔═══♦ Metodos ♦═══╗


/* ✪ remCookie( "variable" )
		► "variable"	▬ (String)	Nombre de la variable cookie a eliminar.
	
	INFO: Elimina una variable cookie del navegador;
*/
function remCookie( variable ){
	// Comprueba: variable
	if( this.comprobarVariable(variable, "string") == false ){
		this.error("remCookie(<u>variable</u>)",
			"variable", variable,
			"El parametro debe ser de tipo string (texto)");}
	
	// Se actualizará la cookie con una fecha caducada para eliminarla.
	else {
		document.cookie = variable +"=; expires=Thu, 11 Jan 1992 00:00:00 UTC";
	}
}

/* ✪ setCookie( "variable", texto )
		► "variable"	▬ (String)			Nombre de la variable.
		► texto			▬ (texto a String)	Valor de la variable.

		📖 Ejemplo:	setCookie( "usuario", "Juan Luis" );
	
	INFO: Añade una nueva cookie al navegador;
*/
function setCookie( variable, texto ){
	// Comprueba: variable
	if( this.comprobarVariable(variable, "string") == false ){
		this.error("setCookie(<u>variable</u>, texto)",
			"variable", variable,
			"El parametro debe ser de tipo string (texto)");}
	
	// Se almacenará la nueva cookie
	else {
		document.cookie = variable +"="+ texto;
	}
}

/* ✪ getCookie( "variable" )
		► "variable"	▬ (String)	nombre de la variable almacenada.
		◄ return		▬ (String)	Devuelve el valor de la variable.

		📖 Ejemplo:	getCookie( "usuario" )
	
	INFO: Obtiene una cookie del navegador que esté creada;
*/
function getCookie( variable ){
	// Comprueba: variable
	if( this.comprobarVariable(variable, "string") == false ){
		this.error("getCookie(<u>variable</u>)",
			"variable", variable,
			"El parametro debe ser de tipo string (texto)");}
	
	// Se procederá a encontrar la cookie
	else {
		var nombre = variable + "=";
		var cookieArray = document.cookie.split(';');
		for( var i=0 ; i<cookieArray.length ; i++ ) {
			var c = cookieArray[i];
			
			while( c.charAt(0)==' ' ){
				c = c.substring(1);
			}
			if( c.indexOf(nombre) == 0 ) {
				return c.substring(nombre.length, c.length);
			}
		}
		// Si no se encuentra la cookie lanzará un error
		this.error("getCookie", "", variable, "La cookie no existe.");
	}
}

/* ✪ comprobarVariable( variable, "tipoVariable" )
		► variable			▬ (Variable)	Valor de la variable
		► "tipoVariable"	▬ (String)		"string", "number", "Array", "function", "object" o "undefined"
		◄ return			▬ true / false

		📖 Ejemplo:	comprobarVariable( miVariable, "string" )
	
	INFO: Comprobará si la variable coincide con el "tipoVariable"
*/
comprobarVariable = function(variable, tipoVariable){
	// Comprueba: "tipoVariable"
	if( typeof tipoVariable != "string" ){
		this.error("comprobarVariable(lugar, nombreVariable, valorVariable, <u>tipoVariable</u>, mensaje)",
			"tipoVariable", tipoVariable,
			"Necesita ser de tipo texto: \"string\", \"number\", \"boolean\", \"undefined\", etc.");}
	
	// Parametros correctos
	else {
		var resultado;
		
		// Comprobar
		if( typeof variable != tipoVariable )
		{ resultado = false; }

		else
		{ resultado = true; }

		// Comprobar si es un Array
		if(variable instanceof Array)
		{ resultado = true }

		return resultado;
	}
};

/* ✪ error( "lugar", "nombreVariable", valorVariable, "mensaje" )
		► "lugar"			▬ (String)		Lugar del error.
		► "nombreVariable"	▬ (String)		Nombre de la variable.
		► valorVariable		▬ (Variable)	Mostrará el dato erroneo.
		► "mensaje"			▬ (String)		Mensaje para el error.
		return				▬ (html)		Muestra una caja con el error.

		📖 Ejemplo:	error("nombreMetodo(<u>parametro1</u>, parametro2, parametro3, parametro4)", "miVariable", miVariable, "Mensaje de error personalizado");
	
	INFO: Mostrará al inicio del documento una caja html con el error personalizado
*/
error = function(lugar, variable, valorVariable, mensaje){
	//Comprueba: "lugar"
	if( this.comprobarVariable(lugar, "string") == false ){
		this.error("error(<u>lugar</u>, variable, valorVariable, mensaje)",
		"lugar", lugar,
		"Pasale el metodo que ha dado el error mediante texto → mifuncion( posibleParametro)");}

	//Comprueba: "variable"
	else if( this.comprobarVariable(variable, "string") == false ){
		this.error("error(lugar, <u>variable</u>, valorVariable, mensaje)",
		"variable", variable,
		"Pasale el nombre de la variable como texto → \"miVariable\"");}

	//Comprueba: "mensaje"
	else if( this.comprobarVariable(mensaje, "string") == false ){
		this.error("error(lugar, variable, valorVariable, <u>mensaje</u>)",
		"mensaje", mensaje,
		"El mensaje de error debe ser texto (algo lógico XD).");}

	// Parametros correctos.
	// Añadirá la caja con el error en la parte superior del body.
	else {
		$("body").prepend(
			"<p style=\"border: dashed 2px red; background-color: whitesmoke;\">"
			+"<b>• Error</b> en "+ lugar + this.ENTER
			+ this.TAB +"Variable: "+ variable +" = '"+ valorVariable +"'"+ this.ENTER
			+ this.TAB + "<i>"+ mensaje +"</i>"
			+"</p>"
		);
	}
};

/* ✪ nuevoAleatorio( numMin, numMax )
		► numMin	▬ (Número)	Número mínimo.
		► numMax	▬ (Número)	Número máximo.
		◄ return	▬ (Número)	Valor aleatorio de numMin a numMax.

		📖 Ejemplo:	nuevoAleatorio(1, 8);
	
	INFO: Devolverá un número aleatorio entre los 2 números.
*/
nuevoAleatorio = function(numMin, numMax){
	// Comprueba: numMin
	if( this.comprobarVariable(numMin, "number") == false ){
		this.error("nuevoAleatorio(<u>numMin</u>, numMax)",
		"numMin", numMin,
		"El primer parametro debe ser numerico");}

	// Comprueba: numMax
	else if( this.comprobarVariable(numMax, "number") == false ){
		this.error("nuevoAleatorio(numMin, <u>numMax</u>)",
		"numMax", numMax,
		"El segundo parametro debe ser numerico");}

	// Parametros correctos
	else
	{ return parseInt(Math.round(Math.random() * ((numMax - numMin +1) - 1) + numMin)); }
};

/* Este metodo debe activarse arriba en Ejecutar JQuery
	Inicializa el gif de carga para poder usarse.
	• Usa el método imagenCarga(); para mostrar u ocultar el gif.
	
	Requisitos:
		• Carpeta Imgs al lado del html.
		• cargando.gif dentro de la carpeta Imgs
*/
iniciarConfiguraciónGIFCarga = function(){
// HTML
	// Añade el dov donde se almacenará la imagen (no molesta al codigo)
	$("body").prepend(
			"<div id=\"imagenCarga\">"
			+"<img src=\"./Imgs/cargando.gif\"/>"
			+"</div>"
		)

		// Añade su código CSS
		// Aquí se cambia el CSS del gif de carga
		.append(
			"<style>"
			+"#imagenCarga {"
			+"width: 100%;"
			+"height: 100%;"
			+"background-color: rgba(255, 255, 255, 0.3);"

			+"position: absolute;"
			+"z-index: 100;"
			+"animation: blinker 1s linear infinite; }"

			+"@keyframes blinker{ 50% { opacity: 0.5; } }"

			+"#imagenCarga img{"
			+"width: 20%;"
			+"min-width: 0px;"
			+"max-width: 200px;"
			+"position: absolute;"

			+"top: 40%;"
			+"left: 40%;"
			+"border-radius: 100%; }"
			+"</style>"
		);

// Ocultar
	$("#imagenCarga, #imagenCarga img").css("opacity", "0");
	cargando = $("#imagenCarga");

// Añadir estado para ocultar
	cargando.data("estado", false)
		.css("width", "0%")
		.css("height", "0%");
};

/* ✪ imagenCarga()
		►◄ Sin parametros de entrada o salida

		📖 Ejemplo:	imagenCarga();
		
		Requisitos:
			• Es necesario activar antes la función iniciarConfiguraciónGIFCarga()
				en la parte de Iniciar Jquery (arriba).

		NOTA:
			1. (1 vez) Requiere ejecutar antes la función iniciarConfiguraciónGIFCarga().
	
	INFO: Usa esta función para Activar o DesActivar la imagen gif de carga.
*/
imagenCarga = function(){
	// Obtención de datos
	var cargando	= $("#imagenCarga");
	var cargandoImg	= $("#ImagenCarga img")
	var estado		= $("#imagenCarga").data("estado");

	// Comprobar: Si se ha iniciado antes iniciarConfiguraciónGIFCarga()
	if( estado != true && estado != false){
		this.error("imagenCarga()", "", "", "Se requiere iniciar antes el método <u> iniciarConfi</u>g<u>uraciónGIFCar</u>g<u>a() </u>");}

	else {
		// Desactivar cargando
		if(estado) {
			cargando.data("estado", false);
			// apagando
			$("#imagenCarga, #imagenCarga img").animate({
				opacity: 0
			}, 1000, function() {
				cargando.css("width", "0%")
					.css("height", "0%");
				cargandoImg.css("min-width", "0px");
			});}
		
		// Activar cargando
		else {
			cargando.data("estado", true);
			cargando.css("width", "100%")
				.css("height", "100%");
			cargandoImg.css("min-width", "100px");
			// iniciando
			$("#imagenCarga, #imagenCarga img").animate({
				opacity: 1
			}, 1500, function() {
			});
		}
	}
};

/* ✪ alertArray( titulo, [arrayDatos] )
		► titulo		▬ Título para el array.
		► [arrayDatos]	▬ (Array)	de los datos (no es una matriz).
		return			▬ (Alert)	Devuelve el Array en un alert().

		📖 Ejemplo:	imagenCarga("miTitulo", [0, "valor2", true, -2.3]);
	
	INFO: Muestra en un alert() la información que contiene la array.
*/
alertArray = function(titulo, arrayDatos){
	// Comprobar: arrayDatos
	if( comprobarVariable(arrayDatos, "Array") == false ){
		this.error("alertArray(titulo, <u>arrayDatos</u>)",
			"arrayDatos", arrayDatos,
			"La variable no es un Array.");}
	
	// Parametros correctos
	else {
		// titulo
		var imprimir = titulo + "\n┌";
		
		// línea 1
		for( var x=1 ; x<titulo.length ; x++ ){
			imprimir = imprimir + "─";
		}
		
		// array
		if( arrayDatos.length>0 ){
			for( var x=0 ; x<arrayDatos.length ; x++ ){
				imprimir = imprimir +"\n│ "+ x +" [►"+ arrayDatos[x] +"◄]";
			}
		}
		
		// línea 2
		imprimir = imprimir +"\n└";
		for( var x=1 ; x<titulo.length ; x++ ){
			imprimir = imprimir + "─";
		}
		
		// alert final
		alert(imprimir);
	}
};

/* ✪ regla3( num, otroNum, maxOtroNum )
		► num			▬ (Número)	Numero que se quiere obtener el máximo.
		► otroNum		▬ (Número)	El otro numero que sabes el máximo.
		► maxOtroNum	▬ (Número)	El máximo del otro numero.
		◄ return		▬ (Número)	Devuelve el máximo del numero objetivo.

		📖 Ejemplo:	regla3(50, 500, 200);

		NOTA:
			• Si el máximo de 500 es 200.
				el máximo de 50 es 20.
	
	INFO: Formula de la regla de 3.
*/
regla3 = function(num, otroNum, maxOtroNum){
	// Comprobar: num
	if( comprobarVariable(num, "number") == false ){
		this.error("regla3(<u>num</u>, otroNum, maxOtroNum)",
			"num", num,
			"El primer parametro no es numérico.");}
	
	// Comprobar: otroNum
	else if( comprobarVariable(otroNum, "number") == false ){
		this.error("regla3(num, <u>otroNum</u>, maxOtroNum)",
			"otroNum", otroNum,
			"El segundo parametro no es numérico.");}
	
	// Comprobar: maxOtroNum
	else if( comprobarVariable(maxOtroNum, "number") == false ){
		this.error("regla3(num, otroNum, <u>maxOtroNum</u>)",
			"maxOtroNum", maxOtroNum,
			"El tercer parametro no es numérico.");}
	
	// Parametros correctos
	else {
		return num * maxOtroNum / otroNum;
	}
}

/* ✪ regla3_100( numero, numMax )
		► numero	▬ (Número)	Numero a comprobar.
		► numMax	▬ (Número)	Número maximo que sería el 100.
		◄ return	▬ (Número)	Resultado.

		📖 Ejemplo:	regla3_100(15, 30);

		NOTA:
			1. Solo dará el número y no el signo de porcentaje(%).
			2. regla_100(15, 30) dará 50%.
	
	INFO: Es la regla de 3 pero el resultado se dará a escala de 0 a 100.
*/
regla3_100 = function(numero, numMax){
	// Comprobar: numero
	if( comprobarVariable(numero, "number") == false ){
		this.error("regla3_100(<u>numero</u>, maximo)",
		"numero", numero,
		"El primer parametro no es numérico.");}
	
	else if( comprobarVariable(numMax, "number") == false ){
		this.error("regla3Porciento(<u>numMax</u>, numero)",
		"numMax", numMax,
		"El segundo no es numérico.");}
	
	else { return numero * 100 / numMax;}
};

// !! En proceso de mejora
alinearImagen = function(tagImagen){
	alinearImagen_Horizontal(tagImagen);
	alinearImagen_Vertical(tagImagen);
};

// !! En proceso de mejora
alinearImagen_Horizontal = function(tagImagen){
	var anchoImagen = tagImagen.outerWidth();
	var anchoPadre = tagImagen.parent().width();

	// Imagen más pequeña que el padre pequeña
	if( anchoPadre > anchoImagen ){
		var margenH = ((anchoPadre - anchoImagen) /2);

		tagImagen.css("margin-left", margenH +"px");
		tagImagen.css("margin-right", margenH +"px");
	}
};

// !! En proceso de mejora
alinearImagen_Vertical = function(tagImagen){
	var altoImagen = tagImagen.height();
	var altoPadre = tagImagen.parent().height();

	// Imagen más pequeña que el padre pequeña
	if( altoPadre > altoImagen ){
		var margenV = ((altoPadre - altoImagen) /2);

		tagImagen.css("margin-top", margenV +"px");
		tagImagen.css("margin-bottom", margenV +"px");
	}
};

/** Datos de Versiones

►	Versión: 2.4
	• Metodos eliminados:
		· activarDesactivar( etiqueta );
		· activarDesactivar_Forzar( etiqueta );
			· Pensaré una mejor forma para evitar
				que el parametro sea solo con JQuery.
	
	• Metodos actualizados:
		· imprimirArray → renombrado a alertArray.
	
	• Se ha cambiado la estructura de comentarios
		· Ahora se ponen encima de cada metodo

►	Versión: 2.3.2
	• Metodos creados:
		· getCookie.
		· setCookie.
		· remCookie.

►	Versión: 2.3.1
	• Mejorada la "interfaz" del documento.

►	Versión: 2.3
	• Metodos creados:
		· alinearImagen.
		· alinearImagen_Horizontal.
		· alinearImagen_Vertical.

◄	Versión: 2.2
	• Metodos creados:
		· activarDesactivar.
		· activarDesactivar_Forzar.

◄	Versión: 2.1
	• Control de errores.
	• Eliminada lafución error(param1, param2):
	No se pueden tener 2 con diferentes parametros

◄	Versión: 2.0
	• Control de errores.
	• añadidas las funciónes:
		1. imprimirArray
		2. error version reducida
		3. regla3 y regla3Porciento
		4. Nuevo gif de carga: Ahora solo es necesario activar y usar el metodo
	(ya se incluye el CSS y HTML necesarios)
	• Añadida la funcionalidad de Array a la función comprobarVariable
*/