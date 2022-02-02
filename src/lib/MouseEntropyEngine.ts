export type BitString = string;

// generates entropy based on mouse movements
// mouse coordinates must be passed to handleMouseMove function
// this function expects one 8 bit value per axis
// generates a user defined stream of bits represented as a string

// TODO: implement a progression callback

export class MouseEntropyEngine{
    previousX = 0;
    previousY = 0;
    previousDeltaX = 0;
    previousDeltaY = 0;
    isFirstCall = true;
    collectedValues: number[] = [];

    result = ""; // desiredBitCount length binary string

    constructor(
        private desiredBitCount:number = 256, 
        private completionCallback: (a:BitString) => void)
    {
        this.desiredBitCount = Math.round(this.desiredBitCount);
        if(this.desiredBitCount < 0){
            this.desiredBitCount = 256;
        }
    }


    // based on http://www.russellcottrell.com/mousePointerRNG.htm
    // Numbers are generated based on the position where the mouse changes horizontal or vertical direction.
    // 1. take coordinates in x an y -> expect coordinate to be in space of [0, 255] (1 8bit byte)
    // 2. concat binary representation of x and y to form a uint16
    // 3. xor with random uint16
    // note: does not implement reuse of coordinates (shuffling)
    handleMouseMove(x: number, y: number){
        // are we done?
        if(this.result.length >= this.desiredBitCount){
            return;
        }

        x = Math.round(x);
        y = Math.round(y);
        
        // sanity check x and y must be single 8 bit bytes
        if(x < 0 || y < 0 || x > 255 || y > 255){
            console.warn("invalid value given");
            return;
        }

        //handle state on first call
        if(this.isFirstCall){
            this.isFirstCall = false;
            this.previousX = x;
            this.previousY = y;
            this.previousDeltaX = x;
            this.previousDeltaY = y;
            return;
        }

        const deltaX = x - this.previousX;
        const deltaY = y - this.previousY;

        // only take value if direction has changed
        if((deltaX * this.previousDeltaX < 0) || (deltaY * this.previousDeltaY < 0)){
            // extract 2 bits per axis
            const xStr = x.toString(2).padStart(8, '0').substring(6);
            const yStr = y.toString(2).padStart(8, '0').substring(6);
            // xyStr represents nibble of data (4bits)
            const xyStr = xStr + yStr;
            const randomNibble = Math.floor(Math.random() * 16);

            // newBits = 4 bit binary string 
            const newBits = (parseInt(xyStr, 2) ^ randomNibble).toString(2).padStart(4, '0'); // salt the random number with the mouse position

            this.result += newBits;
            console.log("trigger");
            console.log(parseInt(xyStr, 2));
            console.log(newBits);
            console.log(this.result);
            this.collectedValues.push(parseInt(xyStr, 2));

            if(this.result.length >= this.desiredBitCount){
                console.log(JSON.stringify(this.collectedValues, null, 2));
                this.completionCallback(this.result.substring(0, this.desiredBitCount));
            }

        }
        
        this.previousX = x;
        this.previousY = y;

        if (deltaX != 0) {
            this.previousDeltaX = deltaX;
        }
        if (deltaY != 0) {
            this.previousDeltaY = deltaY;
        }
    }
}