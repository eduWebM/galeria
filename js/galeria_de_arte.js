export default function galeriaArte(imgActual, carouselContainer, arrowLeft, arrowRight, btnGallery, close, imgDialog) {
    const d = document;
    // Ancho total incluyendo el contenido desplazado
    const anchoTotal = d.querySelector(carouselContainer).scrollWidth;
    // Ancho visible del contenedor
    let anchoVisible = d.querySelector(carouselContainer).clientWidth;

    d.addEventListener("click", (e) => {

        anchoVisible = d.querySelector(carouselContainer).clientWidth;

        const observarCambioDeTamano = new ResizeObserver(entries => {
            for (let entry of entries) {
              if (entry.target === d.querySelector(carouselContainer)) {
                console.log(`El ancho del contenedor ha cambiado a ${entry.contentRect.width}px`);
                
                // Aquí puedes poner el código que quieres ejecutar cuando el tamaño cambie
                if (entry.contentRect.width !== d.querySelector(carouselContainer).clientWidth) {
                  anchoVisible = entry.contentRect.width;
                }
              }
            }
        });          
        // Detecto cambios en la resolución de pantalla del dispositivo (por ejemplo en móviles cuando se voltea la pantalla)
        observarCambioDeTamano.observe(d.querySelector(carouselContainer));

        if(e.target.matches(arrowLeft) || e.target.matches(`${arrowLeft} *`)) {
            d.querySelector(carouselContainer).scrollBy({ left: -anchoVisible, behavior: 'smooth' });
    imgActual--;
        }

        if(e.target.matches(arrowRight) || e.target.matches(`${arrowRight} *`)) {
            d.querySelector(carouselContainer).scrollBy({ left: anchoVisible, behavior: 'smooth' });
    imgActual++;
        }

        if(e.target.matches(btnGallery)) {
            d.querySelector(btnGallery).nextElementSibling.showModal();
            d.querySelector(btnGallery).nextElementSibling.classList.add('abrir-modal');
        }

        if(e.target.matches(close)) {
            d.querySelector(close).parentElement.classList.remove('abrir-modal');
            d.querySelector(close).parentElement.classList.add('cerrar-modal');
            setTimeout(function() {
                d.querySelector(close).parentElement.close();
                d.querySelector(close).parentElement.classList.remove('cerrar-modal');
            }, 500); 
        }

        if(e.target.matches(imgDialog)) {
            let imgClick = e.target.getAttribute("data-image");
            let numImage = 0;
            d.querySelectorAll(imgDialog).forEach((el) => {
                // Busco en el array de imágenes el 'data-image' coincidente
                if(imgClick === el.getAttribute("data-image")){
                    numImage = el.getAttribute("data-image"); // imagen a la que quiero ir
                    let distancia = numImage - imgActual; // calculo la distancia a recorrer con 'scrollBy' en base a la imagen actual, es decir, el número de imágenes que tengo que recorrer hasta la imagen seleccionada
                    let totalScroll = Math.abs(anchoVisible * distancia); // redondeo el valor a un número positivo
                    el.closest('.modal-gallery').classList.remove('abrir-modal');
                    el.closest('.modal-gallery').classList.add('cerrar-modal');
                    setTimeout(function() {
                        el.closest('.modal-gallery').close();
                        el.closest('.modal-gallery').classList.remove('cerrar-modal');
                        if(numImage > imgActual){
                            d.querySelector(carouselContainer).scrollBy({ left: totalScroll, behavior: 'smooth' });
                        } else if(numImage < imgActual){
                            d.querySelector(carouselContainer).scrollBy({ left: -totalScroll, behavior: 'smooth' });
                        }  
                        imgActual = numImage;
                    }, 500);  
                }
            });
        }

    });

    d.querySelector(carouselContainer).addEventListener("scroll", (e) => {
        const scrollActual = d.querySelector(carouselContainer).scrollLeft;
        imgActual = Math.round((scrollActual / anchoVisible) + 1);
    });
}