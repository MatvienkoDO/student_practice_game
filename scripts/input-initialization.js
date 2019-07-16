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
		if(e.keyCode === constants.attackOneButton){
			stateChangers.playerAttack(1)
		}
		if(e.keyCode === constants.attackTwoButton){
			stateChangers.playerAttack(2)
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
*/
})()
