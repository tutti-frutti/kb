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
console.log(rooms);
rooms.value = rooms.min;

guests.onchange = function() {
    setMinAndMaxRooms(rooms, guests.value);
}