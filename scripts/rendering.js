const render = (function(){
	function renderScore(context, fontSize) {
		context.fillStyle = 'white'
		context.font = `${fontSize}px sans-serif`
		context.fillText(`Score: ${state.score}`, 10, 10 + fontSize)
	}

	const hpBarConf = constants.healthBarConfig
	const hpBarPos = constants.healthBarConfig.leftTopCorner
	const hpBordW = constants.healthBarConfig.borderWidth
	function renderHealth(context) {
		context.fillStyle = hpBarConf.borderColor

		context.fillRect(hpBarPos.x, hpBarPos.y, hpBarConf.width, hpBarConf.height)

		context.fillStyle = hpBarConf.backgroundColor

		context.fillRect(hpBarPos.x + hpBordW, hpBarPos.y + hpBordW,
			hpBarConf.width - 2 * hpBordW, hpBarConf.height - 2 * hpBordW)

		context.fillStyle = hpBarConf.healthColor

		const health = Math.max(0, Math.min(state.health, 100))
		const hpWidth = (hpBarConf.width - 2 * hpBordW) * (health / 100)

		context.fillRect(hpBarPos.x + hpBordW, hpBarPos.y + hpBordW,
			hpWidth, hpBarConf.height - 2 * hpBordW)
	}

	const mnBarConf = constants.manaBarConfig
	const mnBarPos = constants.manaBarConfig.leftTopCorner
	const mnBordW = constants.manaBarConfig.borderWidth
	function renderMana(context) {
		context.fillStyle = mnBarConf.borderColor

		context.fillRect(mnBarPos.x, mnBarPos.y, mnBarConf.width, mnBarConf.height)

		context.fillStyle = mnBarConf.backgroundColor

		context.fillRect(mnBarPos.x + mnBordW, mnBarPos.y + mnBordW,
			mnBarConf.width - 2 * mnBordW, mnBarConf.height - 2 * mnBordW)

		context.fillStyle = mnBarConf.manaColor

		const mana = Math.max(0, Math.min(state.mana, 100))
		const mnWidth = (mnBarConf.width - 2 * mnBordW) * (mana / 100)

		context.fillRect(mnBarPos.x + mnBordW, mnBarPos.y + mnBordW,
			mnWidth, mnBarConf.height - 2 * mnBordW)
	}

	const background = new Image()
	background.src = 'pictures/full-background.png'
	function renderBackground(context) {
		context.drawImage(background,
			0, 0, background.width, background.height,
			0, 0, constants.canvas.width, constants.canvas.height)
	}

	const character = {
		idle: [],
		run: [],
		idleleft: [],
		runleft: [],
		attack: [],
		attackleft: [],
		death: [],
		deathleft: []
	}

	for(let i = 1; i <= 17; ++i) {
		const frame = new Image()
		frame.src = `pictures/character/idle/idle00${i < 10 ? '0' : ''}${i}.png`
		character.idle.push(frame)
	}


	for(let i = 1; i <= 17; ++i) {
		const frame = new Image()
		frame.src = `pictures/character/run/run00${i < 10 ? '0' : ''}${i}.png`
		character.run.push(frame)
	}

	for(let i = 1; i <= 17; ++i) {
		const frame = new Image()
		frame.src = `pictures/characterleft/idle/idle00${i < 10 ? '0' : ''}${i}.png`
		character.idleleft.push(frame)
	}

	for(let i = 1; i <= 17; ++i) {
		const frame = new Image()
		frame.src = `pictures/characterleft/run/run00${i < 10 ? '0' : ''}${i}.png`
		character.runleft.push(frame)
	}

	for(let i = 13; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/character/attack/attack100${i < 10 ? '0' : ''}${i}.png`
		character.attack.push(frame)
	}

	for(let i = 13; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/characterleft/attack/attack100${i < 10 ? '0' : ''}${i}.png`
		character.attackleft.push(frame)
	}

	for(let i = 3; i <= 39; ++i) {
		const frame = new Image()
		frame.src = `pictures/character/death/death00${i < 10 ? '0' : ''}${i}.png`
		character.death.push(frame)
	}

	for(let i = 3; i <= 39; ++i) {
		const frame = new Image()
		frame.src = `pictures/characterleft/death/death00${i < 10 ? '0' : ''}${i}.png`
		character.deathleft.push(frame)
	}


	function renderCharacter(context) {
		const frameNumber = state.characterFrameNumber % character[state.characterAnimation].length
		const frame = character[state.characterAnimation][frameNumber]

		// todo: do some calculations and logic about position and size
		if (state.characterAnimation=='attack') context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.playerPos.x, state.playerPos.y, 250, 196);
		else if (state.characterAnimation=='attackleft') context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.playerPos.x-68, state.playerPos.y, 250, 196);
		else context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.playerPos.x, state.playerPos.y, 175, 200);
	}

	const enemy = {
		walk: [],
		attack: [],
		walkright: [],
		attackright: [],
		death: [],
		deathright: []
	}

	for(let i = 4; i <= 23; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemy/walk/FW_Skeleton_Walking__0${i < 10 ? '0' : ''}${i}.png`
		enemy.walk.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemy/attack/FW_Skeleton_Attack__0${i < 10 ? '0' : ''}${i}.png`
		enemy.attack.push(frame)
	}
	for(let i = 4; i <= 23; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemyright/walkright/FW_Skeleton_Walking__0${i < 10 ? '0' : ''}${i}.png`
		enemy.walkright.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemyright/attackright/FW_Skeleton_Attack__0${i < 10 ? '0' : ''}${i}.png`
		enemy.attackright.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemyright/deathright/FW_Skeleton_Die__0${i < 10 ? '0' : ''}${i}.png`
		enemy.deathright.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemy/death/FW_Skeleton_Die__0${i < 10 ? '0' : ''}${i}.png`
		enemy.death.push(frame)
	}
	const enemy1 = {
		walk: [],
		attack: [],
		walkright: [],
		attackright: [],
		death: [],
		deathright: []
	}

	for(let i = 4; i <= 23; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemy/walk/FW_Skeleton_Walking__0${i < 10 ? '0' : ''}${i}.png`
		enemy1.walk.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemy/attack/FW_Skeleton_Attack__0${i < 10 ? '0' : ''}${i}.png`
		enemy1.attack.push(frame)
	}
	for(let i = 4; i <= 23; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemyright/walkright/FW_Skeleton_Walking__0${i < 10 ? '0' : ''}${i}.png`
		enemy1.walkright.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemyright/attackright/FW_Skeleton_Attack__0${i < 10 ? '0' : ''}${i}.png`
		enemy1.attackright.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemyright/deathright/FW_Skeleton_Die__0${i < 10 ? '0' : ''}${i}.png`
		enemy1.deathright.push(frame)
	}
	for(let i = 0; i <= 19; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemy/death/FW_Skeleton_Die__0${i < 10 ? '0' : ''}${i}.png`
		enemy1.death.push(frame)
	}

	const enemyHpWidth = 100
	const enemyHpHeight = 8
	const enemyHpBorderWidth = 1
	const magicOffset = 40
	function renderEnemyHealth(context, enemyX, enemyY) {
		context.fillStyle = hpBarConf.borderColor

		context.fillRect(enemyX, enemyY, enemyHpWidth, enemyHpHeight)

		context.fillStyle = hpBarConf.backgroundColor

		context.fillRect(enemyX + enemyHpBorderWidth, enemyY + enemyHpBorderWidth,
			enemyHpWidth - 2 * enemyHpBorderWidth, enemyHpHeight - 2 * enemyHpBorderWidth)

		context.fillStyle = hpBarConf.healthColor
		const health = Math.max(0, Math.min(state.skeletonHealth, 100))
		const hpWidth = (enemyHpWidth - 2 * enemyHpBorderWidth) * (health / 100)

		context.fillRect(enemyX + enemyHpBorderWidth, enemyY + enemyHpBorderWidth,
			hpWidth, enemyHpHeight - 2 * enemyHpBorderWidth)
	}
	function renderEnemy1Health(context, enemyX, enemyY) {
		context.fillStyle = hpBarConf.borderColor

		context.fillRect(enemyX, enemyY, enemyHpWidth, enemyHpHeight)

		context.fillStyle = hpBarConf.backgroundColor

		context.fillRect(enemyX + enemyHpBorderWidth, enemyY + enemyHpBorderWidth,
			enemyHpWidth - 2 * enemyHpBorderWidth, enemyHpHeight - 2 * enemyHpBorderWidth)

		context.fillStyle = hpBarConf.healthColor
		const health = Math.max(0, Math.min(state.skeleton1Health, 100))
		const hpWidth = (enemyHpWidth - 2 * enemyHpBorderWidth) * (health / 100)

		context.fillRect(enemyX + enemyHpBorderWidth, enemyY + enemyHpBorderWidth,
			hpWidth, enemyHpHeight - 2 * enemyHpBorderWidth)
	}
	function renderEnemy(context) {
		const frameNumber = state.skeletonFrameNumber % enemy[state.skeletonAnimation].length
		const frame =  enemy[state.skeletonAnimation][frameNumber]

		// todo: do some calculations and logic about position and size
		if(state.skeletonAnimation === 'death'){
			context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.skeletonPos.x, state.skeletonPos.y, 400, 230)
		}
		else if(state.skeletonAnimation === 'deathright'){
			context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.skeletonPos.x - 170, state.skeletonPos.y, 400, 230)
		}else context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.skeletonPos.x, state.skeletonPos.y, 180, 230)
	}
	function renderEnemy1(context) {
		const frameNumber = state.skeleton1FrameNumber % enemy1[state.skeleton1Animation].length
		const frame =  enemy1[state.skeleton1Animation][frameNumber]

		// todo: do some calculations and logic about position and size
		if(state.skeleton1Animation === 'death'){
			context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.skeleton1Pos.x, state.skeleton1Pos.y, 400, 230)
		}
		else if(state.skeleton1Animation === 'deathright'){
			context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.skeleton1Pos.x - 170, state.skeleton1Pos.y, 400, 230)
		}else context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.skeleton1Pos.x, state.skeleton1Pos.y, 180, 230)
	}
	const bullet = {
		fire: [],
		water: [],
		fireleft: [],
		waterleft: []
	}

	for(let i = 1; i <= 8; ++i) {
		const frame = new Image()
		frame.src = `pictures/effects/water/water${i}.png`
		bullet.water.push(frame)
	}

	for(let i = 1; i <= 8; ++i) {
		const frame = new Image()
		frame.src = `pictures/effects/fire/fire${i}.png`
		bullet.fire.push(frame)
	}

	for(let i = 1; i <= 8; ++i) {
		const frame = new Image()
		frame.src = `pictures/effectsleft/water/water${i}.png`
		bullet.waterleft.push(frame)
	}

	for(let i = 1; i <= 8; ++i) {
		const frame = new Image()
		frame.src = `pictures/effectsleft/fire/fire${i}.png`
		bullet.fireleft.push(frame)
	}

	function renderBullets(context) {
		state.bullets.forEach(bullet => {
			renderBullet(context, bullet.x, bullet.y, bullet.colour, bullet.direction)
		})
	}

	function renderBullet(context, x, y, colour, direction) {
		if (colour === 1){
			state.bulletAnimation = (direction === 'right' ? 'water' : 'waterleft')
		} else if (colour === 2){
			state.bulletAnimation = (direction === 'right' ? 'fire' : 'fireleft')
		}
		const frameNumber = state.bulletFrameNumber % bullet[state.bulletAnimation].length
		const frame =  bullet[state.bulletAnimation][frameNumber]
		// todo: do some calculations and logic about position and size
		context.drawImage(frame, 0, 0, frame.width, frame.height,
			x, y, 70, 70)
	}

	return function(diff, context) {
		renderBackground(context)
		renderCharacter(context)
		renderEnemy(context)
		renderEnemy1(context)
		renderBullets(context)
		renderEnemyHealth(context, state.skeletonPos.x + magicOffset, state.skeletonPos.y)
		renderEnemy1Health(context, state.skeleton1Pos.x + magicOffset, state.skeleton1Pos.y)
		renderScore(context, 30)
		renderHealth(context)
		renderMana(context)
	}
})()
