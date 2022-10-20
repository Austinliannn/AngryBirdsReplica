////////////////////////////////////////////////////////////////
function setupGround()
{
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround()
{
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller()
{
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15 , {isStatic:true, angle:angle});
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller()
{
  push();
  // your code here    
  //setting angle
  Body.setAngle(propeller,angle);
  Body.setAngularVelocity(propeller, angleSpeed);
    
  //speed of propeller
  angle += angleSpeed;
    
  //drawing propeller
  fill(255,0,0);
  drawVertices(propeller.vertices);    
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird()
{
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  //looping over birds array
  for (var i = 0; i < birds.length; i++)
  {
      //draw bird
      fill(220, 20, 60);
      drawVertices(birds[i].vertices);
      if (isOffScreen(birds[i]))
          {
              //removing birds from world and array
              removeFromWorld(birds[i]);
              birds.splice(i, 1);
              i--;
          }
  }
  
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower()
{   
  //you code here    
  //tower set up
  var cols = 3;
  var rows = 6;
  var spacing = 80;
  for (var j = 0; j < rows; j++) 
  {
    for (var i = 0; i < cols; i++) 
    {
      var x = i * spacing;
      if (j % 1 == 0) 
      {
        x += spacing/0.11;
      }
      var y = spacing + j * spacing + 55;        
      var cubes = Bodies.rectangle(x, y, 80,80);
      World.add(engine.world, [cubes]);
      boxes.push(cubes);
        
    //random shades of green
    //var newColor = color(random(0), random(60,255), random(0));    
        
    //random shades and random colors
      var newColor = color(random(0), random(60,255), random(60,255));   
      colors.push(newColor); 
    }
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower()
{
  push();
  //your code here
  for (var i=0; i<boxes.length; i++)
      { 
          //random shades of green array
          fill(colors[i]);
          drawVertices(boxes[i].vertices);
          
          //drawing boxes
            if (isOffScreen(boxes[i]))
                {
                //removing birds from world and array
                removeFromWorld(boxes[i]);
                boxes.splice(i, 1);
                colors.splice(i, 1);
                i--;
                }
      }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot()
{
//your code here
  slingshotBird = Bodies.circle(210, 240, 20, {friction: 0, restitution: 0.95 });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  slingshotConstraint = Constraint.create({
      pointA: {x: 210, y: 220},
      bodyB: slingshotBird,
      stiffness: 0.01,
      damping: 0.0001 
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot()
{
  push();
  // your code here
  fill(255, 165, 0);
  drawVertices(slingshotBird.vertices);
    

  stroke(128);
  strokeWeight(3);
  drawConstraint(slingshotConstraint);
    
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

//another object
////////////////////////////////////////////////////////////////
function setupBlocker()
{
  // your code here
  blocker = Bodies.rectangle(650, random(180,400), 30, random(100,200), {isStatic: true});
  World.add(engine.world, [blocker]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawBlocker()
{
  push();
  // your code here 
  //drawing propeller
  fill(255,99,71);
  drawVertices(blocker.vertices); 
  pop();
}
