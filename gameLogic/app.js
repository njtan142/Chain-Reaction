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
        console.log(rowObject)
    });
}
function explosion(object){
    if(object.group1[0] > 1){
        object.group1[0] = 0;
        boxes[0].innerHTML = object.group1[0];
        object.group1[1]++;
        boxes[1].innerHTML = object.group1[1];
        object.group2[0]++;
        boxes[8].innerHTML = object.group2[0];
    }
    if(object.group1[object.group1.length - 1] > 1){
        object.group1[object.group1.length - 1] = 0;
        boxes[object.group1.length - 1].innerHTML = object.group1[object.group1.length - 1];
        object.group1[object.group1.length - 2]++;
        boxes[object.group1.length - 2].innerHTML = object.group1[object.group1.length - 2];
        object.group2[object.group2.length - 1]++;
        boxes[15].innerHTML = object.group2[object.group2.length - 1];
    }
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
    for(let i = 1; i <= 8;i++){
        for(let j = 1; j < 7; j++){
            if(('group' + i) == 'group1'){
                if(object['group' + (i)][j] > 2){
                    object['group' + (i)][j] = 0;
                    boxes[j].innerHTML = 0;
                    object['group' + (i)][j - 1]++;
                    boxes[j - 1].innerHTML = innerHTML = object['group' + (i)][j - 1];
                    object['group' + (i)][j + 1]++;
                    boxes[j + 1].innerHTML = innerHTML = object['group' + (i)][j + 1];
                    object['group' + (i + 1)][j]++;
                    boxes[j + 8].innerHTML = innerHTML = object['group' + (i + 1)][j];
                    explosion(object);
                }
            }
            if(('group' + i) == 'group8'){
                if(object['group' + (i)][j] > 2){
                    object['group' + (i)][j] = 0;
                    boxes[56 + j].innerHTML = 0;
                    object['group' + (i)][j - 1]++;
                    boxes[56 + j - 1].innerHTML = innerHTML = object['group' + (i)][j - 1];
                    object['group' + (i)][j + 1]++;
                    boxes[56 + j + 1].innerHTML = innerHTML = object['group' + (i)][j + 1];
                    object['group' + (i - 1)][j]++;
                    boxes[56 + j - 8].innerHTML = innerHTML = object['group' + (i - 1)][j];
                    explosion(object);
                }
            }
        }
    }
    for(let i = 2; i < 8; i++){
        if(object['group' + i][0] > 2){
            console.log(4)
            object['group' + (i)][0] = 0;
            boxes[(i-1) * 8].innerHTML = 0;
            object['group' + (i)][1]++
            boxes[(i-1) * 8 + 1].innerHTML = object['group' + (i)][1];
            object['group' + (i+1)][0]++
            boxes[(i) * 8].innerHTML = object['group' + (i+1)][0];
            object['group' + (i-1)][0]++
            boxes[(i-2) * 8].innerHTML = object['group' + (i-1)][0];
            explosion(object);
        }
        if(object['group' + i][7] > 2){
            console.log(5)
            object['group' + (i)][7] = 0;
            console.log(boxes[(i-1) * 8 + 7])
            boxes[(i-1) * 8 + 7].innerHTML = 0;
            object['group' + (i)][6]++
            boxes[(i-1) * 8 + 6].innerHTML = object['group' + (i)][6];
            object['group' + (i+1)][7]++
            boxes[(i) * 8 + 7].innerHTML = object['group' + (i+1)][7];
            object['group' + (i-1)][7]++
            boxes[(i-2) * 8 + 7].innerHTML = object['group' + (i-1)][7];
            explosion(object);
        }
    }
}