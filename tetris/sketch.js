var scl = 20;
var width = 300;
var height = 500;
var grid = [];
var gridObject = [];
var nbForm = 0;

function setup(){
    createCanvas(300,500);
    background(120);
    frameRate(5);

    for(var j = 0; j < height/scl ; j++){
        for(var i = 0; i < width/scl; i++){
            var newCell = new Cell(i,j);
            grid.push(newCell);
        }
    }

    var newForm0 = new form(5,0,6,0,7,0,8,0);
    gridObject.push(newForm0);

}

function draw(){
    showGrid();
    gridObject[gridObject.length-1].mooveY();
    updateLine();
    updateNewForm();
}

function Cell(i,j){

    this.coloration = 120;
    this.isObject = false;
    this.i = i;
    this.j = j;

    this.identifier = -1;

}

function form(iposition1,jposition1,iposition2,jposition2,iposition3,jposition3,iposition4,jposition4){

    this.iposition1 = iposition1;
    this.iposition2 = iposition2;
    this.iposition3 = iposition3;
    this.iposition4 = iposition4;
    this.jposition1 = jposition1;
    this.jposition2 = jposition2;
    this.jposition3 = jposition3;
    this.jposition4 = jposition4;
    this.mooving = true;
    this.identifier = nbForm;

    var colorObject = color(0);//(random(255),random(255),random(255));
    var colorDefault = color(120);


    this.create = function(){
        grid[index(this.iposition1,this.jposition1)].identifier = this.identifier;
        grid[index(this.iposition2,this.jposition2)].identifier = this.identifier;
        grid[index(this.iposition3,this.jposition3)].identifier = this.identifier;
        grid[index(this.iposition4,this.jposition4)].identifier = this.identifier;

        grid[index(this.iposition1,this.jposition1)].isObject = true;
        grid[index(this.iposition2,this.jposition2)].isObject = true;
        grid[index(this.iposition3,this.jposition3)].isObject = true;
        grid[index(this.iposition4,this.jposition4)].isObject = true;

        grid[index(this.iposition1,this.jposition1)].coloration = colorObject;
        grid[index(this.iposition2,this.jposition2)].coloration = colorObject;
        grid[index(this.iposition3,this.jposition3)].coloration = colorObject;
        grid[index(this.iposition4,this.jposition4)].coloration = colorObject;
    }

    this.death = function(){
        grid[index(this.iposition1,this.jposition1)].identifier = -1;
        grid[index(this.iposition2,this.jposition2)].identifier = -1;
        grid[index(this.iposition3,this.jposition3)].identifier = -1;
        grid[index(this.iposition4,this.jposition4)].identifier = -1;

        grid[index(this.iposition1,this.jposition1)].isObject = false;
        grid[index(this.iposition2,this.jposition2)].isObject = false;
        grid[index(this.iposition3,this.jposition3)].isObject = false;
        grid[index(this.iposition4,this.jposition4)].isObject = false;

        grid[index(this.iposition1,this.jposition1)].coloration = colorDefault;
        grid[index(this.iposition2,this.jposition2)].coloration = colorDefault;
        grid[index(this.iposition3,this.jposition3)].coloration = colorDefault;
        grid[index(this.iposition4,this.jposition4)].coloration = colorDefault;
    }


    this.onScreen = function(){
        if(this.jposition1+1<height/scl && this.jposition2+1<height/scl && this.jposition3+1<height/scl && this.jposition4+1<height/scl){
           return true;
        }
        else{
            return false;
        }
    }

    this.mooveY = function(){
       if(this.onScreen() && (noObjectY(this.iposition1,this.jposition1) || sameObjectY(this.iposition1,this.jposition1,this.identifier)) && (noObjectY(this.iposition2,this.jposition2) || sameObjectY(this.iposition2,this.jposition2,this.identifier)) && (noObjectY(this.iposition3,this.jposition3) || sameObjectY(this.iposition3,this.jposition3,this.identifier)) && (noObjectY(this.iposition4,this.jposition4) || sameObjectY(this.iposition4,this.jposition4,this.identifier))){
       this.death(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);

        this.jposition1++;
        this.jposition2++;
        this.jposition3++;
        this.jposition4++;
       this.create(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);

       }

        else{
            this.mooving = false;
        }

    }


    this.rotateBlock = function(){
        this.death(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);

        var itemp = this.iposition1;
        var jtemp = this.jposition1;
        this.iposition1 = this.jposition1;
        this.jposition1 = - itemp;

        var itranslation = itemp - this.iposition1;
        var jtranslation = jtemp - this.jposition1;

        this.iposition1+= itranslation;
        this.jposition1+= jtranslation;

        var temp = this.iposition2;
        this.iposition2 = this.jposition2;
        this.jposition2 = - temp;

        this.iposition2+= itranslation;
        this.jposition2+= jtranslation;

        temp = this.iposition3;
        this.iposition3 = this.jposition3;
        this.jposition3 = - temp;

        this.iposition3+= itranslation;
        this.jposition3+= jtranslation;

        temp = this.iposition4;
        this.iposition4 = this.jposition4;
        this.jposition4 = - temp;

        this.iposition4+= itranslation;
        this.jposition4+= jtranslation;
        this.create(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);
    }


}

function noObjectY(iposition,jposition){
    if(!grid[index(iposition,jposition +1)].isObject){
        return true;
    }

    else{
        return false;
    }
}

function sameObjectY(iposition,jposition,OurIdentifier){
    if(grid[index(iposition,jposition +1)].identifier === OurIdentifier){
       return true;
    }
    else{
        return false;
    }
}

function showGrid(){
   for(var k = 0; k < grid.length; k++){
       stroke(155);
        fill(grid[k].coloration);
        rect(grid[k].i * scl, grid[k].j * scl, scl, scl);
    }
}

function index(a, b) {
  if (a < 0 || b < 0 || a > (width/scl)-1 || b > (height/scl)-1) {
    return 0;
  }
  else {
      return a + b * (width/scl);
  }
}

function keyPressed(){
    if(keyCode === LEFT_ARROW){

        if(gridObject[gridObject.length-1].iposition1 > 0 && gridObject[gridObject.length-1].iposition2 > 0 && gridObject[gridObject.length-1].iposition3 > 0 && gridObject[gridObject.length-1].iposition4 > 0){
            gridObject[gridObject.length-1].death(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);
            gridObject[gridObject.length-1].iposition1--;
            gridObject[gridObject.length-1].iposition2--;
            gridObject[gridObject.length-1].iposition3--;
            gridObject[gridObject.length-1].iposition4--;
            gridObject[gridObject.length-1].create(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);
        }
    }

    if(keyCode === RIGHT_ARROW){

        if(gridObject[gridObject.length-1].iposition1 +1 < width/scl && gridObject[gridObject.length-1].iposition2 +1 < width/scl && gridObject[gridObject.length-1].iposition3 +1 < width/scl && gridObject[gridObject.length-1].iposition4 +1< width/scl){
            gridObject[gridObject.length-1].death(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);
            gridObject[gridObject.length-1].iposition1++;
            gridObject[gridObject.length-1].iposition2++;
            gridObject[gridObject.length-1].iposition3++;
            gridObject[gridObject.length-1].iposition4++;
            gridObject[gridObject.length-1].create(this.iposition1,this.jposition1,this.iposition2,this.jposition2,this.iposition3,this.jposition3,this.iposition4,this.jposition4);
        }
    }

    if(keyCode === UP_ARROW){
        gridObject[gridObject.length -1].rotateBlock();
    }
}

function updateLine(){
    //fonction check si une ligne est complète et si c'est le cas, la supprime et fait tout retomber.
    var counter = 0;

    for(var j = 0;j < height/scl;j++){
        counter = 0;
        for(var i = 0;i < width/scl;i++){
            if(!grid[index(i,j)].isObject){
                break;
            }

            else{
               counter++;
            }
        }

        if(counter === width/scl && !gridObject[gridObject.length-1].mooving){

            for(i=0;i<width/scl;i++){
                grid[index(i,j)].isObject = false;
                grid[index(i,j)].coloration = color(120);
            }

            for(var k=j-1;k>=0;k--){
                   for(var n=0;n<width/scl;n++){
                       if(grid[index(n,k)].isObject === true){
                           grid[index(n,k)].isObject = false;
                           grid[index(n,k)].coloration = color(120);
                           grid[index(n,k+1)].identifier = grid[index(n,k)].identifier;
                           grid[index(n,k)].identifier = -1;
                           grid[index(n,k+1)].coloration = color(0);
                           grid[index(n,k+1)].isObject = true;
                       }
                   }
            }
        }
    }

}

function updateNewForm(){
  if(!gridObject[gridObject.length -1].mooving){
       if(gridObject[gridObject.length -1].jposition1 > 0 && gridObject[gridObject.length -1].jposition2 > 0 && gridObject[gridObject.length -1].jposition3 > 0 && gridObject[gridObject.length -1].jposition4 > 0){
          nbForm++;
          document.getElementById('score').textContent = "Nombre de tétriminos joués: " + nbForm + "  !  ";
          var randomForm = floor(floor(random(7)));
          differentForm(randomForm);
      }

      else{
         document.getElementById('score').textContent = "GAME OVER";
      }
  }
}

function differentForm(pick){
    //Baton
    if(pick === 0){
      var newForm1 = new form(6,0,7,0,8,0,9,0);
      newForm1.identifier = nbForm;
      gridObject.push(newForm1);
    }
    //Carré
    if(pick === 1){
      var newForm2 = new form(6,0,7,0,6,1,7,1);
      newForm2.identifier = nbForm;
      gridObject.push(newForm2);
    }
    //T
    if(pick === 2){
      var newForm3 = new form(6,0,7,0,7,1,8,0);
      newForm3.identifier = nbForm;
      gridObject.push(newForm3);
    }
    //J
    if(pick === 3){
      var newForm4 = new form(6,0,7,0,8,0,8,1);
      newForm4.identifier = nbForm;
      gridObject.push(newForm4);
    }
    //Z
    if(pick === 4){
      var newForm5 = new form(6,0,7,0,7,1,8,1);
      newForm5.identifier = nbForm;
      gridObject.push(newForm5);
    }
    //L
    if(pick === 5){
      var newForm6 = new form(6,1,6,0,7,0,8,0);
      newForm6.identifier = nbForm;
      gridObject.push(newForm6);
    }
    //S
    if(pick === 6){
      var newForm7 = new form(6,1,7,1,7,0,8,0);
      newForm7.identifier = nbForm;
      gridObject.push(newForm7);
    }
}






//end
