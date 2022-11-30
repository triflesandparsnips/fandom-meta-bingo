class Word {

    constructor(word, x, y, fontSize) {

        this.word = word;
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.color = colors.black;
        this.bold = false;
        this.drag = false;
    }

    display() {
        textSize(this.fontSize);
        if (this.bold) {
            textStyle(BOLD);
        } else {
            textStyle(NORMAL);
        }
        fill(this.color);
        text(this.word, this.x, this.y, 100);
    }

    highlight() {

        this.bold = true;
    }

    lowlight() {

        this.bold = false;
    }

    intersect(x, y) {
        let radius = 4;

        let xIntersect = x > this.x - 100 - radius && x < this.x + 50 + radius;
        let yIntersect = y > this.y - 20 - radius && y < this.y + 20 + radius;

        if (xIntersect && yIntersect) {
            return true;
        }
    }
}
