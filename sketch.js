// fork from Concrete Nest at https://github.com/vividfax/concrete-nest

let img;

let metaTiles = [];
let selected = [];
let bingoed = [];

let circles = [];

let bingoDrawn = false;


// Color palette by whirledpeace at https://www.colourlovers.com/palette/818229/Cant_Compare_101

let colors = {
	black: '#021418',
    dark: '#19B5A5',
    medium: '#FF0048',
    light: '#FF6933',
	white: '#fcfcfa'
}


// preloads the meta tiles

function preload() {
    img = loadImage('assets/ofmd_blank1.png')
    metaTiles = loadStrings('assets/ofmdmetatiles.txt');
	metaTiles.pop();
}


// sets up canvas size, font, and centering, as well as calling some abilities

function setup() {
	createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
	textFont('Arial Black');

	createCircles();
	selectWords();
}


// function to actually draw the sketch; if there's no meta moved into the center of the card, the instructions are visible 

function draw() {
	background(colors.white);

   	image(img, width/2, 0, 750, 750)
  
	if (!bingoDrawn) {
		loadPixels();
		set(get());
		updatePixels()
		bingoDrawn = true;
	} else {
		updatePixels();
	}
	if (bingoed.length == 0) {
		drawHint();
	}

  
// draws the save button and applies the button hover action
  
	else {drawSaveButton(20 + 75, 40, saveButtonHover());}

  
// draws the more-meta button and applies the button hover action
  
	drawStabAgainButton(width / 7, height - 40, stabAgainButtonHover());


// lists the functions that get drawn in the sketch
  
	sortWords();
	drawWords();
//	mouseOver();
  
}


// function that I think randomizes the meta in the string file, and creates the "newWord" to reference later

function selectWords() {

	for (let i = 0; i < 5; i++) {
		newWord(random(metaTiles), 16);
	}
}


// function that defines what the more-meta button does when you click it, specifically redrawing the constraining circle and pulling meta into it from the meta pre-selected from the sorting function

function refreshWords() {

	circles = [];
	createCircles();
	selected = [];
	selectWords();
}


// function that I think generates the chosen meta and makes sure it appears in the constraining circle

function newWord(word, fontSize) {
  
  let x = random(width)/4 + width/8;
  let y = random(height)/2 + height/4;
  
  for (i in selected) {
	if (dist(x, y, selected[i].x, selected[i].y) < 55) {
		return;
		}
  }
  let inCircle = false;

  for (i in circles) {

	if (dist(x, y, circles[i].x, circles[i]. y) < circles[i].r/2) {
		inCircle = true;
		}
  }
	if (!inCircle) {
		return;
	    }
  return selected.push(new Word(word, x, y, fontSize));
}


// function that writes the actual instructions

function drawHint() {
  
  let hint = 'drag and drop meta\nto arrange your card and\nclick Get More Booty\nto get more options!';
  textStyle(NORMAL);
  textSize(18);
  fill(colors.light);
  text(hint, 200, 100);

}

// function that actually draws the more-meta button and allows for the flip between the white and orange lettering

function drawStabAgainButton(x, y, color) {

  let w = 200;
  let h = 40;

  textStyle(NORMAL);
  fill(colors.dark)
  stroke('#222222');
  strokeWeight();
  rect(x - w/2, y - h/2, w, h, 5);

  if (color == colors.white) {
	fill(colors.light);
	} else {
		fill(colors.white);
	}textSize(16);
	text("get more booty!", x, y);
	textSize(16);
}


// function that defines where cursor can "click" the more-meta button (maybe defines where the button is on the canvas?)

function stabAgainButtonHover() {

	if (mouseX > width/4 - 200/2 && mouseX < width/4 + 200/2 && mouseY > height - 40 - 40/2 && mouseY < height + 40 + 40/2) {
		return colors.white;
	} else {
		return "#236269";
	}
}


// function that actually draws the save button and allows for the flip between the white and orange lettering

function drawSaveButton(x, y, color) {

  let w = 150;
  let h = 40;

  textStyle(NORMAL);
  fill(colors.dark)
  stroke('#222222');
  strokeWeight();
  rect(x - w/2, y - h/2, w, h, 5);

  if (color == colors.white) {
	  fill(colors.light);
	} else {
	  fill(colors.white);
	}textSize(16);
	text("save card", x, y);
	textSize(16);
}


// function that defines where cursor can "click" the save button (maybe defines where the button is on the canvas?)

function saveButtonHover() {

  if (mouseX > 20 && mouseX < 20+150 && mouseY > 20 && mouseY < 20 + 40) {
	return colors.white;
  } else {
	return "#236269";
  }
}


// function that results in different actions (refreshing the meta list or saving a pick) if mouse clicked on specific areas where the buttons are

function mouseClicked() {

	if (mouseX > width/4 - 150/2 && mouseX < width/4 + 150/2 && mouseY > height - 40 - 40/2 && mouseY < height - 40 + 40/2) {
		refreshWords();
	}
	if (mouseX > 20 && mouseX < 20+150 && mouseY > 20 && mouseY < 20 + 40) {
		let image = get(width/2, 0, width/2, height);
		save(image, "ofmd-meta-bingo-card.png");
	}
}


// function that I think removes the used meta from the list after it's added to the bingo card

function sortWords() {

	for (i in selected) {

		let shift;

		if (selected[i].x > width/2) {
			shift = selected.splice(i, 1);
			bingoed.push(shift[0]);
		}
	}
	for (i in bingoed) {

		let shift;

		if (bingoed[i].x <= width/2) {
			shift = bingoed.splice(i, 1);
			selected.push(shift[0]);
		}
	}
}


// function that draws the words depending on whether they're in the constraining circle or on the bingo card

function drawWords() {

	for (let i = 0; i < selected.length; i++) {
		selected[i].display();
	}
	for (let i = 0; i < bingoed.length; i++) {
		bingoed[i].display();
	}
}


// function that maybe creates the smaller random circles where the meta appears, but without the circles the meta won't appear -- also defines where on the canvas the circles appear

function createCircles() {

  for (let i = 0; i < 10; i++) {
	circles.push(new Circle(random(width)/4 + width/8, random(height/2) + height/4, random(height/4)));
  }
}


// function that I think in the original would turn text dark or light if mouse selects the meta

 function mouseOver() {

	for (i in selected) {

		if (selected[i].intersect(mouseX, mouseY)) {
			selected[i].highlight();
		} else {
			selected[i].lowlight();
		}
	}
	for (i in bingoed) {

		if (bingoed[i].intersect(mouseX, mouseY)) {
			bingoed[i].highlight();
		} else {
			bingoed[i].lowlight();
		}
	}
}


// function that allows the meta to be clicked and dragged

function mousePressed() {

	for (i in selected) {

		if (selected[i].intersect(mouseX, mouseY)) {
			selected[i].drag = true;
		} else {
			selected[i].drag = false;
		}
	}
	for (i in bingoed) {

		if (bingoed[i].intersect(mouseX, mouseY)) {
			bingoed[i].drag = true;
		} else {
			bingoed[i].drag = false;
		}
	}
}


function mouseReleased() {

	for (i in selected) {
		selected[i].drag = false;
	}
	for (i in bingoed) {
		bingoed[i].drag = false;
	}
}


// function that allows the meta to be clicked and dragged -- how is it different from the previous function?

function mouseDragged() {
	let selectionCounter = 0;
	let offset = 0;
	for (i in selected) {
		if (selected[i].drag) {
			selectionCounter++;
			offset = getOffset(selectionCounter);
			selected[i].x = mouseX;
			selected[i].y = mouseY + offset;
		}
	}
	selectionCounter = 0;
	for (i in bingoed) {
		if (bingoed[i].drag) {
			selectionCounter++;
			offset = getOffset(selectionCounter);
			bingoed[i].x = mouseX;
			bingoed[i].y = mouseY + offset;
		}
	}
}


// function that separates the meta if the randomizer or the user overlays each of them by accident

function getOffset(numberOfItems) {
	if (numberOfItems > 1) {
		return (numberOfItems-1) * 20; // moves the word 20 pixels down
	}
	else return 0;
}
