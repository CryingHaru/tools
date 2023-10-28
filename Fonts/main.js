let fuente = 'Arial';
const canvas = document.getElementById('imagen');
const ctx = canvas.getContext('2d');
const divt = document.getElementById('right');
const inputFuentes = document.getElementById("fuentes");
let inputId = 0;

function crearInputs() {
    const inputTexto = document.createElement('input');
    inputTexto.type = 'text';
    inputTexto.id = `texto${inputId}`;

    const inputTamanioFuente = document.createElement('input');
    inputTamanioFuente.type = 'number';
    inputTamanioFuente.step = '0.0';
    inputTamanioFuente.min = '0';
    inputTamanioFuente.max = '1000';
    inputTamanioFuente.value = '30';
    inputTamanioFuente.id = `TamanioFuente${inputId}`;
  

    const input = document.createElement('input');
    input.type = 'file';
    input.name = 'Fuentes';
    input.id = `fuentes${inputId}`;
    input.accept = '.ttf,.otf,.woff,.woff2,.zip';
    
    inputId++;
    divt.appendChild(inputTexto);
    divt.appendChild(inputTamanioFuente);
    divt.appendChild(input);
}

function llenarTexto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';;
    let y = 50; 
    const inputs = document.querySelectorAll('input[type="text"]');
    console.log(inputs);
    const fuentes = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < inputs.length; i++) {
        const TamanioFuente = fuentes[i].value;
        const input = inputs[i];
        ctx.font = TamanioFuente + 'px ' + fuente + ' Black';
        ctx.fillText(input.value, canvas.width / 2, y);
        y += Number(TamanioFuente) + 10; 
    }
}
