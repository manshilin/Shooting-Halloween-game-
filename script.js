
let gameBlock = document.querySelector("#game");

let body = document.querySelector("body");
countLifes = 2;
countScore = 0;
let score = document.querySelector("#score span");
let gamerSkin = "skin_1";
let flag = false;


// Работа с тегом audio

let audioPlayer = document.querySelector("audio");
let btnPlay1 = document.querySelector("#play1");
let btnPlay2 = document.querySelector("#play2");
let source = document.querySelector("audio source");
let sound = "off"; // "on"

let startButton = document.querySelector("#start button");


startButton.onclick = function startGame(){
    //Принажатиии старт убираем окно старт и влючаем игровое поле
    start.style.display = "none";
    gameBlock.style.display = "block";
    gamer.className = gamerSkin;
    createLifes();
    createEnemy();
}
   
// выбираем по селектору Игрока
gamer = document.querySelector("#player");

//Обращаемся к документу и проверяем на наличие события "Нажатие клавиши"
document.onkeydown = function(event){
    
    // Прверка события Нажатие кнопки w и стрелки вверх
   if(event.keyCode == 87 || event.keyCode == 38){
       // изменяем координату Игрока на 10px - движение вверх
      
        if(gamer.offsetTop < 100){

            gamer.style.top = gamer.offsetTop - 0 + "px";
        }
        else{
            gamer.style.top = gamer.offsetTop - 40 + "px";
        }
    }
    // Прверка события Нажатие кнопки s и стрелки вниз
    if(event.keyCode == 83 || event.keyCode == 40){
        if(gamer.offsetTop < 800){
            // изменяем координату Игрока на 10px - движение вниз
            gamer.style.top = gamer.offsetTop + 40 + "px";
        }
        else{
            gamer.style.top = gamer.offsetTop + 0 + "px";
        }        
    }
    //Проверка события ВЫСТРЕЛ - нажатием пробела 
    if(event.keyCode == 32){
        createBullet();     
    }
}
function typeEnemy(){
    if(randomInteger(1,2) == 1){
        return " type-1";
    }
    else return " type-2";
}

function createEnemy(){
   // Coздаем элемент Enemy
   let enemy =document.createElement("div");
   // присваеваем  созданному "div" рандомный класс врага
   enemy.className = "enemy" + typeEnemy();
   // Вставляем єлемент enemy в игровое поле
   enemy.style.top = randomInteger(100, document.querySelector("#app").clientHeight - 150) + "px";
   gameBlock.appendChild(enemy);
   moveEnemy(enemy);
}   

function moveEnemy(enemy){
       
   let timerID = setInterval(function(){
       enemy.style.left = enemy.offsetLeft - 10 + "px";
      
      if(enemy.offsetLeft < -100){
          enemy.remove();
          clearInterval(timerID);
          createEnemy();
          die();
       }      
   },50)
}

function createBullet(){
    // Создаем элемент div пуля и присваиваем class "bullet" 
     bullet = document.createElement("div");
     bullet.className = "bullet";
     // Добовляем пулю в игровое поле       
     gameBlock.appendChild(bullet);
     moveBullet(bullet);
}
function moveBullet(bullet){
    // Задаем первоначальные координаты пули 
   bullet.style.top = gamer.offsetTop + 125 + "px";
   bullet.style.left = gamer.offsetLeft +165 + "px";
   let timer = setInterval(function(){
      bullet.style.left = bullet.offsetLeft + 10 + "px";
       // Условие удаление пули с игрового поля и очистка setInterval
     if (bullet.offsetLeft > document.querySelector("body").clientWidth){
          bullet.remove();
          clearInterval(timer);
      }          
      if(flag == false) {isBoom(bullet);}
  },10 );
  
}

// Попадание по врагу
function isBoom(bullet){
  let enemy = document.querySelector(".enemy");
  if (bullet.offsetLeft > enemy.offsetLeft 
      && bullet.offsetTop > enemy.offsetTop
      && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight ){
          countScore = countScore + 100;
          score.innerHTML= countScore;
          // Взрыв при уничтожении  врага
          createBoom(bullet.offsetTop, bullet.offsetLeft);
          bullet.remove();
          enemy.remove();
          createEnemy();                
  }    
}
 
function randomInteger(min, max) {
    // случайное число от min до max
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function createBoom(top,left){
    //взрыв при уничтожении  врага
    let boom =document.createElement("div");
    boom.className = "boom";
    boom.style.top = top - 100 + "px";
    boom.style.left = left - 100 + "px";
    gameBlock.appendChild(boom);
    setTimeout(() => {
        boom.remove();        
    }, 700);  
}

function die(){
    countLifes = countLifes - 1;
    if(countLifes == 0){
        flag = true;
        gameEnd();
    }
    else createLifes();
}
// Минус жизнь если враг пролетел через игровое поле

function createLifes(){
    let lifesBlock = document.querySelector("#lifes");
    lifesBlock.innerHTML = " ";
    //вывод количества жизней Игрока
    for(let i = 0; i< countLifes; i++){
        let span = document.createElement("span");
        lifesBlock.appendChild(span); 
}   

}

// Событие "нажатие на иконку звука" 
let soundButton = document.querySelector("#sound img");
soundButton.onclick = function() {
    
    if(sound == "off") {
        soundButton.src = "images/sound_on.png";
        sound = "on";
        audioPlayer.play();       
    }
    else{
        soundButton.src = "images/mute_sound.png";
        sound = "off";
        audioPlayer.pause();
    }    
}

  // Окно завершение игры
function gameEnd(){
    let endScore = document.querySelector("#end h3 span");
    endScore.innerHTML= score.innerHTML;
     
    gameBlock.innerHTML = "";
    
    let endBlock = document.querySelector("#end");
    endBlock.style.display = "block";
    
    let endBatton = document.querySelector("#end button");
    endBatton.onclick = function(){
        location.reload();
    }
}
selectSkin1 = document.querySelector("#skin_1");
selectSkin1.onclick = function(){
    selectSkin1.className = "selected";
    selectSkin2.className = "";
    gamerSkin = "skin_1";
}

selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function(){
    selectSkin2.className = "selected";
    selectSkin1.className = "";
    gamerSkin = "skin_2";
}

