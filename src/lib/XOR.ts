
function keyNumberAt(key:Uint8Array, i:number) {
  return key[Math.floor(i % key.length)];
}

export function xor_encrypt(data:Uint8Array, key:Uint8Array) :Uint8Array {
  return data.map((digit, i) => {
    return (digit ^ keyNumberAt(key, i));
  });
}

export function  xor_decrypt(data:Uint8Array, key:Uint8Array) :Uint8Array {    
  return data.map((digit, i) => {
    return ( digit ^ keyNumberAt(key, i) );
  });
}
