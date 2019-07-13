const stateChangers = (function(){
	const highBoundary = 1000
	const playerMaxSpeedRight = 300
	const playerMaxSpeedLeft = -300

	return {
		startGame: (playerName) => {
			state.playerName = playerName
			state.score = 0
			state.health = 100
			state.mana = 100
			state.startTime = new Date()
			playerTurnedTo: 'right'
			state.playerPos = { x: 10, y: 390 } // todo: temporary
			state.playerSpeed = 0;

		},
		changePlayerFrame: () => {
			state.characterFrameNumber = (state.characterFrameNumber + 1) % highBoundary
		},
		changeEnemyFrame: () => {
			state.skeletonFrameNumber = (state.skeletonFrameNumber + 1) % highBoundary
		},
		changeBulletFrame: () => {
			state.bulletFrameNumber = (state.bulletFrameNumber + 1) % highBoundary
		},	
		playerMovement: diff => {
			state.playerPos.x += diff * state.playerSpeed
			if(Math.abs(state.playerSpeed) < 1 && state.characterAnimation === 'run') {
				state.characterAnimation = 'idle'
			} else if(state.characterAnimation === 'idle') {
				state.characterAnimation = 'run'
			}
		},
		movePlayerRight: () => {
			state.playerSpeed = Math.min(
				playerMaxSpeedRight,
				state.playerSpeed + (playerMaxSpeedRight - state.playerSpeed) / 10
			)
		},
		movePlayerLeft: () => {
			state.playerSpeed = Math.max(
				playerMaxSpeedLeft,
				state.playerSpeed + (playerMaxSpeedLeft - state.playerSpeed) / 10
			)
		},
		slowDownPlayer: () => {
			state.playerSpeed = 0
		}
	}
})()
