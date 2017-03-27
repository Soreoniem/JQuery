$(document).ready(function(){
	// No hay enlaces por lo que molestan y envían a una página no existente
	iniciarPagina();
	// form LOGIN ► click bottom
	// form FORGOR PASSWORD ► click bottom ► click login
	$(
		"form.login .bottom .linkform,"
		+"form.forgot_password .bottom a[rel='register']"
	)
		.mousedown(function(){
			// Desactivar active a todos los formularios
			$("form").hide(450);
			setTimeout(function(){ cambiarForm("register"); }, 500);
		});
		
	// form LOGIN ► click FORGOT password
	$("form.login a[rel='forgot_password']")
		.mousedown(function(){
			$("form").hide(450);
			setTimeout(function(){ cambiarForm("forgot_password"); }, 500);
		});
		
	// form REGISTER ► click bottom
	// form FORGOR PASSWORD ► click bottom ► click login
	$(
		"form.register .bottom .linkform,"
		+"form.forgot_password .bottom a[rel='login']"
	)
		.mousedown(function(){
			$("form").hide(450);
			setTimeout(function(){ cambiarForm("login"); }, 500);
		});
})
function iniciarPagina(){
	$("form").css("transition", "ease-out 0.3s box-shadow")
	$("a").attr("href", "#");
	$("form")
		.hide()
		.removeClass("active");
	$("form.login").addClass("active");
	$("form.login").delay(300).show(450)
	efectoShadow(300);
}

function cambiarForm(formClase){
	$("form."+ formClase).hide();
	$("form").removeClass("active");
	// activar solo en el REGISTER
	$("form."+ formClase).addClass("active");
	setTimeout(function(){ $("form."+ formClase).show(450); }, 500);
	efectoShadow(400);
}
function efectoShadow(numExtra){
	setTimeout(function(){$("form").css("box-shadow", "1px 1px 57px #fff");console.log("1");}, 950 + numExtra)
	setTimeout(function(){$("form").css("box-shadow", "1px 1px 17px 10px #ccc");console.log("2");}, 1450 + numExtra)
	setTimeout(function(){$("form").css("box-shadow", "1px 1px 57px #fff");console.log("3");}, 1950 + numExtra)
	setTimeout(function(){$("form").css("box-shadow", "1px 1px 17px 10px #ccc");console.log("4");}, 2450 + numExtra)
}