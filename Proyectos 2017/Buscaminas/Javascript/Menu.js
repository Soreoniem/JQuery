var vg_menu_abrir;
var v_menu_html_config = [
	["titulo",		"Sonido"],
	["boleano",		"campo1",	"identificador1"],
	["titulo",		"Tablero"],
	["boleano",		"campo 2",	"identificador2"],
	["numerico",	"Campo 3",	"identificador3"]
];

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
	/* Usar en HTML en vez de aquí
		Comentar todo hasta donde pone: //▬▬▬▬▬[ COMENTAR HASTA AQUÍ ]▬▬▬▬▬
		
		Recomiendo ejecutar una vez el projecto y copiar directamente del navegador al html
		Añade alguna de las clases al lado de la clase "menu_fila_der":
			menu_conf_activar
			menu_conf_numerico
		
		quedaría: class="menu_fila_der menu_conf_activar"
		
		Y el subtítulo deberás ponerlo manualmente (copiar, pegar, etc. )
			dentro de .menu_contenedor
			y no dentro de la fila
	*/
	
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
				#identificador		Identificador de la fila
	*/
	
	// Primera parte del menú
	var v_menu_html = 
		"<div id=\"configuracion\"></div>"+
		"<div id=\"menu\">"+
			"<div id=\"menu_izquierda\">"+
				"<h2>Menu</h2>"+
				"<div class=\"menu_contenedor\">"
	;
	
	/* Cómo añadir datos (Array de Arrays = Matríz)
		Hueco 1 (tipo):	"titulo", "boleano", "numerico"
		Hueco 2	(nombre):	"Mi título", "mi campo"
		
		Si no son títulos:
		Hueco 3	(identificadores):	"id_de_la_Fila"
			• Sirve para poner un identificador a la fila.
			• La sentencia jquery para recuperar el dato sería:
				Boleano:	$("#identificador .boton").attr("activado");
				Numerico:	$("#identificador .dato");
	*/
	
	// Según el array crea el menú
	for( var i=0 ; i<v_menu_html_config.length ; i++ ){
		
		// Si es un título
		if( v_menu_html_config[i][0] == "titulo" ){
			v_menu_html = v_menu_html + "<div class=\"menu_subtitulo\">"+ v_menu_html_config[i][1] +"</div>";
		
		} else {
			// Si no es un título es una fila
			
			// Iniciar div de fila
			v_menu_html = v_menu_html +
				"<div id=\""+ v_menu_html_config[i][2] +"\" class=\"menu_fila\">"+
					"<div class=\"menu_fila_izq\">"+ v_menu_html_config[i][1] +"</div>"
			;
			
			// Si es de tipo boleano
			if( v_menu_html_config[i][0] == "boleano" ){
				v_menu_html = v_menu_html + "<div class=\"menu_fila_der menu_conf_activar\"></div>";
			
			// Si es de tipo numerico
			} else if( v_menu_html_config[i][0] == "numerico" ){
				v_menu_html = v_menu_html + "<div class=\"menu_fila_der menu_conf_numerico\"></div>";
			}
			
			// Cerramos el div de fila
			v_menu_html = v_menu_html + "</div>";
		}
	}
	// Cierre del menú
	v_menu_html = v_menu_html +			
				"</div>"+
			"</div>"+
		"</div>"
	;
	
	// Por último se añade el html al body
	$("body").append(v_menu_html);
	
	//▬▬▬▬▬[ COMENTAR HASTA AQUÍ ]▬▬▬▬▬
	
	// Estructura html según la clase
	
	// Activar (.menu_conf_activar)	añade 2 divs (sombra y bolita)
	// Añade el atributo "activado"
		// Si cambias el atributo: Ves a la función: f_menu_evento_activar
	$(".menu_conf_activar").append("<div><div class=\"boton\"></div></div>");
	$(".menu_conf_activar div div").attr("activado", "no");
	
	// Numerico (.menu_conf_numerico) crea 3 divs (flecha ◄, número(dato), flecha ►)
	$(".menu_conf_numerico").append("<div class=\"menu_conf_numerico_menos\"></div><div class=\"dato\">0</div><div class=\"menu_conf_numerico_mas\"></div>");
}

// Crear la configuracón predeterminada del menú
function f_menu_configuracionInicial(){
	vg_menu_abrir	= false;			// Cerrar menú
	
	$("#menu").css("width", "0%");
}