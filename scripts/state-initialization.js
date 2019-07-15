const state = (function(){
	return {
		playerName: '',
		score: 0,
		health: 100,
		mana: 100,
		startTime: null,
		playerPos: { x: 10, y: 390 },
		playerSpeed: 0,
		characterFrameNumber: 0,
		characterAnimation: 'idle',
		skeletonPos:{ x: 1000, y: 380 },
		skeletonFrameNumber: 0,
		skeletonAnimation: 'walk',
		bulletPos:{ x: 1000, y: 390 },
		bulletFrameNumber: 0,
		bulletAnimation: 'fire'
	}
})()
