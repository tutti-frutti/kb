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

guests.onchange = function() {
    setMinAndMaxRooms(rooms, guests.value);
};

formElement.onsubmit = function(evt) {
    evt.preventDefault();
    
    document.cookie = 'guests=' + guests.value;
    document.cookie = 'rooms=' + rooms.value;
}

var arr = [1,2,3];

arr.forEach(function(item, index, array){
    console.log(item, index, array);
});

var container = document.querySelector('.hotels-list');

// 1. перебрать все элементы в структуре данных.
// перебрать данные нужно для того, чтобы создать для каждого элемента DOM-элемент на основе шаблона. 
// для этого запускаем цикл по js-массиву.
// внутри перебора массива запускаем Ф. getElementFromTemplate
// на вход Ф. принимает объект (data), который представляет собой объект описывающий данные для отеля
// данные находятся в hotel.js
// была ошибка в том, что переменная hotels была не определена. дело в том, что hotels.js находился ниже, чем файл, который его вызывал.
hotels.forEach(function(hotel){
    var element = getElementFromTemplate(hotel);
    container.appendChild(element);
});

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
    
    return element;
}

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