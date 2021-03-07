class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale, isHidden) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        if (isHidden) {
            ctx.drawImage(this.spritesheet, 0, 0, 0, 0);
        } else {
            ctx.drawImage(
            this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding),
            this.yStart, //source from sheet
            this.width,
            this.height,
            x,
            y,
            this.width * scale,
            this.height * scale
            );

            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(x, y, this.width * scale, this.height * scale);
            }
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};

