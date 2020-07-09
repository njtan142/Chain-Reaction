const boxes = document.querySelectorAll(".box");
var array = [];
array.length = 64;
var rowObject = {};
var columnObject = {};
function arrayInit() {
    for (let i = 0; i < boxes.length; i++) {
        array[i] = (boxes[i].innerHTML == "" ? 0 : parseInt(boxes[i].innerHTML));
    }
}
function arrayGroupRow(array, length) {
    let finalArray = [];
    for (let i = 0; i < array.length; i++) {
        let groupedArray = [];
        for (let j = 0; j < length; j++) {
            if (array[i * length + j] == undefined) {
                break;
            } else {
                groupedArray.push(array[i * length + j]);
            }
        }
        if (groupedArray.length == 0) {
            break;
        }
        finalArray.push(groupedArray);
    }
    return finalArray;
}
function arrayGroupColumn(array,length) {
    let finalArray = [];
    for (let i = 0; i < array.length; i++) {
        let groupedArray = [];
        for (let j = 0; j < length; j++) {
            if (array[i + j * length] == undefined) {
                break;
            } else {
                groupedArray.push(array[i + j * length]);
            }
        }
        if (groupedArray.length < length) {
            break;
        }
        finalArray.push(groupedArray);
    }
    return finalArray;
}
function hash(object, array) {
    for (let i = 0; i < array.length; i++) {
        object["group" + (i + 1)] = array[i];
    }
    return object;
}
for (let i = 0; i < boxes.length; i++) { // Game Initialization
    boxes[i].addEventListener("click", function () {
        arrayInit();
        boxes[i].innerHTML = array[i] + 1;
        array[i] = (boxes[i].innerHTML == "" ? 0 : parseInt(boxes[i].innerHTML));
        rowObject = hash(rowObject, arrayGroupRow(array, 8));
        columnObject = hash(columnObject, arrayGroupColumn(array, 8));
        explosion(rowObject)
    });
}
function explosion(object){
    for(let i = 1; i < 7; i++){
        for(let j = 1; j < 7; j++){
            if(object['group' + (i+1)][j] > 3){
                object['group' + (i+1)][j] = 0;
                boxes[i * 8 + j].innerHTML = 0;
                object['group' + (i+1)][j+1]++;
                boxes[i * 8 + j+1].innerHTML = object['group' + (i+1)][j+1];
                object['group' + (i+1)][j-1]++;
                boxes[i * 8 + j-1].innerHTML = object['group' + (i+1)][j-1];
                object['group' + (i)][j]++;
                boxes[(i-1) * 8 + j].innerHTML = object['group' + (i)][j];
                object['group' + (i+2)][j]++;
                boxes[(i+1) * 8 + j].innerHTML = object['group' + (i+2)][j];
                explosion(object);
            }
        }
    }
}