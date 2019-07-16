(function(){
	setInterval(stateChangers.changePlayerFrame, 50)
	setInterval(stateChangers.changeEnemyFrame, 55)

	const movementInterval = 10
	const movementCallback = () => {
		stateChangers.playerMovement(movementInterval / 1000),
		stateChangers.skeletonMovement()
		
	}
	setInterval(movementCallback, movementInterval)

	const combinedCallbacks = () => {
		stateChangers.skeletonDamageDealing()
		stateChangers.healthRegeneration()
		stateChangers.manaRegeneration()
		stateChangers.playerDeath()
	}
	setInterval(combinedCallbacks, 1000)
})()
