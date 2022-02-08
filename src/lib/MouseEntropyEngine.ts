export type BitString = string;


export function bitStrToUint8Array(bitStr:string): Uint8Array{
    throw new Error("not implemented");
    const byteCount = Math.ceil(bitStr.length / 8);
    const result: Uint8Array = new Uint8Array(byteCount);

    return result;
}

// generates a user defined count of random bits represented as a string
// uses mouse movements as source of entropy
// mouse coordinates must be passed to handleMouseMove function
export class MouseEntropyEngine{
    previousX = 0;
    previousY = 0;
    previousDeltaX = 0;
    previousDeltaY = 0;
    isFirstCall = true;
    collectedValues: number[] = [];

    buf = new Uint8Array(1); // 1 byte buf for crypto rand values
    result = ""; // desiredBitCount length binary string

    constructor(
        private desiredBitCount:number = 256, 
        private completionCallback: ((a:BitString) => void) | null = null,
        private progressionCallback: ((progress:number) => void) | null = null,
    )
    {
        this.desiredBitCount = Math.round(this.desiredBitCount);
        if(this.desiredBitCount < 0){
            this.desiredBitCount = 256;
        }
    }

    getRandomCryptoNibble(): number{
        self.crypto.getRandomValues(this.buf);
        const binaryByteStr = this.buf[0].toString(2).padStart(8, '0');
        const nibble = parseInt(binaryByteStr.substring(4), 2);
        // console.log("crypto nibble", this.buf[0], binaryByteStr, nibble.toString(2).padStart(4, '0'), nibble);
        return nibble;
    }


    // based on http://www.russellcottrell.com/mousePointerRNG.htm
    // Numbers are generated based on the position where the mouse changes horizontal or vertical direction.
    // 1. take coordinates in x and y -> extract 2 least siginificants bits from each value
    // 2. concat binary representation of x and y to form a nibble (4bits)
    // 3. xor with random nibble
    // note: does not implement speedup strategy -> reuse of coordinates (shuffling)
    handleMouseMove(x: number, y: number){
        // are we done?
        if(this.result.length >= this.desiredBitCount){
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
            // (3 is binary 11)
            const xStr = (x & 3).toString(2).padStart(2, '0');
            const yStr = (y & 3).toString(2).padStart(2, '0');
            
            // xyStr represents nibble of data (4bits)
            const xyStr = xStr + yStr;
            const randomNibble = this.getRandomCryptoNibble();

            // newBits = 4 bit binary string 
            const newBits = (parseInt(xyStr, 2) ^ randomNibble).toString(2).padStart(4, '0'); // salt the random number with the mouse position

            this.result += newBits;
            // console.log("trigger");
            // console.log(parseInt(xyStr, 2));
            // console.log(newBits);
            // console.log(parseInt(newBits, 2));
            this.collectedValues.push(parseInt(newBits, 2));

            if(this.progressionCallback){
                const progress = Math.min(this.result.length / this.desiredBitCount, 1);
                this.progressionCallback(progress);
            }

            if(this.result.length >= this.desiredBitCount){
                // console.log("-------------");
                // console.log(JSON.stringify(this.collectedValues, null, 2));
                // console.log("-------------");
                if(this.completionCallback){
                    this.completionCallback(this.result.substring(0, this.desiredBitCount));
                }
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