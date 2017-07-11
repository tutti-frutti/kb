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
    });