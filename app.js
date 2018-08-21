////////////////////////////////////////////////////////////////////////////

function cargarEntrada(id, operando) {
	document.getElementById(id).innerHTML =
		operando.map(bit => `
			<span class="boton-entrada ${id}">
				<label>
					<input
						type="checkbox"
						${bit == 1 ? "checked" : ""}>
					<span></span>
				</label>
			</span>
		`).join('') + "<span>--------------------------></span>"
}

function cargarSalida(bits) {
	document.getElementById('salida').innerHTML =
		bits.map(bit => 
			bit == 0
				? '<div class="lamparita apagada"  >0</div>'
				: '<div class="lamparita encendida">1</div>'
		).join('')
}

////////////////////////////////////////////////////////////////////////////

var operaciones = {
	0b00: { id: '*', fn: (x,y) => x * y },
	0b01: { id: '+', fn: (x,y) => x + y },
	0b10: { id: '-', fn: (x,y) => x - y },
	0b11: { id: '/', fn: (x,y) => Math.floor(x / y) },
}

var evaluar = (codOp, x, y) => operaciones[codOp].fn(x,y)

function obtenerBinarioDeCheckboxs(elems) {
	return Array.from(elems).map(elem => elem.checked ? 1 : 0).join('')
}

function calcular() {
	const codOpElems     = document.querySelectorAll('#codOp     label input[type="checkbox"]')
	const operando1Elems = document.querySelectorAll('.operando1 label input[type="checkbox"]')
	const operando2Elems = document.querySelectorAll('.operando2 label input[type="checkbox"]')

	const codOpStr     = obtenerBinarioDeCheckboxs(codOpElems)
	const operando1Str = obtenerBinarioDeCheckboxs(operando1Elems)
	const operando2Str = obtenerBinarioDeCheckboxs(operando2Elems)

	const codOp     = parseInt(codOpStr    , 2)
	const operando1 = parseInt(operando1Str, 2)
	const operando2 = parseInt(operando2Str, 2)

	const resultado       = evaluar(codOp, operando1, operando2)
	const resultadoCadena = Array.from(String("0000" + resultado.toString(2)).slice(-4))

	console.log(codOp, operando1, operando2)
	console.log(resultado)
	cargarSalida(resultadoCadena)
}

document.getElementById('btn-calcular').onclick = calcular

// cargar elementos
cargarEntrada('codOp'    , [0,0]    )
cargarEntrada('operando1', [0,0,0,0])
cargarEntrada('operando2', [0,0,0,0])
cargarSalida([0,0,0,0])