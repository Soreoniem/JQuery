var vg_menu_abrir;

$(document).ready(function(){
	// iniciar la configuración del menú
	f_menu_iniciar();
	
	// Click en el icono para abrir el menú
	$("#configuracion").mousedown(f_menu_abrirCerrar);
	
	// Click en el menú
	// • devolver false para evitar cerrar el menú en los hijos (contenido)
	$("#menu")// Cerrar menú al hacer click en un lugar sin contenido
		.mousedown(f_menu_abrirCerrar)
		.children()
			.mousedown(false);
	
	f_menu_eventos();
});

// Eventos del menú
function f_menu_eventos(){
	f_menu_evento_activar();
	f_menu_evento_numerico();
}

// Eventos del tipo numerico (◄ 10 ►)
function f_menu_evento_numerico(){
	f_menu_evento_numerico_mas();
	f_menu_evento_numerico_menos();
}

// Evento botón más ►
function f_menu_evento_numerico_mas(){
	// Si haces click en más
	$(".menu_conf_numerico_mas").mousedown(function(){
		// Obtiene el número y le súma
		
		// Este botón → div anterior → obtener texto
		var numero = parseInt($(this).prev("div").text());
		// Este botón → div anterior → cambiar dato
		$(this).prev("div").text(numero +1);
	});
}

// Evento botón menos ◄
function f_menu_evento_numerico_menos(){
	// Si haces click en menos
	$(".menu_conf_numerico_menos").mousedown(function(){
		// Obtiene el número y le resta
		
		// Este botón → div siguiente → obtener texto
		var numero = parseInt($(this).next("div").text());
		// Este botón → div siguiente → cambiar dato
		$(this).next("div").text(numero -1);
	});
}

// Eventos del tipo activar (botón boleano)
function f_menu_evento_activar(){
	// Evento Click en el primer div (contenedor el botón)
	$(".menu_conf_activar div").mousedown(function(){
		// Encuentra el botón (div hijo) y lo guarda en la variable boton
		var boton	= $(this).find("div");
		// Obtiene el atributo
		var activacion = boton.attr("activado");
		
		// Si no está activado
		if(activacion == "no"){
			boton
				.attr("activado", "si")
				.css("margin-left", "60%")
			;
		} else {
			// Desactiva el botón
			// Cambia la posición del boton
			boton
				.attr("activado", "no")
				.css("margin-left", "5%")
			;
		}
	});
}

// Abrir o cerrar el menú
function f_menu_abrirCerrar(){
	if( vg_menu_abrir == false ){
		f_menu_abrir();
	
	} else if( vg_menu_abrir == true ) {
		f_menu_cerrar();
	
	// Variable no es boleana o no está definida
	} else {
		error("No se puede cambiar el estado del menu cerrado o abierto", "Abrir/Cerrar Menú")
	}
}

// Abre el menú
function f_menu_abrir(){
	vg_menu_abrir = true;
	$("#menu").css("width", "100%")
	
	$("#configuracion")
		.css("top", "50px")
		.css("z-index", "11");
	
}

// Cierra el menú
function f_menu_cerrar(){
	vg_menu_abrir = false;
	$("#menu").css("width", "0%");
	
	$("#configuracion")
		.css("top", "0px")
		.css("z-index", "1");
}

// Inicializa el menú
function f_menu_iniciar(){
	f_menu_añadirMenu();
	f_menu_configuracionInicial();
}

// Añadir el html del menú
function f_menu_añadirMenu(){
	/*	Cambiar estilo
		
		Añade alguna de estas clases a la fila derecha: (class="menu_fila_der" ► class="menu_fila_der menu_conf_activar")
			menu_conf_activar
			menu_conf_numerico
		
		menu_conf_activar:	Pone ub botón boleano (si / no)
		menu_conf_numerico:	Añade 2 flechas: Izquierda (◄) para reducir y Derecha (►) para aumentar el número
	*/
	// Puedes crear el menú así o tenerlo puesto en el html
	/*
		Atributos (class e id):
			• Necesarios:
				#configuracion		Botón de abrir y cerrar menú
				#menu				Contenedor del menú
				#menu_izquierda		Area que NO contiene datos
				h2					Título principal del menú
				.menu_contenedor	Contenedor del menú	(debajo del título)
			
			• Opcionales:
				.menu_subtitulo		Un separador con título
				.menu_fila			Necesaria para crear una nueva fíla
				.menu_fila_izq		Parte izquierda (información)
				.menu_fila_der		Parte derecha	(edición)
				#identificador1		Aconsejo poner aquí el identificador
					la sentencia jquery sería: $("#identificador .dato")
				
	*/
	$("body").append(
		"<div id=\"configuracion\"></div>"+
		"<div id=\"menu\">"+
			"<div id=\"menu_izquierda\">"+
				"<h2>Menu</h2>"+
				"<div class=\"menu_contenedor\">"+
					
					"<div class=\"menu_subtitulo\">Sonido</div>"+
					"<div id=\"identificador1\" class=\"menu_fila\">"+
						"<div class=\"menu_fila_izq\">Sonido</div>"+
						
						"<div class=\"menu_fila_der menu_conf_activar\"></div>"+
					
					"</div>"+
					
					"<div id=\"identificador2\" class=\"menu_fila\">"+
						"<div class=\"menu_fila_izq\">Sonido 2</div>"+
						"<div class=\"menu_fila_der menu_conf_activar\"></div>"+
					"</div>"+
					
					"<div class=\"menu_subtitulo\">Tablero</div>"+
					"<div id=\"identificador3\" class=\"menu_fila\">"+
						"<div class=\"menu_fila_izq\">Anchura</div>"+
					
						"<div class=\"menu_fila_der menu_conf_numerico\"></div>"+
					
					"</div>"+
					"<div id=\"identificador4\" class=\"menu_fila\">"+
						"<div class=\"menu_fila_izq\">Altura</div>"+
						
						"<div class=\"menu_fila_der menu_conf_numerico\"></div>"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</div>"
	);
	
	// Estructura html según la clase
	
	// Activar (.menu_conf_activar)	añade 2 divs (sombra y bolita)
	// Añade el atributo "activado"
		// Si cambias el atributo: Ves a la función: f_menu_evento_activar
	$(".menu_conf_activar").append("<div><div></div></div>");
	$(".menu_conf_activar div div").attr("activado", "no");
	
	// Numerico (.menu_conf_numerico) crea 3 divs (flecha ◄, número(dato), flecha ►)
	$(".menu_conf_numerico").append("<div class=\"menu_conf_numerico_menos\"></div><div class=\"dato\">0</div><div class=\"menu_conf_numerico_mas\"></div>");
}

// Crear la configuracón predeterminada del menú
function f_menu_configuracionInicial(){
	vg_menu_abrir	= false;			// Cerrar menú
	
	$("#menu").css("width", "0%");
}