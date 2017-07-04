(function () {
    var formElement = document.forms['searchform'];

    var guests = formElement['searchform-guests-number'];
    var rooms = formElement['searchform-guests-rooms'];

    guests.min = 1;
    guests.max = 6;

    var MAX_GUESTS_PER_ROOM = 3;

    function setMinAndMaxRooms(roomsElement, guestsNumber) {
        roomsElement.min = Math.ceil(guestsNumber / MAX_GUESTS_PER_ROOM);
        roomsElement.max = guestsNumber;
    }
    guests.value = 2;
    setMinAndMaxRooms(rooms, guests.value);
    rooms.value = rooms.min;

    guests.onchange = function () {
        setMinAndMaxRooms(rooms, guests.value);
    };

    formElement.onsubmit = function (evt) {
        evt.preventDefault();

        document.cookie = 'guests=' + guests.value;
        document.cookie = 'rooms=' + rooms.value;
    }

    var arr = [1, 2, 3];

    arr.forEach(function (item, index, array) {
        console.log(item, index, array);
    });


    // ВЫВОД СПИСКА ОТЕЛЕЙ НА СТРАНИЦУ

    var container = document.querySelector('.hotels-list');

    // 1. перебрать все элементы в структуре данных.
    // перебрать данные нужно для того, чтобы создать для каждого элемента DOM-элемент на основе шаблона. 
    // для этого запускаем цикл по js-массиву.
    // внутри перебора массива запускаем Ф. getElementFromTemplate
    // на вход Ф. принимает объект (data), который представляет собой объект описывающий данные для отеля
    // данные находятся в hotel.js
    // была ошибка в том, что переменная hotels была не определена. дело в том, что hotels.js находился ниже, чем файл, который его вызывал.


    // ЗАГРУЗКА СПИСКА ОТЕЛЕЙ ПО AJAX ИЗ DATA.JSON
    // создаём Ф. для загрузки данных с сервера
    // 1. создаём xhr запрос
    // 2. открываем и формируем запрос
    // 3. устанавливаем обработчик для действий после загрузки даннных
    // 4. отправляем данные

    // поскольку переменной hotels больше нет, а список отелей каждый раз разный, нужно сделать еще одну Ф. котрая принимает на вход список отелей и уже потом их отрисовывает
    // для этого forEach вкладываем во внутрь этой Ф. единственным параметром делаем список hotels, который в последствии нужно отрисовать
    // теперь передавая разные списки можно будет их по разному отрисовывать
    // единственным параметром Ф. renderHotels является массив объектов

    getHotels(); // вызов Ф. getHotels();
    
    // отрисовка списка отелей
    function renderHotels(hotels) {
        hotels.forEach(function (hotel) {
            var element = getElementFromTemplate(hotel);
            container.appendChild(element);
        });
    }

    // загрузка списка отелей
    function getHotels() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/hotels.json')
        xhr.onload = function (evt) {
            var rawData = evt.target.response; // получаем данные
            var loadedHotels = JSON.parse(rawData); // форматируем к виду настоящих объектов

            // тут далее обработка загруженных данных (например отрисовка)
            // после того как мы загрузили список отелей остаётся только вызвать Ф. отрисовки отелей на странице
            renderHotels(loadedHotels);
        };
        xhr.send();
    }

    // 2. для каждого элемента создать DOM-элемент на основе шаблона
    /**
     *@param {Object} data - на вход Ф. принимает объект, представляет собой объект описывающий данные об отеле (которые находятся в hotels.js)
     *@return {Element} data - возвращает новый тег article
     */

    // вопросы:
    // почему говорится о том, что Ф. getElementFromTemplate мы запускаем Внутри js-цикла (.forEach?), если сама Ф. находится За пределам (за скобками) .forEach?
    // как параметр data видит объекты в hotels.js?
    // почему в .forEach объект называется hotel - это произвольное название? значения data подставляются автоматически?
    function getElementFromTemplate(data) {
        var template = document.querySelector('#hotel-template');
        //    var element = template.content.children[0].cloneNode(true);
        if ('content' in template) {
            var element = template.content.children[0].cloneNode(true);
        } else {
            var element = template.children[0].cloneNode(true);
        }

        element.querySelector('.hotel-name').textContent = data.name;
        element.querySelector('.hotel-rating').textContent = data.rating;
        element.querySelector('.hotel-price-value').textContent = data.price;
        element.querySelector('.hotel-distance-kilometers').textContent = data.distance;
        element.querySelector('.hotel-stars').textContent = data.stars;

        // РАБОТА С ИЗБР
        // изображения отличаются от обычных DOM-элементов тем, что после задания src они загружаются с сервера.
        // после того, как мы записали src и путь (или присвоили какое-то значение, кот записано в поле preview, в кот записан адрес этой картинки), картинка сразу же не покажется - она должна сначала загрузиться. 
        // как узнать, что эта картинка загрузилась? 
        // для того, чтобы убедится, что картинка загружена нужно воспользоваться механизмом "событие" 
        // для проверки загрузилось изображение или нет, существует событие "load"
        // в данном случае это событие срабатывает после того, как картинка была загружена
        // var backgroundImage - new Image(); - создаём картинку
        // backgroundImage.onload = function() - обработчик load записывает её src как backgroundImage для element, который мы отрисовываем
        // как только мы загрузили картинку через задание ей src мы можем пользоваться этой картинкой как угодно.
        // backgroundImage - является указателем на то, что картинку нужно записать именно как background-image
        // почему сначала записан "onload" и только потом backgroundImage.src?

        // если мы задаем src любой картинке, то это открывает запрос к серверу на загрузку этой картинки, а после того как загрузка закончилась, браузер кэширует эту картинку. 
        // чтобы использовать её в любом виде - как фон, как просто избр - не нужно будет перезагружать её второй раз. 
        //  element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')'; - мы можем написать так поскольку src заставил браузер сходить на сервер скачать её и положить к себе в кэш.

        // таким образом, мы загружаем картинку с помощью такой записи: backgroundImage.src = '/' + data.preview;
        // записываем её как фон с помощью Ф. backgroundImage.onload = function() {};
        // в теле функции element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')'; - мы записываем в элемент через .style, url, который соответствует .src в backgroundImage.src = '/' + data.preview;

        // \' - это экран, который говорит о том, что сейчас будет символ

        var backgroundImage = new Image();

        // ТАЙМАУТ
        // setTimeout(); - нужен для того, чтобы запускать код отложенно, через какое-то время
        // принимает на вход два аргумента
        // 1й - функция, т.е. внутри мы пишем код, который хотим выполнить через какое-то время
        // 2й - это время в милисекундах, через которое я хочу выполнить эту функцию

        // другой момент - если сервер ответил в течении работы таймаута
        // сам по себе таймаут возвращает цифру, которая представляет собой id'шник таймаута
        // для чего нужен этот id'шник?
        // для того, чтобы в дальнейшем этот таймаут можно было удалить
        // он удаляется с помощью Ф. clearTimeout
        // как получить этот id'шник
        // например сохранить его всю Ф. setTimeout в переменную.
        // var imageLoadTimeout = setTimeout(function(){...});
        // когда картинка загрузилась вызываем метод clearTimeout(imageLoadTimeout);
        // где отменять Timeout ?
        // внутри Ф. события onload


        var IMAGE_TIMEOUT = 10000;

        var imageLoadTimeout = setTimeout(function () {
            backgroundImage.src = ''; // прекращаем загрузку
            element.classList.add('hotel-nophoto'); // показываем ошибку
        }, IMAGE_TIMEOUT);

        backgroundImage.onload = function () {
            clearTimeout(imageLoadTimeout);
            element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
        }

        // если избр не загрузилось
        backgroundImage.onerror = function () {
            element.classList.add('hotel-nophoto');
        }

        backgroundImage.src = '/' + data.preview;

        return element;
    }

})();



// 'content' in template вернет true если template является объектом DocumentFragment, в противном случае - нет и мы будем знать что это IE.
// таким образом это будет обычным тегом. в этом случае мы обращаемся к var element = template.children[0].cloneNode(true); "напрямую" и сам template придется задать display: none;

// скопируем шаблон
// заполним данными
// вставим

// var template = document.querySelector('#hotel-template'); --- получаем шаблон - содержимое тега template. затем нужно положить его содержимое во внутрь созд.элем.
// var element = template.content.children[0].cloneNode(true);
// template.content --- template представляет собой элемент, все, что в нём записано хранится в свойстве .content - это особенность браузеров, которые поддеживают тег template. контент этого тега - это DocumentFragment
// .children[0] --- это первый потомок (тег article) DocumentFragment т.е. тега template
// .cloneNode(true) --- клонируем со всем содержимым (за это отвечает свойство true).

//element.querySelector('.hotel-name').textContent = data.name;
// .textContent --- возвращает только текст. т.е. мы можем читать и записывать этот текст. а далее записываем в него то, что записанно в данных под ключем name.

// ОБЛАСТЬ ВИДИМОСТИ ФУНКЦИИ
// если мы объявляем переменные внутри Ф., то снаружи эта переменная не видна
// каждая Ф. создаёт свою область видимости
// Ф. может быть анонимной т.е. не иметь названия
// оператор группировки (скобки) возвращает последний элемент, который в него передан, ex: (1,2,3) - вернет 3
// во внутрь скобок мы можем положить в т.ч. анонимную Ф. и эти скобки вернут эту Ф. остаётся только её вызвать
// ex: (function(val) {console.log(val); }) ('Привет') - вызов Ф. и выведет в консоль Привет

// (function() {})(); - создаём Ф. в операторах скобки() во внутрь ложим содержимое и затем эта Ф. сама себя вызывает '()'

var arr = ['Есть', 'жизнь', 'на', 'Марсе'];

var arrLenght = [];

arrLenght = arr.map(function (item) {
    return item.length;
})

console.log(arrLenght)

var numbs = [1, 2, 3, 4, 5];

//var getSum = function(sum) {
//    var sum = numbs.reduce(function (prev, item){
//        return prev + item;
//    }, 0);
//}

function getSums(arr) {
    var result = [];
    if (!arr.length) return result;

    var totalSum = arr.reduce(function (sum, item) {
        result.push(sum);
        return sum + item;
    });
    result.push(totalSum);

    return result;
}

console.log(getSums([1, 2, 3, 4, 5]))