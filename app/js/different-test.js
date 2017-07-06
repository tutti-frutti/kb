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