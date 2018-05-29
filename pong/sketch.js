var sensibilité = 5.5;
var scoreG = 0;
var scoreD = 0;

function raquette(){
    this.x = 0;
    this.y = -35;
    this.center = this.y + 35;

    this.show = function(){
        fill(0);
        rect(this.x,this.y,5,70);
    }
}

function ball(){
    this.x = 0;
    this.y = 0;
    this.speed_x = speedSlider.value();
    this.speed_y = 0;

    this.update = function(){
        this.x += this.speed_x;
        this.y += this.speed_y;

        if(contact(raquetteDroite,ball1) || contact(raquetteGauche,ball1)){
            var change = this.speed_x;
            this.speed_x = - change;
            this.speed_y = (Math.random()*9) - 4;
        }

        if(this.y <= -200 || this.y >= 200){
            change = this.speed_y;
            this.speed_y =  - change;
        }

        if(this.x < -300){
            scoreD++;
            document.getElementById('score').textContent = "Score :  " + scoreG + "  -  " + scoreD;
            this.x = 0;
            this.y = 0;
            this.speed_y = 0;
            this.speed_x = speedSlider.value();
        }

        if(this.x > 300){
            scoreG++;
            document.getElementById('score').textContent = "Score : " + scoreG + "  -  " + scoreD;
            this.x = 0;
            this.y = 0;
            this.speed_y = 0;
            this.speed_x = speedSlider.value();
        }
    }

    this.show = function(){
        fill(167, 244, 66);
        ellipse(this.x,this.y,10,10);
    }
}

var raquetteGauche;
var raquetteDroite;
var ball1;
var speedSlider;

function setup(){
    createCanvas(600,400);
    speedSlider = createSlider(0.2,15,4,0.2);

    ball1 = new ball;

    raquetteGauche = new raquette();
    raquetteGauche.x = -290;

    raquetteDroite = new raquette();
    raquetteDroite.x = 285;
}

function draw(){
    background(220);
    translate(300,200);

    updateKey();

    raquetteDroite.show();
    raquetteGauche.show();

    ball1.update();
    ball1.show();

}

function updateKey(){
    if(keyIsDown(65)){
        raquetteGauche.y -= sensibilité;
    }

    if(keyIsDown(81)){
        raquetteGauche.y += sensibilité;
    }

    if(keyIsDown(80)){
        raquetteDroite.y -= sensibilité;
    }

    if(keyIsDown(77)){
        raquetteDroite.y += sensibilité;
    }
}

function contact(object1,object2){
    var ballHitRaquette = object2.y >= object1.y && object2.y <= (object1.y)+70;
    if(Math.abs(object1.x - object2.x)<= (speedSlider.value())/2 && ballHitRaquette){
        return true;
    }else{return false;}
}
