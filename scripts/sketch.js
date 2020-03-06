let button, finishButton;
let mic;
let imgMSheet;
var fft;
var pitchInterval;

let musicBar = 90; // location from one note to the next

var pitches = {
	NOTE_C4: 262,
	NOTE_D4: 294,
	NOTE_E4: 330,
	NOTE_F4: 349,
	NOTE_G4: 392,
	NOTE_A4: 440,
	NOTE_B4: 494,
	NOTE_C5: 523,
	NOTE_D5: 587,
	NOTE_E5: 659,
	NOTE_F5: 698,
	NOTE_G5: 784,
	NOTE_A5: 880,
	NOTE_B5: 988,
	NOTE_C6: 1047,
}

function preload() {
	imgMSheet = loadImage('_musicStaffLines.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  mic = new p5.AudioIn();
  mic.stop();

  fft = new p5.FFT();
  fft.setInput(mic);

  number = 200;

	image(imgMSheet, 45, 350.5, 1187.5, 183.5);

  button = createButton('START RECORDING ');
	button.style("font-family", "Montserrat");
	button.style("border-color", "black");
	button.style("font-size", "10pt");
	button.style("cursor", "pointer");
	button.position(45, 270);
  button.mousePressed(clickFunction);

	let finishButton = createButton('FINISH RECORDING');
	finishButton.style("font-family", "Montserrat");
	finishButton.style("border-color", "black");
	finishButton.style("font-size", "10pt");
	finishButton.style("cursor", "pointer");
  finishButton.position(45, 300);
  finishButton.mousePressed(finishRecording);


  let title = createP("Encrypt your Voice into a Melodic Postcard");
	title.position(windowWidth/2.9, 35);
	title.style("text-align", "center");
  title.style("font-family", "Hoefler Text");
  title.style("color", "#000000");
  title.style("font-size", "28pt");
  title.style("padding", "8px");
	title.style("width", "calc(10em)");
	title.style("line-height", "45px");

	let instructions = createP("Press the button to record a message, then place the paper on the wall and mark the dots with a sharpie. After, use the hole puncher to remove the dots you just marked, then feed into the music crank box to listen.");
	instructions.position(windowWidth/3.25, 155);
	instructions.style("text-align", "center");
  instructions.style("font-family", "Hoefler Text");
	instructions.style("width", "calc(30em)");
	instructions.style("line-height", "20px");

	let tigris = createP("by Tigris Li");
	tigris.position(windowWidth-125, 270);
	tigris.style("text-align", "center");
  tigris.style("font-family", "Hoefler Text");
}


function clickFunction() {
	if (!pitchInterval) {
		pitchInterval = setInterval(pitchDelay, 500);
		mic.start();
		button.html('PAUSE RECORDING');
		button.style("font-family", "Montserrat");
		button.style("border-color", "black");
		button.style("font-size", "10pt");
	} else {
		clearInterval(pitchInterval);
		pitchInterval = false;
		mic.stop();
		button.html('RESUME RECORDING');
		button.style("font-family", "Montserrat");
		button.style("border-color", "black");
		button.style("font-size", "10pt");
	}
}

function finishRecording() {
	clearInterval(pitchInterval);
	pitchInterval = false;
	mic.stop();
  // saveCanvas('cryptoMusic', 'jpg');
	musicBar = 90;
	setup();

}


function pitchDelay() {
  if (mic.enabled) {
		strokeWeight(1);
    stroke('#000000');
		micLevel = mic.getLevel();
		var spectrum = fft.analyze();
		var loudestPitch = 0;
		var note = ''; 	// variable for note name of loudest pitch:
		for (var thisPitch in pitches) {
		// get sound energy at the pitch of each element in the array:
			var amplitude = fft.getEnergy(pitches[thisPitch]);
		// if 'sound energy' is the loudest (right now) then save as the current loudest:
			if (amplitude > loudestPitch) {
				loudestPitch = amplitude;
				note = thisPitch;
			}
	}
    var pitchFreq = fft.getCentroid()
    // text(pitchFreq,100,20);
    // text(note, 20, 20); // print out the loudest note
    // console.log(note);
    // console.log(pitchFreq);

    musicBar = musicBar + 15; // horizontal time movement
		if (pitchFreq > 6000) { // C6
			stroke('blue');
			strokeWeight(8);
			point(musicBar, 370);
		} else if (pitchFreq > 5000 && pitchFreq < 5999) { // B5
			stroke('red');
			point(musicBar, 380);
			endShape();
		} else if (pitchFreq > 4000 && pitchFreq < 4999) { // A5
			stroke('red');
			strokeWeight(8);
			point(musicBar, 390);
			endShape();
		} else if (pitchFreq > 3666 && pitchFreq < 3999) { // G5
			stroke('red');
			strokeWeight(8);
			point(musicBar, 400);
			endShape();
		} else if (pitchFreq > 3332 && pitchFreq < 3665) { // F5
			stroke('red');
			strokeWeight(8);
			point(musicBar, 410);
			endShape();
		} else if (pitchFreq > 2999 && pitchFreq < 3321) { // E5
			stroke('red');
			strokeWeight(8);
			point(musicBar, 420);
			endShape();
		} else if (pitchFreq > 2665 && pitchFreq < 2998) { // D5
			stroke('red');
			strokeWeight(8);
			point(musicBar, 430);
			endShape();
		} else if (pitchFreq > 2331 && pitchFreq < 2664) { // C5
			stroke('red');
			strokeWeight(8);
			point(musicBar, 440);
			endShape();
		} else if (pitchFreq > 1999 && pitchFreq < 2330) { // B4
			stroke('red');
			strokeWeight(8);
			point(musicBar, 450);
			endShape();
		} else if (pitchFreq > 1665 && pitchFreq < 1998) { // A4
			stroke('red');
			strokeWeight(8);
			point(musicBar, 460);
		} else if (pitchFreq > 1332 && pitchFreq < 1665) { // G4
			stroke('red');
			strokeWeight(8);
			point(musicBar, 470);
		} else if (pitchFreq > 999 && pitchFreq < 1331) { // F4
			stroke('red');
			strokeWeight(8);
			point(musicBar, 480);
		} else if (pitchFreq > 765 && pitchFreq < 998) { // E4
			stroke('red');
			strokeWeight(8);
			point(musicBar, 490);
		} else if (pitchFreq > 531 && pitchFreq < 764) { // D4
			stroke('red');
			strokeWeight(8);
			point(musicBar, 500);
		} else if (pitchFreq > 300 && pitchFreq < 530) { // C4
			stroke('red');
			strokeWeight(8);
			point(musicBar, 510);
		}
	}
}
