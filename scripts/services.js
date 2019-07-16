(function(){
	setInterval(stateChangers.changePlayerFrame, 50)
	setInterval(stateChangers.changeEnemyFrame, 55)
	setInterval(stateChangers.changeBulletFrame, 100)

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
		stateChangers.skeletonDeath()
	}
	setInterval(combinedCallbacks, 1000)

	const bulletInterval = 50
	const bulletCallback = () => {
		stateChangers.handleBullets(bulletInterval / 1000)
	}
	setInterval(bulletCallback, bulletInterval)
})()
