let inputDir = {x:0, y:0};
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
food = {x:6, y:7};

function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function iscollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    if (iscollide(snakeArr)){
        inputDir = {x:0, y:0};
        alert('Game Over! Press enter to play again.');
        snakeArr = [{x:13, y:15}];
        score = 0;
        speed = 5;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        speed += 0.3;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            highscorebox.innerHTML = 'High Score: ' + hiscoreval;
        }
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};    
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index ===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let hiscore = localStorage.getItem('hiscore');
if (hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscorebox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    // inputDir = {x:0, y:1}
    switch (e.key){
        case "W":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "S":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "A":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "D":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "w":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "s":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "a":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "d":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})

const leftbtn = document.getElementById('btn-left')
const rightbtn = document.getElementById('btn-right')
const upbtn = document.getElementById('btn-up')
const downbtn = document.getElementById('btn-down')

leftbtn.addEventListener('click', ()=>{
    
    inputDir.x = -1;
    inputDir.y = 0;
})
rightbtn.addEventListener('click', ()=>{
    
    inputDir.x = 1;
    inputDir.y = 0;
})
upbtn.addEventListener('click', ()=>{
    
    inputDir.x = 0;
    inputDir.y = -1;
})
downbtn.addEventListener('click', ()=>{
    
    inputDir.x = 0;
    inputDir.y = 1;
})