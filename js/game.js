class Game{
    constructor(){
         
    }
    getState(){
        var gameStateref = database.ref('gameState');
        gameStateref.on("value",function(data){
            gameState = data.val();
        })
    
    }
    update(state){
        database.ref('/').update({
            gameState:state
        })
    
        
    }
    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountREF = await database.ref('playerCount').once("value")
            if(playerCountREF.exists()){
                playerCount = playerCountREF.val()
                player.getCount();
            }
           
            form = new Form();
            form.display();
            
        }

    }

    play(){
        form.hide()
        textSize(30)
        text("gameStart",120,100)
        Player.getPlayerInfo()    
        if(allPlayers !== undefined){
           var displayPOS = 130;
           for(var plr in allPlayers){
               if(plr === "player"+player.index){
                   fill("red");
               }
               else{
                   fill("black")
               }
               displayPOS+=20
               textSize(15)
               text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,displayPOS)

           } 

        }
       if(keyIsDown(UP_ARROW) && player.index !== null){
          player.distance+=50
          player.update()
       }
    }
}