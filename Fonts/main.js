let fuente = 'Arial';
const canvas = document.getElementById('imagen');
const ctx = canvas.getContext('2d');
const divt = document.getElementById('rightDiv');
const inputFuentes = document.getElementById("fuentes");
let inputId = 0;
canvas.width = 800;
canvas.height = 800;
function crearInputs() {
    if (inputId < 11) {
        const inputTexto = document.createElement('input');
        inputTexto.type = 'text';
        inputTexto.id = `texto${inputId}`;

        const inputTamanioFuente = document.createElement('input');
        inputTamanioFuente.type = 'number';
        inputTamanioFuente.step = '0.0';
        inputTamanioFuente.min = '0';
        inputTamanioFuente.max = '1000';
        inputTamanioFuente.value = '40';
        inputTamanioFuente.id = `TamanioFuente${inputId}`;

        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.name = 'Fuentes';
        input.id = `fuentes${inputId}`;
        input.accept = '.ttf,.otf,.woff,.woff2,.zip';

        const label = document.createElement('label');
        label.htmlFor = `fuentes${inputId}`;
        label.innerText = `Fuente ${inputId + 1}`;

        inputId++;
        divt.appendChild(inputTexto);
        divt.appendChild(inputTamanioFuente);
        divt.appendChild(input);
        divt.appendChild(label);
        divt.appendChild(document.createElement('br'));
    }
}

function loadFont(fontFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const font = new FontFace('MyFont', e.target.result);
            font.load().then(function (loadedFont) {
                document.fonts.add(loadedFont);
                resolve('MyFont');
            }).catch(function (error) {
                reject(error);
            });
        };
        reader.readAsArrayBuffer(fontFile);
    });
}
// Function to render text with a specific font
function renderText(input, TamanioFuente, font, y) {
    ctx.font = `${TamanioFuente}px ${font}`;
    const text = input.value;
    const textMetrics = ctx.measureText(text);
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    
    // Adjust y position based on font size
    const adjustedY = y + Number(TamanioFuente);
    
    ctx.fillText(text, canvas.width / 2, adjustedY);
    
    console.log(adjustedY);
    console.log(TamanioFuente);
    console.log(text);
    console.log(textHeight);
    return adjustedY + textHeight;
}

async function llenarTexto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    let y = 50; // Inicializa la posición vertical.

    const inputs = document.querySelectorAll('input[type="text"]');
    const fuentes = document.querySelectorAll('input[type="number"]');
    const fontFiles = document.querySelectorAll('input[type="file"]');

    const fonts = [];

    for (let i = 0; i < fontFiles.length; i++) {
        const TamanioFuente = fuentes[i].value;
        const input = inputs[i];
        const fontFile = fontFiles[i].files[0];

        try {
            const font = await loadFont(fontFile);
            fonts.push(font);
        } catch (error) {
            console.log('Error loading font: ' + error);
            fonts.push('Arial'); // Usar Arial como respaldo en caso de error.
        }
    }

    for (let i = 0; i < inputs.length; i++) {
        const TamanioFuente = fuentes[i].value;
        const input = inputs[i];
        const font = fonts[i]; // Obtener la fuente correspondiente.

        // Dibuja el texto y obtén su métrica de altura.
       
        y = renderText(input, TamanioFuente, font, y);
    }
}



function downloadcanvas() {
      var dataURL = canvas.toDataURL('image/png');
     const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'Fuentes.png';
    a.click();
};


