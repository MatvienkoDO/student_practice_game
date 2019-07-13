(function(){
	setInterval(stateChangers.changePlayerFrame, 50)
	setInterval(stateChangers.changeEnemyFrame, 60)

	const movementInterval = 10
	const movementCallback = () => {
		stateChangers.playerMovement(movementInterval / 1000)
	}
	setInterval(movementCallback, movementInterval)
})()
