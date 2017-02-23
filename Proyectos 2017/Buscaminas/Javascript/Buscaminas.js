/*
	• Detector por sonido
*/

// Configuración predeterminada
var v_buscaminas_anchura		= 10;
var v_buscaminas_altura			= 10;

var v_buscaminas_dificultad		= 10;

// Números: 0-8(minas alrededor), -1 (mina)
var v_buscaminas_tablero_datos;
// Areas: 10 hacia arriba
var v_buscaminas_tablero_areas;
var v_buscaminas_tablero_imagenes;

var v_buscaminas_minas_total		= 0;
var v_buscaminas_minas_aseguradas	= 0;

var v_buscaminas_banderas			= 0;

var v_buscaminas_estado			= "jugar";	// jugar, ganar, perder

$(document).ready(function(){
	f_buscaminas_configuracion_inicial();
	
	f_buscaminas();
});

// Crea un nuevo juego de Buscaminas con los parametros actuales
function f_buscaminas(){
	
	// Prepara las variables como el tablero (matriz)
	f_buscaminas_datos_crear();
	
	f_buscaminas_datos_añadir();
	// Crear tablas
	// Añadir datos
	// Jugar
}

// Añade la información a los tableros
function f_buscaminas_datos_añadir(){
	// Restante: Números, Areas, Imágenes
	// Bombas (-1)
	f_buscaminas_datos_añadir_bombas(v_buscaminas_tablero_datos);
	
	// Números (0-8)
	f_buscaminas_datos_añadir_numeros(v_buscaminas_tablero_datos);
	
	// Areas
	f_buscaminas_datos_añadir_areas();
}

// Añade las areas a la tabla (necesita la tabla creada etc.)
function f_buscaminas_datos_añadir_areas(){
	// Reiniciar las areas 0
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			v_buscaminas_tablero_areas[y][x] = 0;
		}
	}
	
	// Siguiente: Llenar las areas
}

function f_buscaminas_obtener_tablero_info_alrededor(p_tablero, p_y, p_x){
	/*
		El array se forma a partir de las coordenadas.
		Se imagina que el número 5 es el centro (la casilla del tablero por la que se llama a esta función) (teclado numérico derecho)
		7 8 9
		4[5]6
		1 2 3
		Y el 0 se usa para saber en que lugar se encuentra:
		Norte:	Linea 0
		Sur:	Última línea
		Oeste:	Columna 0
		Este:	Última columna
		NorEste, SurEste, SurOeste, NorOeste:	Esquinas
		Centro: No se encuentra en ningún límite (Ni equinas ni paredes)
		
		Si es null quiere decir que no hay datos en esa dirección
	*/
	var infoAlrededor	= [null, null, null, null, null, null, null, null, null, null];
	var obtenerInfo;
	
	// Detectar si está en un borde
	if( p_x==0
		|| p_y==0
		|| p_x==(v_buscaminas_anchura -1)
		|| p_y==(v_buscaminas_altura -1)
	){
	// ___Esquinas___
		// esquina: NorEste
		if( p_x==(v_buscaminas_anchura -1) && p_y==0 ){
			obtenerInfo			= [2, 1, 4];
			infoAlrededor[0]	= "NorEste";
		
		// esquina: SurEste
		} else if( p_x==(v_buscaminas_anchura -1) && p_y==(v_buscaminas_altura -1) ){
			obtenerInfo			= [8, 4, 7];
			infoAlrededor[0]	= "SurEste";
		
		// esquina: SurOeste
		} else if( p_x==0 && p_y==(v_buscaminas_altura -1) ){
			obtenerInfo			= [8, 9, 6];
			infoAlrededor[0]	= "SurOeste";
		
		// esquina: NorOeste
		} else if( p_x==0 && p_y==0 ){
			obtenerInfo			= [6, 3, 2];
			infoAlrededor[0]	= "NorOeste";
		
	// ___Paredes___
		// pared: Norte
		} else if( p_y==0 ){
			obtenerInfo			= [6, 3, 2, 1, 4];
			infoAlrededor[0]	= "Norte";
		
		// pared: Este
		} else if( p_x==(v_buscaminas_anchura -1) ){
			obtenerInfo			= [8, 2, 1, 4, 7];
			infoAlrededor[0]	= "Este";
		
		// pared: Sur
		} else if( p_y==(v_buscaminas_altura -1) ){
			obtenerInfo			= [8, 9, 6, 4, 7];
			infoAlrededor[0]	= "Sur";
		
		// pared: Oeste
		} else if( p_x==0 ){
			obtenerInfo			= [8, 9, 6, 3, 2];
			infoAlrededor[0]	= "Oeste";
		}
	
	// Centro
	} else {
		obtenerInfo			= [8, 9, 6, 3, 2, 1, 4, 7];
		infoAlrededor[0]	= "Centro";
	}
	
	// Se obtienen los datos a partir de la tabla
	for( var i=0 ; i<=obtenerInfo.length ; i++ ){
		switch(obtenerInfo[i]) {
			case 8: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y -1]	[p_x];		break;
			case 9: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y -1]	[p_x +1];	break;
			case 6: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y]	[p_x +1];	break;
			case 3: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y +1]	[p_x +1];	break;
			case 2: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y +1]	[p_x];		break;
			case 1: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y +1]	[p_x -1];	break;
			case 4: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y]	[p_x -1];	break;
			case 7: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y -1]	[p_x -1];	break;
		}
	}
	
	// Por último
	infoAlrededor[5]	= p_tablero[p_y][p_x];
	
	// Devuelve la tabla.
	// Todo null excepto los valores de alrededor
	// y la posición 0 para indicar el lugar en el que se encuentra.
	return infoAlrededor;
}

// 1. Identificar la bomba
// 2. Aumentar el número en cada dirección (8 direcciones)
// 2.1. No aumentar si hay una bomba (bomba: -1)
function f_buscaminas_datos_añadir_numeros(p_tablero){
	// Tablero
	var infoAlrededor;
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			infoAlrededor	= f_buscaminas_obtener_tablero_info_alrededor(p_tablero, y, x);
			
			// 1. Identificar la bomba
			if( infoAlrededor[5] == (-1) ){
				// Aumentar número total de bombas
				v_buscaminas_minas_total++;
				
				// Observa los alrededores
				for( var i=1 ; i<infoAlrededor.length ; i++ ){
					
					// Aumentar el número si es diferente de: Bomba o null(pared)
					if(infoAlrededor[i] != (-1)
						&& infoAlrededor[i] != null){
						
						// Segun la posición:
						// 7 8 9
						// 4[5]6
						// 1 2 3
						// Aumentar en esa dirección (5 es el centro)
						// Como el 5 es -1 que es una bomba, nunca entrará por aquí
						switch(i) {
							case 8: p_tablero[y -1]	[x]++;		break;
							case 9: p_tablero[y -1]	[x +1]++;	break;
							case 6: p_tablero[y]	[x +1]++;	break;
							case 3: p_tablero[y +1]	[x +1]++;	break;
							case 2: p_tablero[y +1]	[x]++;		break;
							case 1: p_tablero[y +1]	[x -1]++;	break;
							case 4: p_tablero[y]	[x -1]++;	break;
							case 7: p_tablero[y -1]	[x -1]++;	break;
						}
					}
				}
			}
		}
	}
	v_buscaminas_banderas	= v_buscaminas_minas_total;
}

// Según el tablero pasado le añade las bombas
function f_buscaminas_datos_añadir_bombas(p_tablero){
	// Recorre todo el tablero añadiendo o no una bomba por celda.
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			p_tablero[y][x]	= f_buscaminas_bomba_añadir();
		}
	}
}

function f_buscaminas_bomba_añadir(){
	// 5% → muy fácil
	// 8% → fácil
	var alea = aleatorio(1, 100);
	
	if( 1<=alea && alea<=v_buscaminas_dificultad ){
		return (-1);
	} else {
		return 0;
	}
}

// Prepara los datos del buscaminas antes de añadir los datos
// Es necesari preparar el tablero con la nueva configuración
function f_buscaminas_datos_crear(){
	// crear tablas de datos e imagenes
	v_buscaminas_tablero_datos		= f_buscaminas_obtener_tablero_vacio();
	v_buscaminas_tablero_imagenes	= v_buscaminas_tablero_datos;
	v_buscaminas_tablero_areas		= v_buscaminas_tablero_datos;
}

// Crea la plantilla de los tableros
function f_buscaminas_obtener_tablero_vacio(){
	
	// creamos la anchura del tablero
	var tablero = new Array(v_buscaminas_anchura);
	
	// y ahora las filas
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		tablero[y]	= new Array(v_buscaminas_altura);
	}
	
	// Devolvemos el tablero creado vacío
	return tablero;
}

function f_buscaminas_configuracion_inicial(){
	f_buscaminas_configuracion_inicial_menu();
	f_buscaminas_configuracion_inicial_estructura();
	
}

// Crea la estructura inicial del Buscaminas
function f_buscaminas_configuracion_inicial_estructura(){
	$("body").append(
		"<h1>Buscaminas</h1>"+
		"<div id=\"buscaminas\"></div>"
	);
}

// Actualizar datos iniciales del menú
function f_buscaminas_configuracion_inicial_menu(){
	$("#menu_anchura .dato").text(v_buscaminas_anchura);
	$("#menu_altura .dato").text(v_buscaminas_altura);
	$("#menu_dificultad .dato").text(v_buscaminas_dificultad);
}