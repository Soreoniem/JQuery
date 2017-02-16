var v_menu_abrir;

$(document).ready(function(){
	f_menu_iniciar();
	$("#configuracion").mousedown(f_menu_abrirCerrar);
	
	$("#menu")// Cerrar menú al hacer click en un lugar sin contenido
		.mousedown(f_menu_abrirCerrar)
		.children()
			.mousedown(false);
	
	$("#menu *").scroll(function(){
		console.log("altura: "+ $(this).scrollHeight);
	});
});

// Abrir o cerrar el menú
function f_menu_abrirCerrar(){
	if( v_menu_abrir == false ){
		f_menu_abrir();
	
	} else if( v_menu_abrir == true ) {
		f_menu_cerrar();
	
	// Variable no es boleana o no está definida
	} else {
		error("No se puede cambiar el estado del menu cerrado o abierto", "Abrir/Cerrar Menú")
	}
}

// Abre el menú
function f_menu_abrir(){
	v_menu_abrir = true;
	$("#menu").css("width", "100%")
	
	$("#configuracion")
		.css("top", "50px")
		.css("z-index", "11");
	
}

// Cierra el menú
function f_menu_cerrar(){
	v_menu_abrir = false;
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
	$("body").append(
		"<div id=\"configuracion\"></div>"+
		"<div id=\"menu\">"+
			"<div id=\"menu_izquierda\">"+
				"<h2>Menu</h2>"+
				"<div class=\"menu_fila\">Fila</div>"+
			"</div>"+
		"</div>"
	);
}

// Crear la configuracón predeterminada del menú
function f_menu_configuracionInicial(){
	f_menu_inicializarVariables();		// Inicializa las variables que necesita
	$("#menu").css("width", "0%");
}

// Inicializa las variables al valor predeterminado
function f_menu_inicializarVariables(){
	v_menu_abrir	= false;	// Cerrar menú
}