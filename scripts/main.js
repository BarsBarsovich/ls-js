let myMap;
let coords;
let  objectManager;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);


function init(){
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 8,
    });

     objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
    }, {
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/pin.jpg',
        // Размеры метки.
        iconImageSize: [30, 42],
    });

    let myPlacemark1 = new ymaps.Placemark([56.76, 37.64], {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
    }, {
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/pin.jpg',
        // Размеры метки.
        iconImageSize: [30, 42],
    })

    myMap.geoObjects.add(myPlacemark);
    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(objectManager);

    addListeneres()
}


function addListeneres(){
    myMap.events.add('click', function (event){
        openModal(event);
    });

    objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    objectManager.clusters.events.add(['mouseenter', 'mouseleave'], onClusterEvent);


    const btn = document.getElementById('send');

    btn.addEventListener('click', function(event){
        event.preventDefault();
        validateForm();
        myPlacemark = new ymaps.Placemark(coords, {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/pin.jpg',
            // Размеры метки.
            iconImageSize: [30, 42],
        });
        myMap.geoObjects.add(myPlacemark);
        objectManager.add(myPlacemark);

        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    });
}


function validateForm(){
    const comment = document.getElementById('')
}

function openModal(event){
    let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX;
    let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY;
    coords = event.get('coords');

    const adr = getClickCoords(coords);
    console.log(adr);

    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    modal.style.left = `${posX}px`;
    modal.style.top = `${posY}px`;
}

function getClickCoords(coords) {
    return new Promise((resolve, reject) => {
        ymaps.geocode(coords)
            .then(response => resolve(response.geoObjects.get(0).getAddressLine()))
            .catch(e => reject(e))
    })
}

function onObjectEvent(){

}


function onClusterEvent(){

}
