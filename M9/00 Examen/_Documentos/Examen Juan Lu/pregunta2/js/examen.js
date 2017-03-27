$(document).ready(function(){
	ocultar();
	
	$("#tipoauto").change(function(){
		var vehiculo = $(this).find("input:checked").val();
		
		ocultar();
		( vehiculo == "Compacto" )?		$("#chkizquierda1").show()
		: ( vehiculo == "Mediano" )?	$("#chkizquierda2").show()
		: ( vehiculo == "Camioneta" )?	$("#chkizquierda3").show()
		:
		false;
	});
	$("input").mousedown(function(){
		var id_input = $(this).attr("id");
		var palabra = $(this).attr("id").substr(3, $(this).attr("id").length);
		
		if( id_input.substr(0, 3) == "rbt"
			&& $(this).parent().attr("id") != "tipoauto" ){
				
			mostrarVehiculo(palabra);
			
		}
	});
	
	// Con esto puede funcionar las busquedas por nombre de vehículo
	$("#txtnom").on("input", function(){
		ocultar();
		var nombre = $(this).val();
		$("#fondo div").each(function(){
			//*
			if( $(this).attr("id").substr(0, 12) == "datosderecha"
				&& nombre.length >= 3 ){
				var vehiculo = $(this).find("center").find("b").text();
				if( vehiculo.toLowerCase().indexOf(nombre.toLowerCase()) != -1 ){
					$(this).show();
				}
			}
			// */
		});
	});
});

function mostrarVehiculo(vehiculo){
	vehiculo = vehiculo.toLowerCase();
	// id mal escrita
	if( vehiculo == "cavalier" ){
		vehiculo = "camaro";
	} else if( vehiculo == "cheyenne" ){
		vehiculo = "pickup";
	}
	ocultar("derecha");
	$("img[src=\"./img/"+ vehiculo.toLowerCase() +".png\"]").parent().show();
}

function ocultar(posicion){
	for( i=1 ; i<10 ; i++ ){
		if(posicion != "derecha"){
			$("#chkizquierda"+ i).hide();
		}
		if(posicion != "izquierda"){
			$("#datosderecha"+ i).hide();
		}
	}
}

	function resetchkizquierda(){
        for(var i=1;i<4;i++){
          var id ='#chkizquierda'+i;
          $(id).hide();
        }
      };
      function resetdatosderecha(){
        for(var i=1;i<10;i++){
          var id='#datosderecha'+i;
          $(id).hide();
        }
      };
