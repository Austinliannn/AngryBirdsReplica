// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;

//Start of timer
var timer = 60;
////////////////////////////////////////////////////////////
function setup() 
{
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
    
  setupBlocker();
}
////////////////////////////////////////////////////////////
function draw() 
{
  background(0,100,0);
  fill(255);
  
  //design of the game menu to initiate the game
  textFont('Georgia');
  textAlign(CENTER);
  textSize(60);
  text("Welcome to AngryBirdClone", width/2, height/2);
  text("Press 'r' to Start!", width/2, height/1.6);
    
  if (key==='r' || key==='b' || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW)
  {
  
  background(135,206,235);
        
  Engine.update(engine);
  
  //instructions
  textSize(25);
  textAlign(LEFT);
  text("Refresh page to start new game", width/8, height/8.5);
  text("'r' to reset slingshot", width/8, height/5.8);
  text("'b' to spawn bird from cursor", width/8, height/4.4);
  text("Left/Right Key to control propeller speed", width/8, height/3.6);
  
  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();
    
//Another object
  drawBlocker()
      
  //CountDown
  drawTimer();
  }
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed()
{
  if (keyCode == LEFT_ARROW)
  {
    //your code here
    //accelarating speed
    angleSpeed -= 0.01;
    
}
  else if (keyCode == RIGHT_ARROW)
  {
    //your code here 
    //accelarating speed
    angleSpeed += 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped()
{
  //if 'b' create a new bird to use with propeller
  if (key==='b')
  {
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r')
  {
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased()
{
    setTimeout(() =>{
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body)
{
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) 
{
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) 
{
  beginShape();
  for (var i = 0; i < vertices.length; i++) 
  {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) 
{
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}

////////////////////////////////////////////////////////////
function drawTimer()
{    

  fill(255);
  textFont('Georgia');
  textSize(30); 
  textAlign(LEFT); 
  text("Time Left: " + timer, width/8, height/15);

  if (frameCount % 60 == 0 && timer > -1) 
  { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if(boxes.length == 0)
                  {
                    timer = 0;
                    textSize(100);
                    textAlign(CENTER);
                    fill(0);
                    text("YOU WIN!", width/2, height/2);
                  }
  if (timer == -1 && boxes.length > 0) 
  {
    textSize(100);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
      noLoop();
  }    
}