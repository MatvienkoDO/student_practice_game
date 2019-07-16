const stateChangers = (function(){
	const highBoundary = 1000
	const playerMaxSpeedRight = 300
	const playerMaxSpeedLeft = -300
	const skeletonDamage = constants.isDev ? 10 : 10
	const bulletDamage = 5
	const manaSpendLight = 7
	const manaSpend = 15
	const pointPerEnemy = 100

	return {
		startGame: (playerName) => {
			state.playerName = playerName
			state.score = 0
			state.health = 100
			state.mana = 100
			state.startTime = new Date()
			state.playerPos = { x: 600, y: 390 } // todo: temporary
			state.playerSpeed = 0;
			state.playerTurnedTo = 'right'
			state.skeletonHealth = 100
			state.skeleton1Health = 100
			state.waterBullets = []
			state.fireBullets = []
			state.attackType = 1;

		},
		changePlayerFrame: () => {
			state.characterFrameNumber = (state.characterFrameNumber + 1) % highBoundary
		},
		changeEnemyFrame: () => {
			state.skeletonFrameNumber = (state.skeletonFrameNumber + 1) % highBoundary
		},
		changeEnemy1Frame: () => {
			state.skeleton1FrameNumber = (state.skeleton1FrameNumber + 1) % highBoundary
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
		playerAttack: (attackType) => {
			state.characterAnimation = 'attack'
			if(state.playerTurnedTo === 'left'){
				state.characterAnimation = 'attackleft'
			}
			setTimeout(stateChangers.calmDownPlayer, 350)
			if (attackType == 1 && state.mana > manaSpendLight){
				state.attackType = 1
				state.mana -= manaSpendLight
				stateChangers.createBullet(state.playerPos.x + 70, state.playerPos.y + 70, state.playerTurnedTo, 1)
			}
			if (attackType == 2 && state.mana > manaSpend) {
				state.attackType = 2
				state.mana -= manaSpend
				stateChangers.createBullet(state.playerPos.x + 70, state.playerPos.y + 70, state.playerTurnedTo, 2)
			}
		},
		createBullet: (x, y, direction, colour) => {
			state.bullets.push({
				x,
				y,
				direction,
				colour // 1(blue) or 2(red)
			})
		},
		handleBullets: (diff) => {
			const bulletSpeed = 400 // todo: adjust it later
			const radius = 90

			const bullets = state.bullets
			.map(bullet => {
				bullet.x += bulletSpeed * diff * (bullet.direction === 'right' ? 1 : -1)
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

			bullets.forEach(b => {
				const {x, y} = state.skeleton1Pos
				const dx = x - b.x
				const dy = y - b.y
				const distance = Math.sqrt(dx * dx + dy * dy)
				if(distance < radius) {
					state.skeleton1Health -= bulletDamage
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
				state.score += pointPerEnemy
			}
		},
		skeletonRegeneration:() =>{
			state.skeletonHealth = 100
			state.skeletonAnimation = 'walk'
			state.skeletonPos = { x: 1280, y: 380 }
		},
		manaWaist: () =>{
			state.mana -= manaSpend
		},
		skeleton1Movement: (diff) => {
			if(state.skeleton1Pos.x > state.playerPos.x && state.skeleton1Health > 0){
				state.skeleton1Pos.x -= 1;

				if(state.skeleton1Animation === 'attack') {
					state.skeleton1Animation = 'walk'
				}
				if(state.skeleton1Animation === 'walkright') {
					state.skeleton1Animation = 'walk'
				}
				if(state.skeleton1Animation === 'attackright') {
					state.skeleton1Animation = 'walk'
				}
			}
			if(state.skeleton1Pos.x < state.playerPos.x  && state.skeleton1Health > 0){
				state.skeleton1Pos.x += 1;

				if(state.skeleton1Animation === 'walk') {
					state.skeleton1Animation = 'walkright'
				}
				if(state.skeleton1Animation === 'attackright') {
					state.skeleton1Animation = 'walkright'
				}
				if(state.skeleton1Animation === 'attack') {
					state.skeleton1Animation = 'walkright'
				}
			}
			if(state.skeleton1Pos.x === state.playerPos.x && state.skeleton1Animation === 'walk') {
				state.skeleton1Animation = 'attack'
			}
			if(state.skeleton1Pos.x === state.playerPos.x && state.skeleton1Animation === 'walkright') {
				state.skeleton1Animation = 'attackright'
			}
		},
		skeleton1DamageDealing: () =>{
			if(state.skeleton1Pos.x === state.playerPos.x && state.health>0)state.health -= skeletonDamage;
		},
		skeleton1Death: () =>{
			if(state.skeleton1Health <= 0){
				if(state.skeleton1Animation === 'walk') state.skeleton1Animation = 'death'
				if(state.skeleton1Animation === 'walkright') state.skeleton1Animation = 'deathright'
				setTimeout(stateChangers.skeleton1Regeneration, 550)
				state.score += pointPerEnemy
			}
		},
		skeleton1Regeneration:() =>{
			state.skeleton1Health = 100
			state.skeleton1Animation = 'walk'
			state.skeleton1Pos = { x: -200, y: 380 }
		},
	}
})()
