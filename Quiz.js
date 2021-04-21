class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",(data)=>{
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    textSize(20)
    stroke (4)
    fill (0)
    text ("Result of the Quiz",380,70)
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      var disAns=230
      fill ("blue");
      textSize(15);
      text ("NOTE: Contestants who answered the questions right are highlighted in green.",120,230)

      //fill ("blue");
     // textSize(15);
      //text ("Contestant\t\t\t\tAnswer",250,225)

      for(var plr in allContestants){
        var corAns="2";
        if(corAns===allContestants[plr].answer)
        fill ("green")
      else
        fill ("red")
    
        disAns+=30
        textSize(15);
        text (allContestants[plr].name+" : "+allContestants[plr].answer,270,disAns);
  
      }
    } 
  }
}