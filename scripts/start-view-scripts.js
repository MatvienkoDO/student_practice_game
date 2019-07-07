(function(){
	const nameField = document.getElementById('name')
	const startButton = document.getElementById('start-button')
	const startView = document.getElementById('start-view')
	const canvas = document.getElementById('canvas')
	if(!nameField) {
		throw 'name field was not found'
	}
	if(!startButton) {
		throw 'start button was not found'
	}
	if(!startView) {
		throw 'start view was not found'
	}
	if(!canvas) {
		throw 'canvas was not found'
	}

	nameField.addEventListener('input', function(event) {
		if(event.target.value) {
			startButton.removeAttribute('disabled')
		} else {
			startButton.setAttribute('disabled', true)
		}
	})

	startButton.addEventListener('click', function() {
		startView.setAttribute('hidden', true)
		canvas.removeAttribute('hidden')

		stateChangers.startGame(nameField.value)
	})
})()
