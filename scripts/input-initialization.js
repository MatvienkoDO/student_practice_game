(function(){
  function playerMovement(e){
	switch(e.keyCode){
		case 37:
			if(state.playerPos.x > 0){
				state.playerPos.x -= state.playerSpeed;
				state.characterAnimation = 'run';
				break;}
			else if(state.playerPos.x == 0) break;
		case 39:
		   if(state.playerPos.x < 1180){
				state.playerPos.x += state.playerSpeed;
				state.characterAnimation = 'run';
			break;
		}
	}
	$(document).keyup(function (e){
	state.characterAnimation = 'idle';
	})
}
addEventListener("keydown", playerMovement);
})()
