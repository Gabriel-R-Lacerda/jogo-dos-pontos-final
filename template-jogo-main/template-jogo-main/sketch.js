var inimigo
var P1
var espadas;
var bolas;
var player1
var Bolas
var Inimigo
var Espadas
var pontos = 0
var mortes = 0
var gol
var Derrota
var trofeu

function preload(){
    //carrega as imagens
    P1 = loadImage("Personagem_principal.png");
  inimigo = loadImage("inimigo1.png")
  espadas = loadAnimation("espada1.png","espada2.png","espada3.png")
  bolas = loadImage("Bola.png")
  campo = loadImage("campo.jpg")
  Gol = loadSound("gol.mp3")
 derrota = loadImage("perdeu.png")
 vitoria = loadImage("ganhou.png")
}
function setup() {
    createCanvas(windowWidth,windowHeight);
    //cria grupos
    
     
    Bolas = new Group();
    //cria a sprite
    Derrota = createSprite(windowHeight/2, 200, 50, 50)
    Derrota.addImage(derrota)
    Derrota.scale = 1
    Derrota.visible = false
    
    trofeu = createSprite(windowHeight/2, 200, 50, 50)
    trofeu.addImage(vitoria)
    trofeu.scale = 1
    trofeu.visible = false

     player1 = createSprite(200, windowHeight/2, 20, 20);
     player1.addImage(P1);
     player1.scale = 0.5;
     player1.setCollider("rectangle", -77.54, 0, 210, 220)
     
     Inimigo = createSprite(1300, windowHeight/2, 20, 20)
     Inimigo.addImage(inimigo)
     Inimigo.scale = 1.2
     Inimigo.setCollider("rectangle", -70, 0, 10, 140)
     Inimigo.debug = true
     
     Bolas = createSprite(Inimigo.x, Inimigo.y, 20, 20)
     Bolas.addImage(bolas)
     Bolas.scale = 0.25

     Espadas = createSprite(player1.x, player1.y, 20, 20)
     Espadas.addAnimation("girando1",espadas)
    Espadas.scale = 0.25
    Espadas.debug
    if(Inimigo.velocityY <= 0){
      Inimigo.velocityY = -2
    }
    


}


function draw() {
    background(campo);
   
fill("white");
  textSize(40);
  

 text("pontos" + pontos, 800, 50);

 text("mortes" + mortes, 100, 50);
  if (Bolas.isTouching(player1)) {
    mortes += 1;
    
  }
  
  if (Espadas.isTouching(Inimigo)) {
    pontos += 1;
    Inimigo.velocityY +5
    Gol.play()
  }

  if(Espadas.velocityX <= 0){
    Espadas.y = player1.y 
  Espadas.x = player1.x}


  if (keyIsDown(UP_ARROW)){
    player1.y -= 7}
  if (keyIsDown(DOWN_ARROW)){
    player1.y += 7
  }
  if(keyCode == 32){
    Espadas.velocityX = 15
  }
  if(Espadas.x > windowWidth + 20|| Espadas.isTouching(Inimigo)){
    Espadas.x = player1.x
    Espadas.y = player1.y
    Espadas.velocityX = 0
    keyCode = 0
  }

 if(Inimigo.y <= 105){
  Inimigo.velocityY += 7
 }
 if(Inimigo.y >= height-105){
  Inimigo.velocityY -= 6.2
 }
  
  if(player1.y <= 50){
    player1.y += 100
  }
  if(player1.y >= height-60){
    player1.y -= 100
  }
  
  if(frameCount % 40 === 0){
    Bolas.velocityX = -14
    console.log("arroz")
  }
 if(Bolas.isTouching(player1) || Bolas.x <= 0){
  Bolas.y = Inimigo.y
  Bolas.x = Inimigo.x
 }

 if(pontos % 10 === 0){
  Bolas.velocityX += -2
 }


  if(Bolas.velocityX == 0){
  Bolas.x = Inimigo.x
  Bolas.y = Inimigo.y}
 
  

  Espadas.depth = player1.depth-1
  Bolas.depth = Inimigo.depth-1
  

  drawSprites();

  if(pontos >= 1){
    trofeu.visible = true
    text("Parabéns, você venceu, que belo artilheiro,\n pressione f5 para jogar de novo", 500, 200)
  Bolas.visible = false
  pontos.visible = false
  player1.visible = false
  Inimigo.visible = false
  Espadas.visible = false
  mortes.visible = false
  }

  if(mortes >= 10){
    Derrota.visible = true
    text("Que pena, esse goleiro é muito bom, \n aperte f5 para jogar de novo", 500, 200)
    Bolas.visible = false
  player1.visible = false
  Inimigo.visible = false
  Espadas.visible = false
  }
  
   
}



