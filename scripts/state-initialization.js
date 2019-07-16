const state = (function(){
	return {
		playerName: '',
		score: 0,
		health: 100,
		mana: 100,
		startTime: null,
		playerPos: { x: 600, y: 390 },
		playerSpeed: 0,
		playerTurnedTo: 'right',
		characterFrameNumber: 0,
		characterAnimation: 'idle',
		skeletonPos:{ x: 1280, y: 380 },
		skeletonFrameNumber: 0,
		skeletonAnimation: 'walk',
		skeletonHealth: 100,
		skeleton1Pos:{ x: -100, y: 380 },
		skeleton1FrameNumber: 0,
		skeleton1Animation: 'walk',
		skeleton1Health: 100,
		bulletFrameNumber: 0,
		bulletAnimation: 'water',
		bullets: []
	}
})()
