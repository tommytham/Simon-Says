var colors = ["green","red","yellow","blue"];
var level = 0; 
var index = 0;
var turn = 0;
var simonsColors = [];
var usersColors = []
var gameStarted = false;

$(document).on("keydown", function(event){

    
    if(gameStarted === false){
        gameStarted = true;
        simonPicks();
        console.log("change text");
        $("h1").css("color","white");
        
    }
    
});

$(".btn").on("click", function(event){
    if(gameStarted === true){
        var userChosenColor = this.id;
        usersColors.push(userChosenColor);
        animateClick(userChosenColor);
        checkAnswer();
    }

    
})

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.volume = 0.1;
    audio.play();
}

function animateClick(buttonClicked){
    $("."+buttonClicked).addClass("pressed");
    setTimeout(
        function(){
            $("."+buttonClicked).removeClass("pressed")
        },
        500);
}

function checkAnswer(){
    if(simonsColors[index] === usersColors[index]){
        playSound(usersColors[index]);
        //level complete
        if(index === (simonsColors.length-1)){
            simonPicks();
            index = 0;
            usersColors = [];
        }
        else{
            index++
        }
    }
    else{
        playSound("wrong");
        resetGame();
    }

}

function resetGame(){
    $("h1").text("GAME OVER! Your score is "+level);
    level = 0;
    simonsColors = [];
    usersColors = [];
    gameStarted = false;
}

function simonPicks(){
    increaseLevel();
    var lastColorPicked = simonsColors[(simonsColors.length)-1];
    setTimeout(function(){
        $("."+lastColorPicked).addClass("pressed");
        playSound(lastColorPicked);
    },1000);
    
    setTimeout(function(){
        $("."+lastColorPicked).removeClass("pressed");
    },2000); 
    

}



function increaseLevel(){
    var colorPick = Math.floor(Math.random()*4);
    simonsColors.push(colors[colorPick]);
    level++;
    $("h1").text("Level "+level);
}

console.log(simonsColors);
