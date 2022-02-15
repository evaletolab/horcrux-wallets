  //
  // value = 256*value + char[i]
  // https://en.wikipedia.org/wiki/UTF-8#Codepage_layout
  // 32 is the first printable char
  export function stringToHEX256(string: string) {
    const seed = string.split('').reduce((value,char,index) => {
      return BigInt(0xff) * value + BigInt(string.charCodeAt(index) - 32);
    },BigInt(0));
    return '0x'+seed.toString(16).slice(0,64);
  }

