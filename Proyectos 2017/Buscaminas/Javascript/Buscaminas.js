var unaVez = true;
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

var v_buscaminas_minas_total		= 0;
var v_buscaminas_minas_aseguradas	= 0;

var v_buscaminas_banderas			= 0;

var v_buscaminas_estado			= "jugar";	// jugar, ganar, perder

$(document).ready(function(){
	f_buscaminas_configuracion_inicial();
	// LOOL: Crear evento aceptar en el menú (crear buscaminas y tamaño: reemplazar buscaminas actual)
	// actualizar info y reemplazar buscaminas
	f_buscaminas();
});

// Crea un nuevo juego de Buscaminas con los parametros actuales
function f_buscaminas(){
	
	// Prepara las variables como el tablero (matriz)
	f_buscaminas_datos_crear();
	
	f_buscaminas_datos_añadir();
	// Crear tablas
	f_buscaminas_mostrar_tabla();
	
	// Añadir datos
	// Jugar
}

function f_buscaminas_mostrar_tabla(){
	var tabla =
		"<table>"+
			"<caption><img src=\""+ imagenes["inicial"] +"\"/></caption>"+
			"<tbody>"
	;
	
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		tabla = tabla + "<tr>";
			for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
				tabla = tabla +"<td y=\""+ (y +1) +"\" x=\""+ (x +1) +"\"><img src=\""+ imagenes["normal"] +"\"/></td>";
			}
		tabla = tabla + "</tr>";
	}
	
	var tabla = tabla +
			"</tbody>"+
		"</table>"
	;
	
	$("#buscaminas").append(tabla);
}

// Añade la información a los tableros
function f_buscaminas_datos_añadir(){
	// Tabla: Bombas (-1)
	f_buscaminas_datos_añadir_bombas(v_buscaminas_tablero_datos);
	
	// Tabla: Números (0-8)
	f_buscaminas_datos_añadir_numeros(v_buscaminas_tablero_datos);
	
	// Tabla: Areas (mayor o igual a 10)
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
	
	var areas	= 9;
	var infoAlrededor_datos;
	var infoAlrededor_areas;
	// Siguiente: Llenar las areas
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			infoAlrededor_datos	= f_buscaminas_obtener_tablero_info_alrededor(v_buscaminas_tablero_datos, y, x);
			infoAlrededor_areas	= f_buscaminas_obtener_tablero_info_alrededor(v_buscaminas_tablero_areas, y, x);
			
			// Identificar hay una zona vacía
			if( infoAlrededor_datos[5] == 0 ){
				// No se le ha asignado area
				if( infoAlrededor_areas[5] == 0 ){
					// Es una nueva area
					areas++;
					// Asignar una nueva area y asignar el area alrededor de si mismo
					// (afectará a las casillas vacías y con números pero no a las minas)
					for( var i=1 ; i<infoAlrededor_areas.length ; i++ ){
						if( infoAlrededor_datos[i] != null ){
							f_buscaminas_insertar_tablero_dato_enCoordenada(v_buscaminas_tablero_areas, y, x, i, areas);
						}
					}
				
				// Tiene un area asignada
				} else {
					// Por defecto no une las areas que estén pegadas
					var unirAreas = "no";
					// Hay que unir las areas si hay más de una alrededor (casilla Central == la actual == infoAlrededor_areas[5])
					// Evitar:
					//	0:		Lugar sin area
					//	i != 5:	Por precaución ignorar la casilla Central
					// null:	Array fuera de rango de datos
					for( var i=1 ; i<infoAlrededor_areas.length ; i++ ){
						if( infoAlrededor_areas[i] != 0 && infoAlrededor_areas[i] != infoAlrededor_areas[5] && infoAlrededor_areas[i] != null ){
							unirAreas = infoAlrededor_areas[i];
						}
					}
					
					// Si es diferente de "no" es que hay que unir las areas (areas contigüas)
					if( unirAreas != "no" ){
						// Recorrer toda la matriz de las areas
						for( var i=0 ; i<v_buscaminas_altura ; i++ ){
							for( var j=0 ; j<v_buscaminas_anchura ; j++ ){
								// Si encuentras la nueva area cambiala por la casilla actual (casilla Central)
								if( v_buscaminas_tablero_areas[i][j] == unirAreas ){
									v_buscaminas_tablero_areas[i][j] = infoAlrededor_areas[5];
								}
							}
						}
					
					// No hay que unir areas (asignación normal)
					} else {
						// recorrer las areas e insertar alrededor la información.
						// Excepto si son null que están fuera de la matriz de datos
						for( var i=1 ; i<infoAlrededor_areas.length ; i++ ){
							if( infoAlrededor_datos[i] != null ){
								f_buscaminas_insertar_tablero_dato_enCoordenada(v_buscaminas_tablero_areas, y, x, i, infoAlrededor_areas[5]);
							}
						}
					}
				}
			}
		}
	}
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
	for( var i=0 ; i<obtenerInfo.length ; i++ ){
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
						f_buscaminas_insertar_tablero_dato_enCoordenada(p_tablero, y, x, i, "++");
					}
				}
			}
		}
	}
	v_buscaminas_banderas	= v_buscaminas_minas_total;
}

// La coordenada la pueden pasar por número o por frase
/* __ Parametros __
	p_tablero:		Matriz a insertar el dato
	p_y:			Coordenada Y (coordenada que sube o baja filas)
	p_x:			Coordenada X (coordenada que cambia de columna)
	p_coordenada:	Explicado abajo (_ Coordenadas _)
	p_insertar:		1. Dato a insertar
					2. Si es "++" aumentará 1
*/
/* __ Coordenadas __
	NOTA: 5 == Centro
	Número:
		7 8 9
		4 5 6
		1 2 3
	
	Frase:
		NorOeste	Norte	NorEste
		Oeste		Centro	Este
		SurOeste	Sur		SurEste
*/
function f_buscaminas_insertar_tablero_dato_enCoordenada(p_tablero, p_y, p_x, p_coordenada, p_insertar){
	
	// Si el insertar es "++" quiere decir que solo quiere aumentar en esa dirección
	if(p_insertar == "++"){// LOOOOOOOOOOOOOOOL
		switch(p_coordenada){
			case "NorOeste":	case 7: p_tablero[p_y -1]	[p_x -1]++;	break;
			case "Norte":		case 8: p_tablero[p_y -1]	[p_x]++;	break;
			case "NorEste":		case 9: p_tablero[p_y -1]	[p_x +1]++;	break;
			case "Oeste":		case 4: p_tablero[p_y]		[p_x -1]++;	break;
			case "Centro":		case 5: p_tablero[p_y]		[p_x]++;	break;
			case "Este":		case 6: p_tablero[p_y]		[p_x +1]++;	break;
			case "SurOeste":	case 1: p_tablero[p_y +1]	[p_x -1]++;	break;
			case "Sur":			case 2: p_tablero[p_y +1]	[p_x]++;	break;
			case "SurEste":		case 3: p_tablero[p_y +1]	[p_x +1]++;	break;
		}
	
	// De lo contrario insertaré el dato pasado
	} else {
		switch(p_coordenada){
			case "NorOeste":	case 7: p_tablero[p_y -1]	[p_x -1]	= p_insertar; break;
			case "Norte":		case 8: p_tablero[p_y -1]	[p_x]		= p_insertar; break;
			case "NorEste":		case 9: p_tablero[p_y -1]	[p_x +1]	= p_insertar; break;
			case "Oeste":		case 4: p_tablero[p_y]		[p_x -1]	= p_insertar; break;
			case "Centro":		case 5: p_tablero[p_y]		[p_x]		= p_insertar; break;
			case "Este":		case 6: p_tablero[p_y]		[p_x +1]	= p_insertar; break;
			case "SurOeste":	case 1: p_tablero[p_y +1]	[p_x -1]	= p_insertar; break;
			case "Sur":			case 2: p_tablero[p_y +1]	[p_x]		= p_insertar; break;
			case "SurEste":		case 3: p_tablero[p_y +1]	[p_x +1]	= p_insertar; break;
		}
	}
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
	v_buscaminas_tablero_imagenes	= f_buscaminas_obtener_tablero_vacio();
	v_buscaminas_tablero_areas		= f_buscaminas_obtener_tablero_vacio();
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