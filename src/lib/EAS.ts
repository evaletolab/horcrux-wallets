const aesjs = require('aes-js');


export function eas_encrypt(data:Uint8Array, key:Uint8Array) :Uint8Array {
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  return aesCtr.encrypt(data);  
}

export function  eas_decrypt(data:Uint8Array, key:Uint8Array) :Uint8Array {    
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  return aesCtr.decrypt(data);
  
}
