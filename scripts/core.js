(function() {
	function requestAnimationFrameCallback(timestamp) {
		render(timestamp)
		window.requestAnimationFrame(requestAnimationFrameCallback)
	}

	window.requestAnimationFrame(requestAnimationFrameCallback)
})()
