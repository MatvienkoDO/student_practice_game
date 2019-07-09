const stateChangers = (function(){
	const highBoundary = 1000

	return {
		startGame: (playerName) => {
			state.playerName = playerName
			state.score = 0
			state.health = 100
			state.mana = 100
			state.startTime = new Date()
			state.playerPos = { x: 0, y: 0 } // todo: temporary
		},
		changePlayerFrame: () => {
			state.characterFrameNumber = (state.characterFrameNumber + 1) % highBoundary
		}
	}
})()
