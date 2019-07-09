const render = (function(){
	const clearAll = context => context.clearRect(0, 0, context.canvas.width, context.canvas.height)

	function renderScore(context, fontSize) {
		context.fillStyle = 'black'
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
	background = new Image();  // "Создаём" изображение
       	background.src = 'pictures/Full-Background.png';  // Источник изображения
      	function drawBackground(context) {  // Событие onLoad, ждём момента пока загрузится изображение
       		context.drawImage( background, 0, 0);  // Рисуем изображение от точки с координатами 0, 0
      	}


	return function(diff, context) {
		clearAll(context)
		drawBackground(context)
		renderScore(context, 30)
		renderHealth(context)
		renderMana(context)
	}
})()
