(function(){
	function onPlayerHoldKey(keyCode, callback) {
		let last = null
		const callbackWrapper = () => {
			const now = new Date().getTime()
			if(last) {
				callback(Math.min(now - last, 75))
			} else {
				callback(30) //some average value to reduce input lag
			}
			last = now
		}
		window.addEventListener('keydown', e => {
			if(e.keyCode === keyCode) {
				callbackWrapper()
			}
		})
		window.addEventListener('keyup', e => {
			if(e.keyCode === keyCode) {
				last = null
			}
		})
	}
	//onPlayerHoldKey(constants.rightButton, console.log) // testing example

	window.addEventListener('keydown', e => {
		if(e.keyCode === constants.rightButton) {
			stateChangers.movePlayerRight()
		} else if(e.keyCode === constants.leftButton) {
			stateChangers.movePlayerLeft()
		}
	})

	window.addEventListener('keyup', e => {
		if(e.keyCode === constants.rightButton || e.keyCode === constants.leftButton) {
			stateChangers.slowDownPlayer()
		}
	})

	/*
  function playerMovement(e){
        switch(e.keyCode){
            case 37:
                if(state.playerPos.x > 0){
                    state.playerPos.x -= state.playerSpeed;
                    state.playerTurnedTo = 'left';
                    state.characterAnimation = 'runleft';
                    break;
                }
                else if(state.playerPos.x == 0) break;
            case 39: 
               if(state.playerPos.x < 1180){ 
                    state.playerPos.x += state.playerSpeed;
                    state.playerTurnedTo = 'right';
                    state.characterAnimation = 'run';
                break;
            }
            case 49:
                playerAttack();
                break;
            case 50:
            if(state.mana > 0){
                playerAttack();
                state.mana -= 10; 
                break;
            }
            else if(state.mana == 0) break;
        }
        $(document).keyup(function (e){ 
            if(state.playerTurnedTo =='left') state.characterAnimation = 'idleleft';
            else state.characterAnimation = 'idle';
        }) 
    }

    addEventListener("keydown", playerMovement);

    function playerAttack(){
        if(state.playerTurnedTo =='left') state.characterAnimation='attackleft';
            else state.characterAnimation ='attack';
        state.bulletPos = state.playerPos;
    }
*/
})()
