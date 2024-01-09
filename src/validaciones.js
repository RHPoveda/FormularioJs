const formulario = document.getElementById('formulario');

const validarCorreo = () => {
    // Expresion regular para validar un correo.
    const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // Obtenemos los inputs
    const inputCorreo = formulario['correo-receptor'];

    // Comprobamos que el nombre y correo sean correctos.
    if (!expRegCorreo.test(inputCorreo.value)) {
        inputCorreo.classList.add('formulario__input--error');
        return false;
    } else {
        inputCorreo.classList.remove('formulario__input--error');
        return true;
    }
};

const validarNombre = () => {
    // Aceptamos cualquier digito (0-9), y un punto con decimales (opcional)
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    // Obtenemos el input
    const inputNombre = formulario['nombre-receptor'];

    // Comprobamos que el nombre sea correcto.
    if (!expRegNombre.test(inputNombre.value)) {
        inputNombre.classList.add('formulario__input--error');
        return false;
    } else {
        inputNombre.classList.remove('formulario__input--error');
        return true;
    }
};

const validarCantidad = () => {
    const expRegCantidad = /^\d+(\.\d+)?$/;

    const inputCantidad = formulario.cantidad;

    // Transformamos la cantidad de una cadena de texto a numero con decimales.
    // y comprobamos si es una cantidad correcta
    if (expRegCantidad.test(inputCantidad.value)) {
        inputCantidad.classList.remove('formulario__input--error');
        return true;
    } else {
        inputCantidad.classList.add('formulario__input--error');
        return false;
    }
};

export {
    validarCantidad,
    validarCorreo,
    validarNombre
};
