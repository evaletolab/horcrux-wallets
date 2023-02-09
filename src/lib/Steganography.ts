
export function getLSB8bytesFromImage(image: HTMLImageElement) {
  return new Promise((resolve)=>{
    image.onload = () => {
      const canvas = document.createElement('canvas');
  
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx:any = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      image.style.display = 'none';

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //
      // get a binary string based on image LSB pixel
      const bits = imgData.data.map((pixel:number) => (pixel&1).toString(2) + ' ');

      resolve(bits.split(' ').map((bit: string)=> parseInt(bit,8)));
    }
  
  });
}

export function setLSB8bytesFromImage(image: HTMLImageElement,bytes:Uint8Array) {
  image.onload = () => {
    const canvas = document.createElement('canvas');

    canvas.width = image.width;
    canvas.height = image.height;
    const ctx:any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    image.style.display = 'none';

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //
    // get a binary string based on image LSB pixel
    imgData.data.map((pixel:number) => {

    });
    //resolve(bits.split(' ').map((bit: string)=> parseInt(bit,8)));
  }

});

}

function stringToBinary(message) {
  return message.split('').map(char => char.charCodeAt(0).toString(2) +'');
}

function binaryToString(binary){
  return binary.map(function(bin) {
    return String.fromCharCode(parseInt(bin, 2));
  }).join('');
}


//
// ethers.utils.toUtf8Bytes(text): Uint8Array
