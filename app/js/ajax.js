// ПЛАН ДЕЙСТВИЙ
// 1. загрузить список отелей по AJAX, вместо подключения файла с глобальной переменной
// 2. написать фильтрацию списка
// 3. оптимизировать отрисовку

// код по отрисовке списка отелей работает, рассчитывая на существование глобальной переменной hotels.
// задача сделать так, чтобы набор данных для списка отелей модуль получал самостоятельно

// схема работы JSONP
// мы спрашиваем сервер отдать нам скрипт
// сервер отдаёт нам скрипт и вызывает у нас заранее определенную нами же функцию со специальным названием
// о названии мы "договариваемся" с сервером, а данные, которые мы получаем являются аргументами этой функции
// итого: мы просто загружаем скрипт, который вызывает Ф. передавая в неё данные

// сторона сервера, пример:
//__jsonpCallback({
//  {name: 'object 1'},
//  {name: 'object 2'},
//  {name: 'object 3'}
// });

// Объявление функции с указанным названием - ответственность принимающей стороны, скрипта, который загружает данные по JSONP
// если мы вызываем Ф. которая на стороне сервера названа __jsonpCallback , то в Нашем коде она должна быть объявлена!
// единственным параметром этой Ф. является аргумент data - просто "сырые" данные, которые сервер нам отдаст

// сначала объявляем переменную в которую будут выведены все интересующие нас данные. Т.е. сюда запишется параметр data

// var loadedData = null;

// function__jsonpCallback(data) {
//  loadedData = data;
// }

// как сделать, чтобы Ф. __jsonpCallback вызвалась ?
// var scriptEl = document.createElement('script'); - 1. создаем тег скрипт
// scriptEl.src = 'data.js'; - 2. указываем откуда нужно загрузить эти данные
// document.body.appendChild(scriptEl); - 3. подключаем на страницу



// XMLHttpRequest
// в случае с XMLHttpRequest мы можем хранить данные не в глобальной переменной, а в "чистом" файле json
// ВАЖНО: когда используем json нужно использовать двойные кавычки, ex: {"name": "object 1"}

// итак, нам нужно загрузить файл json Из файла main.js
// var loadedData = null;

// 1. создаём новый объект с помощью конструктора. в переменую xhr сохранился новый объект вида XMLHttpRequest. этот объект будет работать с сервером.
// var xhr = new XMLHttpRequest();

// 2. после создания объекта, чтобы указать параметры запроса, нужно этот запрос окрыть  
// команда.open - она запрос не отправит, она только откроет его и в этот момент мы только описываем параметры нашего запроса.
// xhr.open('GET', 'data.json', false);  
// - 'GET' - {string} method - представляет собой строку
// - 'data.json' - {string} URL - адрес к которму мы будем обращаться 
// - false - {boolean} async - флаг, указывающий асинхронный ли запрос. значение по умолчанию true

// нужно понимать, что данные с сервера мы получим не сразу и для таких случаев тоже существуют события
// XHR имеет свои события - onload, onaboard и ontimeout.
// ацент: на этом этапе мы Не отправили запрос, только открыли его
// после того, как мы отправили запрос мы должны его отработать
// для этого нужно использовать обработчик события, в данном случае load
// таким образом мы можем написать код, который выполниться когда событие будет загруженно

// про timeout
// xhr.timeout = 10000; - если запрос не вернулся по истечении этого времени, то сработает событие ontimeout, которое мы може обработать обработчиком ontimeout
// timeout тут идет из "коробки". если загрузка совершается в отведенные 10сек, то timeout отменяется сам

// успешный обработчик
// xhr.onload = function(evt) {
//  console.log(evt) - вывести в консоль объект evt, который является произошедшим событием
// }

// 3. отправка запроса
// отправка запроса производится вызовом метода send. 
// xhr.send();

// 4. обработка данных
// для чего? json может приходить не в виде объекта json, а в виде строки
// естественно, что такую строку нужно привести в настоящий json
// сделать это можно с помощью встроенного js объекта, который называется JSON и у этого объекта есть метода .parse , который как раз и принимает на вход такую строку, которую вернул нам сервер и возвращает из неё объект.
// JSON.parse(evt.srcElement.response);
// JSON.parse(evt.srcElement.response); - нужно вызвать JSON.parse на объекте evt.srcElement
// evt.srcElement - у каждого объекта evt обработчике свойство srcElement - встроенное. аналогия: evt.preventDefault в обработчике клика

// ЗАМЕТКИ ПРО JSON ФАЙЛ
// все объекты должны находиться в массиве 
// в объектах использовать только двойные кавычки 
// после последнего объекта не использовать запятую, перед закрывающей скобкой массива 
// выражения типа .8 (как у меня было в distance) приводят к ошибкам. 0.8 - нормально 
