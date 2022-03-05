//import { $config } from './config-service';
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

  retrieveEntropy(mnemonic: string) {
    const strEntropy = ethers.utils.mnemonicToEntropy(mnemonic,ethers.wordlists[this.defaultLang]);
    return this.entropy = ethers.utils.toUtf8Bytes(strEntropy);
  }

  createMnemonic(entropy: Uint8Array, size:number) {
    // https://docs.ethers.io/v5/api/utils/hdnode/#Mnemonic
    // https://github.com/ethers-io/ethers.js/issues/34
    const sizedEntropy = entropy.slice(0,size);
    console.log('--- entropySized',sizedEntropy,size);
    const mnemonic =ethers.utils.entropyToMnemonic(ethers.utils.hexlify(sizedEntropy),ethers.wordlists[this.defaultLang])
    return mnemonic;
  }

  isValidMnemonic(mnemonic:string) {
    return ethers.utils.isValidMnemonic(mnemonic,ethers.wordlists[this.defaultLang]);
  }

  async getSeed(mnemonic: string) {
    return ethers.utils.mnemonicToSeed(mnemonic);
  }

  createRootKey(seed: string,token: number,count?: number,start?:number){
    const derived = `m/44'/${token}'/0'/0/`;
    const node = ethers.utils.HDNode.fromSeed(seed);
    start = start || 0;
    const wallets = new Array(count||5).fill(0).map((elem,index)=> node.derivePath(derived+index+start));
    return wallets;
  }

  async createShamirSecretFromSeed(entropy?: Uint8Array) {
    const hexSeed = ethers.utils.hexlify(this.entropy).split('0x');
    const b64 = ethers.utils.base64.encode('0x'+hexSeed[1]);
    console.log('----DB entropy',hexSeed,this.entropy);
    return share(hexSeed[1], 3, 2, 256);
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

  setDefaultLang(i18n:i18n,size: number) {
    this.defaultLang = i18n;
    this.createMnemonic(this.entropy,size);
  }

} 
//
// service start with $
export const $wallet = new WalletService();