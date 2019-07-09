const state = (function(){
	return {
		playerName: '',
		score: 0,
		health: 100,
		mana: 100,
		startTime: null,
		playerPos: { x: 0, y: 0 },
		characterFrameNumber: 0,
		characterAnimation: 'idle'
	}
})()
