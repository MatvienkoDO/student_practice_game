const constants = (function(){
	return {
		// constant for turning on development stuff
		isDev: true,
		// -----------------------------------------
		healthBarConfig: {
			borderColor: 'black',
			borderWidth: 2,
			backgroundColor: 'gray',
			healthColor: 'red',
			leftTopCorner: {
				x: 10,
				y: 55
			},
			width: 154,
			height: 14
		},
		manaBarConfig: {
			borderColor: 'black',
			borderWidth: 2,
			backgroundColor: 'gray',
			manaColor: 'blue',
			leftTopCorner: {
				x: 10,
				y: 80
			},
			width: 154,
			height: 14
		},
		canvas: {
			width: 1280,
			height: 720
		}
	}
})()
