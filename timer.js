class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onCompleted = callbacks.onCompleted;
		}

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}

	start = () => {
		if (this.onStart) this.onStart(this.timeRemaining);
		this.tick();
		this.intervalId = setInterval(this.tick, 20);
		this.startButton.disabled = true;
	};

	pause = () => {
		clearInterval(this.intervalId);
		this.startButton.disabled = false;
	};

	tick = () => {
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onCompleted) this.onCompleted();
		} else {
			this.timeRemaining = this.timeRemaining - 0.02;
			if (this.onTick) this.onTick(this.timeRemaining);
		}
	};

	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}
