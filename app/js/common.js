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
    console.log(element);
    console.log(hotel);
    container.appendChild(element);
});

// 2. для каждого элемента создать DOM-элемент на основе шаблона
/**
*@param {Object} data
*@return {Element} data
*/
function getElementFromTemplate(data) {
    return document.createElement('article');
}
