const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const botonEncriptar = document.querySelector('.btn-encriptar');
const botonDesencriptar = document.querySelector('.btn-desencriptar');
const botonCopiar = document.querySelector('.btn-copiar');
const seccionMensaje = document.getElementById('seccionMensaje');

function verificarTexto1() {
    const texto1 = textArea.value;

    // Verificar si hay caracteres acentuados en el texto
    const matrizAcentos = /[áäâàãéëêèẽíïîìĩóöôòõúüûùũ]/;
    const tieneAcentos = matrizAcentos.test(texto1);

    // Mostrar mensaje si existen acentos
    //const mensaje = document.querySelector('.mensaje');

    if (textArea.value.trim() === "") {
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
        mensaje.style.backgroundImage = 'url("imagen/no-texto.png")';
    }
    else if (tieneAcentos) {
        mensaje.style.backgroundImage = 'url("imagen/no-acentos.png")';
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
    } else {
        mensaje.style.backgroundImage = 'url("imagen/r-no-acentos.png")';
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
        botonCopiar.disabled = true;
        mensaje.value = ""
    }
}

function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value)
    mensaje.value = textoEncriptado
    textArea.value = "";
    mensaje.style.backgroundImage = "none"
    deshabilitarBotones();
    irASeccion();
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0]))
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
    }
    return stringEncriptada
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value)
    mensaje.value = textoDesencriptado
    textArea.value = "";
    mensaje.style.backgroundImage = "none"
    deshabilitarBotones();
    irASeccion();
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1]))
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
    }
    return stringDesencriptada
}

function deshabilitarBotones() {
    if (textArea.value.trim() === "") {
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
        botonCopiar.disabled = false;
    } else {
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
        botonCopiar.disabled = true;
    }
}
function deshabilitarBoton() {
    if (mensaje.value.trim() === "") {
        botonCopiar.disabled = true;
    } else {
        botonCopiar.disabled = false;
    }
}

function copiarTexto() {
    // Obtener el texto del textarea
    const texto2 = mensaje.value;

    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(texto2)
        .then(() => {
            console.log("Texto copiado al portapapeles: " + texto2);
            mensaje.style.backgroundImage = 'url("imagen/text-copiado.png")';
            mensaje.value = "";
            deshabilitarBoton();
        })
        .catch((error) => {
            console.error("Error al copiar al portapapeles: ", error);
            mensaje.style.backgroundImage = 'url("imagen/text-no-copiado.png")';
            deshabilitarBoton();
        });
};

function irASeccion() {
    const seccionMensaje = document.getElementById('seccionMensaje');
    if (seccionMensaje) {
      seccionMensaje.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
  