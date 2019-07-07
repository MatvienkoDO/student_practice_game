const stateChangers = (function(){
	return {
		startGame: (playerName) => {
			state.playerName = playerName
			state.startTime = new Date()
		}
	}
})()