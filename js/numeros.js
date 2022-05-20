let sumaP = 0;
let sumaN = 0;
let mayorP = 0;
let mayorN = 0;
let numero = 1;
let cantidad = 0;

$("#enviar").on("click", function () {
	if (cantidad == 0) {
		if($("#cantidad").val() != ""){
			cantidad = $("#cantidad").val();
			$("#cantidad").prop("disabled", true);
		}
	}
	if($("#numero").val() != ""){
		if (numero <= cantidad) {
			if (parseFloat($("#numero").val()) >= 0) {
				sumaP += parseFloat($("#numero").val());
				if (parseFloat($("#numero").val()) > parseFloat(mayorP)) {
					mayorP = $("#numero").val();
				}
				var elementos = $("#positivos").html();
				$("#positivos").html(elementos + "<p>" + $("#numero").val() + "</p>");
			} else {
				sumaN += parseFloat($("#numero").val());
				if (parseFloat($("#numero").val()) < parseFloat(mayorN)) {
					mayorN = parseFloat($("#numero").val());
				}
				var elementos = $("#negativos").html();
				$("#negativos").html(elementos + "<p>" + $("#numero").val() + "</p>");
			}
			$("#numero").val("");
			numero++;
			$("#num").text(numero);
		}
		if (numero > cantidad) {
			$("#numero").prop("disabled", true);
			$("#enviar").prop("disabled", true);
			$("#cantidad").prop("disabled", false);
			$("#cantidad").val("");
		}
		$("#sumaP").text(sumaP.toFixed(4));
		$("#sumaN").text(sumaN.toFixed(4));
		$("#mayorP").text(mayorP);
		$("#mayorN").text(mayorN);
	}
});

$("#cantidad").on("change", function () {
	$("#numero").prop("disabled", false);
	sumaP = 0;
	sumaN = 0;
	mayorP = 0;
	mayorN = 0;
	numero = 1;
	cantidad = 0;
    $("#num").text(numero);
    $("#positivos").html("");
    $("#negativos").html("");
    $("#enviar").prop("disabled", false);
    $("#sumaP").text(0);
    $("#sumaN").text(0);
    $("#mayorP").text(0);
    $("#mayorN").text(0);
});
