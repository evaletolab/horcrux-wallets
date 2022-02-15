//import { $config } from './config-service';
import { wordlists }  from 'ethers';
import { ethers }  from 'ethers';
import { share, str2hex } from 'secrets.js-34r7h';

export type i18n = 'en'|'fr'|'it'|'es';

export interface Horcrux {
  share: string;
  base64: string;
  version: string;
}

class WalletService {
  private _STORAGE = "horcrux-wallet";
  private defaultLang:i18n = 'en';

  entropy: Uint8Array = new Uint8Array();

  get b64() {
    return ethers.utils.base64;
  }
  //
  // FIXME, replace all import by ethers@4.0
  // https://docs.ethers.io/v4/api-wallet.html

  async entropy256Bits() {
    const bytes = new Uint8Array(20);
    const self: any = window;
    const cryptoObj = self.crypto || self.msCrypto; // for IE
    cryptoObj.getRandomValues(bytes);
    return bytes;
  }

  async createEntropy() {
    return this.entropy = await this.entropy256Bits();
  }

  retrieveEntropy(mnemonic: string) {
    const strEntropy = ethers.utils.mnemonicToEntropy(mnemonic,wordlists[this.defaultLang]);
    return this.entropy = ethers.utils.toUtf8Bytes(strEntropy);
  }

  createMnemonic(entropy: Uint8Array) {
    // https://docs.ethers.io/v5/api/utils/hdnode/#Mnemonic
    const mnemonic =ethers.utils.entropyToMnemonic(ethers.utils.hexlify(entropy),wordlists[this.defaultLang])
    return mnemonic;
  }

  isValidMnemonic(mnemonic:string) {
    return ethers.utils.isValidMnemonic(mnemonic,wordlists[this.defaultLang]);
  }

  async getSeed(mnemonic: string) {
    return ethers.utils.mnemonicToSeed(mnemonic);
  }

  async createRootKey(seed: string){
    const node = ethers.utils.HDNode.fromSeed(seed);
    // defaultPath ⇒ "m/44'/60'/0'/0/0"
    const child = node.derivePath('m/0/0');
    // Get the extended public key
    // let xpub = child.neuter().extendedKey;

    // Get the extended private key
    return child.extendedKey;
  }

  async createShamirSecretFromSeed(entropy?: Uint8Array) {
    const hexSeed = ethers.utils.hexlify(this.entropy).split('0x');
    const b64 = ethers.utils.base64.encode('0x'+hexSeed[1]);
    console.log('----DB entropy',hexSeed,b64, str2hex(b64));
    return share(hexSeed[1], 3, 2, 512);
  }

  //
  // create public/private eth address
  // - sign Horcrux method call 
  // https://hackernoon.com/shamir-secret-sharing-vs-multi-sig-124a42bc1662 
  async createHorcrux(shamirSecret: string) {
    //
    //https://docs.ethers.io/v4/cookbook-signing.html
    //https://docs.ethers.io/v4/api-advanced.html#signing-key
    //   var method = web3.eth.abi.encodeFunctionCall({
    //     name: 'destroy',
    //     type: 'function',
    //     inputs: [{
    //         type: 'address',
    //         name: '_to'
    //     }]
    //    }, [to]);    

    // sign
    //let flatSig = await wallet.signMessage(method);
    // let sig = ethers.utils.splitSignature(flatSig)
  }

  setDefaultLang(i18n:i18n) {
    this.defaultLang = i18n;
    this.createMnemonic(this.entropy);
  }

} 
//
// service start with $
export const $wallet = new WalletService();