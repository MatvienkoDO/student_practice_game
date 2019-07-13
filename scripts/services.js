(function(){
	setInterval(stateChangers.changePlayerFrame, 50)
	setInterval(stateChangers.changeEnemyFrame, 60)
	setInterval(stateChangers.changeBulletFrame, 120)

	const movementInterval = 10
	const movementCallback = () => {
		stateChangers.playerMovement(movementInterval / 1000)
	}
	setInterval(movementCallback, movementInterval)
})()
