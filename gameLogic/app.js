const boxes = document.querySelectorAll(".box");
var array = [];
array.length = 81;
var rowObject = {};
var columnObject = {};
var color = 'red';
var playerNumbers = 2;
var startingNum = 1;
var previousColor = 'red';
boxes.forEach(function(box){
    box.style.color = 'black';
})
for (let i = 0; i < boxes.length; i++) { // Game Initialization
    boxes[i].addEventListener("click", function () {
        console.log((startingNum%2 == 0 &&color == previousColor && boxes[i].style.color != 'red'))
        if(startingNum%2 == 1 && color == previousColor && boxes[i].style.color != 'blue'){
            color = 'red';
            previousColor = 'red'
            console.log('hey!')
            boxes[i].style.color = color; 
            startingNum++
            arrayInit();
            boxes[i].innerHTML = array[i] + 1;
            array[i] = (boxes[i].innerHTML == "" ? 0 : parseInt(boxes[i].innerHTML));
            rowObject = hash(rowObject, arrayGroupRow(array, 9));
            columnObject = hash(columnObject, arrayGroupColumn(array, 9));
            explosion(rowObject,100)
        }else if(startingNum%2 == 0 &&color == previousColor && boxes[i].style.color != 'red'){
            color = 'blue';
            previousColor = 'blue'
            boxes[i].style.color = color;
            startingNum++
            console.log('hey!')
            arrayInit();
            boxes[i].innerHTML = array[i] + 1;
            array[i] = (boxes[i].innerHTML == "" ? 0 : parseInt(boxes[i].innerHTML));
            rowObject = hash(rowObject, arrayGroupRow(array, 9));
            columnObject = hash(columnObject, arrayGroupColumn(array, 9));
            explosion(rowObject,100)
        }
        console.log(color, previousColor)

        
       
        
    });
}
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

function explosion(object,num){
    if(num < 0){
        return
    }
    
    if(object.group1[0] > 1){
        object.group1[0] = 0;
        boxes[0].innerHTML = object.group1[0];
        object.group1[1]++;
        boxes[1].innerHTML = object.group1[1];
        object.group2[0]++;
        boxes[9].innerHTML = object.group2[0];

        boxes[0].style.color = 'black';
        boxes[1].style.color = color;
        boxes[9].style.color = color;
    }
    if(object.group1[object.group1.length - 1] > 1){
        object.group1[object.group1.length - 1] = 0;
        boxes[object.group1.length - 1].innerHTML = object.group1[object.group1.length - 1];
        object.group1[object.group1.length - 2]++;
        boxes[object.group1.length - 2].innerHTML = object.group1[object.group1.length - 2];
        object.group2[object.group2.length - 1]++;
        boxes[17].innerHTML = object.group2[object.group2.length - 1];

        boxes[object.group1.length - 1].style.color = 'black';
        boxes[object.group1.length - 2].style.color = color;
        boxes[17].style.color = color;
    }
    if(object.group9[0] > 1){
        object.group9[0] = 0;
        boxes[72].innerHTML = object.group9[0];
        object.group9[1]++;
        boxes[73].innerHTML = object.group9[1];
        object.group8[0]++;
        boxes[63].innerHTML = object.group8[0];

        boxes[72].style.color = 'black';
        boxes[73].style.color = color;
        boxes[63].style.color = color;
    }
    if(object.group9[object.group9.length - 1] > 1){
        object.group9[object.group9.length - 1] = 0;
        boxes[80].innerHTML = object.group9[object.group9.length - 1];
        object.group9[object.group9.length - 2]++;
        boxes[79].innerHTML = object.group9[object.group9.length - 2];
        object.group8[object.group8.length - 1]++;
        boxes[71].innerHTML = object.group8[object.group8.length - 1];
        
        boxes[80].style.color = 'black';
        boxes[79].style.color = color;
        boxes[71].style.color = color;
    }
    for(let i = 1; i < 8; i++){
        for(let j = 1; j < 8; j++){
            if(object['group' + (i+1)][j] > 3){
                changed = true;
                object['group' + (i+1)][j] = 0;
                boxes[i * 9 + j].innerHTML = 0;
                object['group' + (i+1)][j+1]++;
                boxes[i * 9 + j+1].innerHTML = object['group' + (i+1)][j+1];
                object['group' + (i+1)][j-1]++;
                boxes[i * 9 + j-1].innerHTML = object['group' + (i+1)][j-1];
                object['group' + (i)][j]++;
                boxes[(i-1) * 9 + j].innerHTML = object['group' + (i)][j];
                object['group' + (i+2)][j]++;
                boxes[(i+1) * 9 + j].innerHTML = object['group' + (i+2)][j];

                boxes[i * 9 + j].style.color = 'black';
                boxes[i * 9 + j+1].style.color = color;
                boxes[i * 9 + j-1].style.color = color;
                boxes[(i-1) * 9 + j].style.color = color;
                boxes[(i+1) * 9 + j].style.color = color;
            }
        }
    }
    for(let i = 1; i <= 9;i++){
        for(let j = 1; j < 8; j++){
            if(('group' + i) == 'group1'){
                if(object['group' + (i)][j] > 2){
                    changed = true;
                    object['group' + (i)][j] = 0;
                    boxes[j].innerHTML = 0;
                    object['group' + (i)][j - 1]++;
                    boxes[j - 1].innerHTML = innerHTML = object['group' + (i)][j - 1];
                    object['group' + (i)][j + 1]++;
                    boxes[j + 1].innerHTML = innerHTML = object['group' + (i)][j + 1];
                    object['group' + (i + 1)][j]++;
                    boxes[j + 9].innerHTML = innerHTML = object['group' + (i + 1)][j];

                    boxes[j].style.color = 'black';
                    boxes[j - 1].style.color = color;
                    boxes[j + 1].style.color = color;
                    boxes[j + 9].style.color = color;
                }
            }
            if(('group' + i) == 'group9'){
                if(object['group' + (i)][j] > 2){
                    changed = true;
                    object['group' + (i)][j] = 0;
                    boxes[72 + j].innerHTML = 0;
                    object['group' + (i)][j - 1]++;
                    boxes[72 + j - 1].innerHTML = innerHTML = object['group' + (i)][j - 1];
                    object['group' + (i)][j + 1]++;
                    boxes[72 + j + 1].innerHTML = innerHTML = object['group' + (i)][j + 1];
                    object['group' + (i - 1)][j]++;
                    boxes[72 + j - 9].innerHTML = innerHTML = object['group' + (i - 1)][j];

                    boxes[72 + j].style.color = 'black';
                    boxes[72 + j - 1].style.color = color;
                    boxes[72 + j + 1].style.color = color;
                    boxes[72 + j - 9].style.color = color;
                }
            }
        }
    }
    for(let i = 2; i < 9; i++){
        if(object['group' + i][0] > 2){
            object['group' + (i)][0] = 0;
            boxes[(i-1) * 9].innerHTML = 0;
            object['group' + (i)][1]++
            boxes[(i-1) * 9 + 1].innerHTML = object['group' + (i)][1];
            object['group' + (i+1)][0]++
            boxes[(i) * 9].innerHTML = object['group' + (i+1)][0];
            object['group' + (i-1)][0]++
            boxes[(i-2) * 9].innerHTML = object['group' + (i-1)][0];

            boxes[(i-1) * 9].style.color = 'black';
            boxes[(i-1) * 9 + 1].style.color = color;
            boxes[(i) * 9].style.color = color;
            boxes[(i-2) * 9].style.color = color;
        }
        if(object['group' + i][8] > 2){
            object['group' + (i)][8] = 0;
            boxes[(i-1) * 9 + 8].innerHTML = 0;
            object['group' + (i)][7]++
            boxes[(i-1) * 9 + 7].innerHTML = object['group' + (i)][7];
            object['group' + (i+1)][8]++
            boxes[(i) * 9 + 8].innerHTML = object['group' + (i+1)][8];
            object['group' + (i-1)][8]++
            boxes[(i-2) * 9 + 8].innerHTML = object['group' + (i-1)][8];

            boxes[(i-1) * 9 + 8].style.color = 'black';
            boxes[(i-1) * 9 + 7].style.color = color;
            boxes[(i) * 9 + 8].style.color = color;
            boxes[(i-2) * 9 + 8].style.color = color;
        }
    }
    explosion(object,num-1)
}