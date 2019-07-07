(function() {
	const canvas = document.getElementById('canvas')
	if(!canvas) {
		throw 'canvas was not found'
	}
	const context = canvas.getContext('2d')
	if(!context) {
		throw 'context was not found'
	}

	function requestAnimationFrameCallback(timestamp) {
		render(timestamp, context)
		window.requestAnimationFrame(requestAnimationFrameCallback)
	}

	window.requestAnimationFrame(requestAnimationFrameCallback)
})()
