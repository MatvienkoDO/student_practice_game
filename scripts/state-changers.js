const stateChangers = (function(){
	const highBoundary = 1000
	const playerMaxSpeedRight = 300
	const playerMaxSpeedLeft = -300
	const skeletonDamage = constants.isDev ? 25 : 5
	const bulletDamage = 15
	const manaSpend = 15

	return {
		startGame: (playerName) => {
			state.playerName = playerName
			state.score = 200
			state.health = 100
			state.mana = 100
			state.startTime = new Date()
			state.playerPos = { x: 10, y: 390 } // todo: temporary
			state.playerSpeed = 0;
			state.playerTurnedTo = 'right'
			state.skeletonHealth = 100
			state.bullets = []
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
			state.playerPos.x = Math.max(0, Math.min(state.playerPos.x + diff * state.playerSpeed, 1180))

		const absSpeed = Math.abs(state.playerSpeed)
			if(absSpeed < 1 && (state.characterAnimation === 'run' || state.characterAnimation === 'runleft')) {
				if(state.playerTurnedTo === 'right') state.characterAnimation = 'idle'
				else if(state.playerTurnedTo === 'left') state.characterAnimation = 'idleleft'
			}
			if(absSpeed >= 1 && (state.characterAnimation === 'idle' || state.characterAnimation === 'idleleft')) {
				if(state.playerTurnedTo === 'right') state.characterAnimation = 'run'
				else if(state.playerTurnedTo === 'left') state.characterAnimation = 'runleft'
			}
		},
		movePlayerRight: () => {
			state.playerSpeed = Math.min(
				playerMaxSpeedRight,
				state.playerSpeed + (playerMaxSpeedRight - state.playerSpeed)
			)
			state.playerTurnedTo = 'right'
		},
		movePlayerLeft: () => {
			state.playerSpeed = Math.max(
				playerMaxSpeedLeft,
				state.playerSpeed + (playerMaxSpeedLeft - state.playerSpeed)
			)
			state.playerTurnedTo = 'left'
		},
		slowDownPlayer: () => {
			state.playerSpeed = 0
		},
		calmDownPlayer:() =>{
			state.characterAnimation = 'idle'
			if(state.playerTurnedTo === 'left'){
				state.characterAnimation = 'idleleft'
			}
		},
		playerAttack: (i) => {
			state.characterAnimation = 'attack'
			if(state.playerTurnedTo === 'left'){
				state.characterAnimation = 'attackleft'
			}
			setTimeout(stateChangers.calmDownPlayer,350)
			stateChangers.createBullet(state.playerPos.x + 70, state.playerPos.y + 70, state.playerTurnedTo)
			if (i==2){
				stateChangers.manaWaist()
				state.bulletAnimation = 'fire'
			}
		},
		createBullet: (x, y, direction) => {
			state.bullets.push({
				x,
				y,
				direction // 'right' of 'left'
			})
		},
		handleBullets: (diff) => {
			const bulletSpeed = 400 // todo: adjust it later
			const radius = 90

			const bullets = state.bullets
			.map(bullet => {
				bullet.x += bulletSpeed * diff * (bullet.direction === 'right' ? 1 : -1)
				if (bullet.direction === 'left') state.bulletAnimation = 'waterleft'
				if (bullet.direction === 'right') state.bulletAnimation = 'water'
				return bullet
			})
			.filter(bullet =>
				bullet.x > 0 &&
				bullet.x < constants.canvas.width &&
				bullet.y > 0 &&
				bullet.y < constants.canvas.height
			)

			state.bullets = bullets

			bullets.forEach(b => {
				const {x, y} = state.skeletonPos
				const dx = x - b.x
				const dy = y - b.y
				const distance = Math.sqrt(dx * dx + dy * dy)
				if(distance < radius) {
					state.skeletonHealth -= bulletDamage
				}
			})
		},		
		skeletonMovement: (diff) => {
			if(state.skeletonPos.x > state.playerPos.x && state.skeletonHealth > 0){
				state.skeletonPos.x -= 1;

				if(state.skeletonAnimation === 'attack') {
					state.skeletonAnimation = 'walk'
				}
				if(state.skeletonAnimation === 'walkright') {
					state.skeletonAnimation = 'walk'
				}
				if(state.skeletonAnimation === 'attackright') {
					state.skeletonAnimation = 'walk'
				}
			}
			if(state.skeletonPos.x < state.playerPos.x  && state.skeletonHealth > 0){
				state.skeletonPos.x += 1;

				if(state.skeletonAnimation === 'walk') {
					state.skeletonAnimation = 'walkright'
				}
				if(state.skeletonAnimation === 'attackright') {
					state.skeletonAnimation = 'walkright'
				}
				if(state.skeletonAnimation === 'attack') {
					state.skeletonAnimation = 'walkright'
				}
			}
			if(state.skeletonPos.x === state.playerPos.x && state.skeletonAnimation === 'walk') {
				state.skeletonAnimation = 'attack'
			}
			if(state.skeletonPos.x === state.playerPos.x && state.skeletonAnimation === 'walkright') {
				state.skeletonAnimation = 'attackright'
			}
		},
		skeletonDamageDealing: () =>{
			if(state.skeletonPos.x === state.playerPos.x && state.health>0)state.health -= skeletonDamage;
		},
		healthRegeneration: () => {
			if(state.health < 100) state.health += 2;
		},
		manaRegeneration: () => {
			if(state.mana < 100) state.mana += 5;
		},
		playerDeath: () =>{
			if(state.health <= 0){
				state.characterAnimation = 'death'
				if(state.playerTurnedTo === 'left') state.characterAnimation = 'deathleft'
			}
		},
		skeletonDeath: () =>{
			if(state.skeletonHealth <= 0){
				if(state.skeletonAnimation === 'walk') state.skeletonAnimation = 'death'
				if(state.skeletonAnimation === 'walkright') state.skeletonAnimation = 'deathright'
				setTimeout(stateChangers.skeletonRegeneration, 550)
			}
		},
		skeletonRegeneration:() =>{
			state.skeletonHealth = 100
			state.skeletonAnimation = 'walk'
			state.skeletonPos = { x: 1000, y: 380 }
		},
		manaWaist: () =>{
			state.mana -= manaSpend
		}
	}
})()
