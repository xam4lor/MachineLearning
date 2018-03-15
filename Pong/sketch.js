let leftscore = 0;
let rightscore = 0;
let nn;
let speed_slider;

function setup() {
	createCanvas(600, 400);
	puck = new Puck(onPointWin);
	left = new Paddle(true);
	right = new Paddle(false);

	nn_left = new NeuralNetwork(1, 5, 1);
	nn_right = new NeuralNetwork(1, 5, 1);

	speed_slider = createSlider(1, 50, 0.1, 0.5);
}

function draw() {
	background(0);

	puck.checkPaddleRight(right);
	puck.checkPaddleLeft(left);

	left.show();
	right.show();
	left.update();
	right.update();

	puck.update();
	puck.edges();
	puck.show();

	fill(255);
	textSize(32);
	text(leftscore, 32, 40);
	text(rightscore, width - 64, 40);

	// NeuralNetwork
	right.y = nn_right.predict([puck.y / 400]) * 400;
	left.y = nn_left.predict([puck.y / 400]) * 400;

	puck.speedConst = speed_slider.value();
}


function keyReleased() {
	left.move(0);
	right.move(0);
}

function keyPressed() {
	/*if (key == 'Z') {
		right.move(-10);
	} else if (key == 'S') {
		right.move(10);
	}

	if (key == 'J') {
		left.move(-10);
	} else if (key == 'N') {
		left.move(10);
	}*/
}


function onPointWin(winnerID) { // -1 == left // 1 == right
	let learningRateFrames = 100;

	let correctY = puck.y;
	let training_data = [
		{
			inputs: [puck.y / 400],
			outputs: [correctY / 400]
		}
	];


	if(winnerID == -1) {
		// left
		for (let i = 0; i < learningRateFrames; i++) {
			let data = random(training_data);
			nn_left.train(data.inputs, data.outputs);
		}
	}
	else if(winnerID == 1) {
		// right
		for (let i = 0; i < learningRateFrames; i++) {
			let data = random(training_data);
			nn_right.train(data.inputs, data.outputs);
		}
	}
}