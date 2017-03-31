var mouseDown = false;

var colores = ["black", "yellow", "red", "blue", "green", "white"];
var idColor = 0;

function iniciarScript(){
	var tabla = "<table style=\"text-align:center; border-collapse:collapse;\">";
	var tablaAnchura	= 50;

	for( var i=1 ; i<=tablaAnchura ; i++ ){
		tabla += "<tr>";
			for( var j=1 ; j<=tablaAnchura ; j++ ){
				tabla += "<td onmousedown=\"ratonAbajo();colorear(this)\" onmouseover=\"colorear(this)\"></td>";
			}
		tabla += "</tr>";
	}
	tabla += "</table>";
    document.getElementsByTagName("body")[0].innerHTML = tabla;
}

function colorear(esteTD){
	if(mouseDown){
		esteTD.style.backgroundColor = colores[idColor];
	}
}

function cambioColor(){
	idColor++;
	if( idColor >= colores.length ){ idColor = 0; }
}

function ratonAbajo(){
	mouseDown = true;
}
function ratonArriba(){
	mouseDown = false;
}