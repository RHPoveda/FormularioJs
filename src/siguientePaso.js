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

export default siguientePaso;