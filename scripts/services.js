(function(){
	setInterval(stateChangers.changePlayerFrame, 50)
	setInterval(stateChangers.changeEnemyFrame, 55)
	setInterval(stateChangers.changeEnemy1Frame, 55)
	setInterval(stateChangers.changeBulletFrame, 100)

	const movementInterval = 10
	const movementCallback = () => {
		stateChangers.playerMovement(movementInterval / 1000),
		stateChangers.skeletonMovement()
		stateChangers.skeleton1Movement()
		
	}
	setInterval(movementCallback, movementInterval)

	const combinedCallbacks = () => {

		stateChangers.skeletonDamageDealing()
		stateChangers.skeleton1DamageDealing()
		stateChangers.healthRegeneration()
		stateChangers.manaRegeneration()
		stateChangers.playerDeath()
	}
	setInterval(combinedCallbacks, 1000)

	const deathCallbacks = () => {
		stateChangers.skeletonDeath()
		stateChangers.skeleton1Death()
	}
	setInterval(deathCallbacks, 100)

	const bulletInterval = 50
	const bulletCallback = () => {
		stateChangers.handleBullets(bulletInterval / 1000)
	}
	setInterval(bulletCallback, bulletInterval)
})()
