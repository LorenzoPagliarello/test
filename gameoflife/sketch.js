var scl = 20;
var height = 500;
var width = 500;
var grid = [];
var start = -1;

function index(a, b) {
  if (a < 0 || b < 0 || a > (width/scl)-1 || b > (height/scl)-1) {
    return 0;
  }
  else {
      return a + b * (width/scl);
  }
}


function updateCell(cells){
    var vie = [];
    var connexe = 0;

    vie[0] = grid[cells.topLeft].alive;
    vie[1] = grid[cells.top].alive;
    vie[2] = grid[cells.topRight].alive;
    vie[3] = grid[cells.left].alive;
    vie[4] = grid[cells.right].alive;
    vie[5] = grid[cells.botLeft].alive;
    vie[6] = grid[cells.bot].alive;
    vie[7] = grid[cells.botRight].alive;

    connexe = vie[0] + vie[1] + vie[2] + vie[3] + vie[4] + vie[5] + vie[6] + vie[7];

    if(connexe == 3){
            cells.alive = 1;
            return;
        }

    if(cells.alive ==1 && connexe == 2){
            cells.alive = 1;
            return;
        }

    cells.alive = 0;


}


function keyPressed(){
    if(keyCode === ENTER){
        start =  - start;
    }
}

function mouseClicked(){
    var indiceMouse = index(floor(mouseX / scl), floor(mouseY / scl));
    grid[indiceMouse].alive = 1;
}


function cell(i,j){
    this.i = i;
    this.j = j;
    this.alive = 0;

    this.topLeft= index(i-1,j-1);
    this.top=index(i,j-1);
    this.topRight=index(i+1,j-1);
    this.left=index(i-1,j);
    this.right=index(i+1,j);
    this.botLeft=index(i-1,j+1);
    this.bot=index(i,j+1);
    this.botRight=index(i+1,j+1);

    this.show = function(){
        if(this.alive == 1){
            fill(220,0,0);
            rect(i*scl,j*scl,scl,scl);
        }
    }

}


function setup() {
    createCanvas(500,500);
    frameRate(5);

    for(var c = 0; c < height / scl; c++ ){
        for(var l = 0; l < width / scl; l++){
            var newCell = new cell(l,c);
            grid.push(newCell);
        }
    }
}

function draw() {
    background(120);

    if(start === 1){
        for(var k=0; k < grid.length; k++){
            updateCell(grid[k]);
        }
    }

    for( k = 0; k < grid.length; k++){
        grid[k].show();
    }
}


function showAll(){
    for(var k=0; k < grid.length; k++){
        console.log(grid[k].alive);
    }
}




//End
