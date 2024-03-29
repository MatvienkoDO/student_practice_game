(function() {
	const canvas = document.getElementById('canvas')
	if(!canvas) {
		throw 'canvas was not found'
	}
	canvas.setAttribute('width', constants.canvas.width)
	canvas.setAttribute('height', constants.canvas.height)

	const context = canvas.getContext('2d')
	if(!context) {
		throw 'context was not found'
	}

	let lastTimestamp = null

	window.requestAnimationFrame(firstRequestAnimationFrameCallback)

	function firstRequestAnimationFrameCallback(timestamp) {
		render(0, context)
		lastTimestamp = timestamp
		window.requestAnimationFrame(requestAnimationFrameCallback)
	}

	function requestAnimationFrameCallback(timestamp) {
		render(timestamp - lastTimestamp, context)
		lastTimestamp = timestamp
		window.requestAnimationFrame(requestAnimationFrameCallback)
	}

	if(constants.isDev) {
		const startView = document.getElementById('start-view')
		startView.setAttribute('hidden', true)
		canvas.removeAttribute('hidden')
		stateChangers.startGame('test')
	}
})()
