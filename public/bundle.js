'use strict';

const marcarPaso = (paso) => {
    document
        .querySelector(`.linea-pasos [data-paso="${paso}"] .linea-pasos__paso-check`)
        .classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = () => {
    const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

    // Obtenemos el index del paso activo.
    const indexPasoActivo = pasos.indexOf(pasoActivo);

    // Comprobamos si hay mas pasos.
    if (indexPasoActivo < pasos.length - 1) {
        // Se elimina clase activo
        pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');
        // Se coloca clase del check
        pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');

        // Mostramos el siguiente elemento.
        const id = pasos[indexPasoActivo + 1].dataset.paso;

        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
        });
    }
};

const formulario$1 = document.getElementById('formulario');

const validarCorreo = () => {
    // Expresion regular para validar un correo.
    const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // Obtenemos los inputs
    const inputCorreo = formulario$1['correo-receptor'];

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
    const inputNombre = formulario$1['nombre-receptor'];

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

    const inputCantidad = formulario$1.cantidad;

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

const formulario = document.getElementById('formulario');

// Reiniciando scroll al cargar el formulario.
formulario.querySelector('.formulario__body').scrollLeft = 0;

// Eventlistener para comprobar los campos de formulario cuando el usuario corrige.
formulario.addEventListener('keyup', (e) => {
    if (e.target.tagName === 'INPUT') {
        if (e.target.id === 'cantidad') {
            validarCantidad();
        } else if (e.target.id === 'nombre-receptor') ; else if (e.target.id === 'correo-receptor') ;
    }
});

const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault();

    // Validamos el paso actual.
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    if (pasoActual === 'cantidad') {
        if (validarCantidad()) {
            marcarPaso('cantidad');
            siguientePaso();
        }
    } else if (pasoActual === 'datos') {
        if (validarNombre() && validarCorreo()) {
            marcarPaso('datos');
            siguientePaso();
        }
    } else if (pasoActual === 'metodo') {
        marcarPaso('metodo');

        const opciones = { style: 'currency', currency: 'NIO' };
        const formatoMoneda = new Intl.NumberFormat('es-NI', opciones);

        // Obtenemos los valores del formulario y los pasamos a la seccion de confirmar.
        document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(
            formulario.cantidad.value
        );

        document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
        document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
        document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;

        // Cambiamos el texto del btn a 'Transferir'
        btnFormulario.querySelector('span').innerText = 'Transferir';

        // Agregamos la clase que deshabilita el boton.
        btnFormulario.classList.add('formulario__btn--disabled');

        // Ocultamos el icono de siguiente.
        btnFormulario
            .querySelector('[data-icono="siguiente"]')
            .classList.remove('formulario__btn-contenedor-icono--active');

        // Mostramos el icono del banco.
        btnFormulario
            .querySelector('[data-icono="banco"]')
            .classList.add('formulario__btn-contenedor-icono--active');

        siguientePaso();

        // Eliminamos la clase de disabled despues de 4 segundos.
        setTimeout(() => {
            btnFormulario.classList.remove('formulario__btn--disabled');
        }, 4000);
    } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')) {
        // Aqui se haria una peticion al servidor, una redireccion, etc.

        // Cambiamos el texto del btn a 'Transferir'
        btnFormulario.querySelector('span').innerText = 'Transfiriendo';
        // Agregamos la clase que deshabilita el boton.
        btnFormulario.classList.add('formulario__btn--disabled');

        setTimeout(() => {
            formulario.classList.add('formulario--hidden');
            document.getElementById('alerta').classList.add('alerta--active');
        }, 4000);
    } else {
        siguientePaso();
    }


});

const linea = document.getElementById('linea-pasos');
linea.addEventListener('click', (e) => {
    // Validamos que el click sea en un paso
    if (!e.target.closest('.linea-pasos__paso')) return false;

    // Obtenemos el paso actual.
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    // Validamos el campo actual.
    if (pasoActual === 'cantidad') {
        if (!validarCantidad()) return false;
    } else if (pasoActual === 'datos') {
        if (!validarNombre() || !validarCorreo()) return false;
    }

    // Obtenemos el paso al que queremos navegar.
    const pasoANavegar = e.target.closest('.linea-pasos__paso');

    // Solo queremos poder dar click a los que tienen palomita.
    if (pasoANavegar.querySelector('.linea-pasos__paso-check--checked')) {
        // Obtenemos el paso actual.
        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        if (pasoActual) {
            // Le quitamos la clase de activo.
            pasoActual.classList.remove('linea-pasos__paso-check--active');
        }

        // Obtenemos el id del paso a navegar.
        const id = pasoANavegar.dataset.paso;

        // Nos aseguramos de que el texto del boton sea siguiente.
        const btnFormulario = document.querySelector('.formulario__btn');
        btnFormulario.querySelector('span').innerText = 'Siguiente';

        // Nos aseguramos de ocultar el icono de banco.
        btnFormulario
            .querySelector('[data-icono="banco"]')
            .classList.remove('formulario__btn-contenedor-icono--active');

        // Nos aseguramos de mostrar el icono del siguiente.
        btnFormulario
            .querySelector('[data-icono="siguiente"]')
            .classList.add('formulario__btn-contenedor-icono--active');

        // Nos aseguramos de que no tenga la clase de disabled.
        btnFormulario.classList.remove('formulario__btn--disabled');

        // Navegamos al paso.
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
        });

        // Agregamos la clase de active al nuevo paso.
        linea.querySelector(`[data-paso="${id}"] span`).classList.add('linea-pasos__paso-check--active');
    }
});

console.log("Index");
//# sourceMappingURL=bundle.js.map
