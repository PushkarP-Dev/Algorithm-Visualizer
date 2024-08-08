let n = 10;
let delay = 100;
const array=[];
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

function update() {
    n = parseInt(slider.value, 10);
    sliderValue.textContent = n;
    init();
}

slider.addEventListener('input', update);

function updateSpeed() {
    delay = parseInt(speedSlider.value, 10);
    speedValue.textContent = delay;
}

speedSlider.addEventListener('input', updateSpeed);

function init(){
    array.length = 0;
    for(let i=0; i<n; i++){
        array[i] = Math.random();
    }
    showbars();
}

async function playbubble(){
    await bblSort(array);
}

async function playSelection() {
    await selectionSort(array);
}

function showbars(compareIndices = []){
    container.innerHTML = "";
    for(let i =0; i<array.length; i++){
        const bar = document.createElement("div");
        bar.style.height=array[i]*100 + "%";
        bar.classList.add("bar");
        if (compareIndices.includes(i)) {
            bar.style.backgroundColor = "red";
        } else {
            bar.style.backgroundColor = "steelblue";
        }
        container.appendChild(bar);
    }
}

async function bblSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                showbars([j, j+1]);
                await sleep(delay);
            }
        }
    }
    showbars();
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
            showbars([i, minIndex]);
            await sleep(delay);
        }
    }
    showbars();
}

init()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}