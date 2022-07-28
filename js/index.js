const canvas = document.querySelector('canvas')
canvas.style.border = '2px solid grey';
let ctx = canvas.getContext('2d');
let startScreen = document.querySelector('.game-intro')

let intervalId = 0

let isGameOver = false
let score = 0

let background = new Image()
background.src = '../images/road.png';

let car = new Image();
car.src = '../images/car.png';
let carX = 250
let carY = 400
let carWidth = 80
let carHeight = 130

//ob car
let obCar = new Image();
obCar.src = '../images/car.png';
let obCarX = (Math.random() * (500-200) + 100);
let obCarY = -200

//ob cone
let obCone = new Image();
obCone.src = '../images/cone3.png';
let obConeX = (Math.random() * (500-200) + 100);
let obConeY = -200
let coneWidth = 50
let coneHeight = 50


//ob car 3




window.onload = () => {
  var context = new AudioContext();
  canvas.style.display = 'none';
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.addEventListener('keydown', (event) => {
    if(event.code === 'ArrowRight' && carX + carWidth < canvas.width - 50){
      carX += 20;
    } else if(event.code === 'ArrowLeft' && carX > 50){
      carX -= 20;
    }
  });
  
  function startGame() {
    canvas.style.display='block';
    startScreen.style.display = 'none';

    ctx.drawImage(background, 0,0,canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carHeight);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carHeight);
    ctx.drawImage(obCone, obConeX, obConeY, coneWidth, coneHeight);


    obCarY += 3;
    if(obCarY > canvas.height){
      obCarY = -400;
      score+= + 2;
    }

    obConeY += 2;
    if(obConeY > canvas.height){
      obConeY = -200;
      score++;
    }


    if(carY < obCarY + carWidth && carX < obCarX + carWidth - 5 && carX + carWidth > obCarX && carY + carWidth > obCarY){
      isGameOver = true;
      alert('GAME OVER');
    }

    if(carY < obConeY + coneWidth && carX < obConeX + coneWidth - 5 && carX + carWidth > obConeX && carY + carWidth > obConeY){
      isGameOver = true;
      alert('GAME OVER');
      
    }


    ctx.font = '30px Georgia'
    ctx.fillText(`Score:${score}`, 100,40)
    intervalId = requestAnimationFrame(startGame);

    
    
   if(isGameOver){
    cancelAnimationFrame(intervalId)
    document.location.reload(true)
   }
  }
};

