(function(){
	setInterval(stateChangers.changePlayerFrame, 50)
	setInterval(stateChangers.changeEnemyFrame, 55)

	const movementInterval = 10
	const movementCallback = () => {
		stateChangers.playerMovement(movementInterval / 1000),
		stateChangers.skeletonMovement()
		
	}
	setInterval(stateChangers.skeletonDamageDealing, 1000)
	setInterval(movementCallback, movementInterval)
	setInterval(stateChangers.healthRegeneration, 1000)
	setInterval(stateChangers.manaRegeneration, 1000)
})()
