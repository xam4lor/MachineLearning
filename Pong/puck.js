class Puck {
	constructor(onPointWin) {
		this.r = 12;
		this.speedConst = 5;
		this.reset();
		this.onPointWin = onPointWin;
	}

	checkPaddleLeft(p) {
		if (
			this.y - this.r < p.y + p.h / 2 &&
			this.y + this.r > p.y - p.h / 2 &&
			this.x - this.r < p.x + p.w / 2
		) {
			if (this.x > p.x) {
				let diff = this.y - (p.y - p.h / 2);
				let rad = radians(45);
				let angle = map(diff, 0, p.h, -rad, rad);
				this.xspeed = this.speedConst * cos(angle);
				this.yspeed = this.speedConst * sin(angle);
				this.x = p.x + p.w / 2 + this.r;
			}

		}
	}
	
	checkPaddleRight(p) {
		if (
			this.y - this.r < p.y + p.h / 2 &&
			this.y + this.r > p.y - p.h / 2 &&
			this.x + this.r > p.x - p.w / 2
		) {
			if (this.x < p.x) {
				let diff = this.y - (p.y - p.h / 2);
				let angle = map(diff, 0, p.h, radians(225), radians(135));
				this.xspeed = this.speedConst * cos(angle);
				this.yspeed = this.speedConst * sin(angle);
				this.x = p.x - p.w / 2 - this.r;
			}
		}
	}

	update() {
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	reset() {
		let angle = random(-PI / 4, PI / 4);

		this.x = width / 2;
		this.y = height / 2;
		this.xspeed = this.speedConst * Math.cos(angle);
		this.yspeed = this.speedConst * Math.sin(angle);

		if (random(1) < 0.5) {
			this.xspeed *= -1;
		}
	}

	edges() {
		if (this.y < 0 || this.y > height) {
			this.yspeed *= -1;
		}

		if (this.x - this.r > width) {
			leftscore++;
			this.onPointWin(-1);
			this.reset();
		}

		if (this.x + this.r < 0) {
			rightscore++;
			this.onPointWin(1);
			this.reset();
		}
	}

	show() {
		fill(255);
		ellipse(this.x, this.y, this.r * 2);
	}
}