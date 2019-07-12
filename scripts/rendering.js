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

		const hpWidth = (hpBarConf.width - 2 * hpBordW) * (state.health / 100)

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

		const mnWidth = (mnBarConf.width - 2 * mnBordW) * (state.mana / 100)

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
		run: []
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


	function renderCharacter(context) {
		const frameNumber = state.characterFrameNumber % character[state.characterAnimation].length
		const frame = character[state.characterAnimation][frameNumber]

		// todo: do some calculations and logic about position and size
		context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.playerPos.x, state.playerPos.y, 175, 200)
	}		

	const enemy = {
		walk: []
	}

	for(let i = 4; i <= 23; ++i) {
		const frame = new Image()
		frame.src = `pictures/enemy/walk/FW_Skeleton_Walking__0${i < 10 ? '0' : ''}${i}.png`
		enemy.walk.push(frame)
	}

	function renderEnemy(context) {
		const frameNumber = state.skeletonFrameNumber % enemy[state.skeletonAnimation].length
		const frame =  enemy[state.skeletonAnimation][frameNumber]

		// todo: do some calculations and logic about position and size
		context.drawImage(frame, 0, 0, frame.width, frame.height,
			state.enemyPos.x, state.enemyPos.y, 150, 200)
	}

	return function(diff, context) {
		renderBackground(context)
		renderCharacter(context)
		renderEnemy(context)
		renderScore(context, 30)
		renderHealth(context)
		renderMana(context)
	}
})()
