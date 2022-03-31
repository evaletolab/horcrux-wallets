//import { $config } from './config-service';
import { ethers }  from 'ethers';
import { share } from 'secrets.js-34r7h';

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
  shares = [];

  get b64() {
    return ethers.utils.base64;
  }

  get b58() {
    return ethers.utils.base58;
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

  //
  // generate wallets 
  // https://github.com/iancoleman/bip39/blob/c3c7cebfe4c0b5a9b97e71e781b69e6a08e1fb57/src/js/index.js#L1225
  createRootKey(seed: string,options: any,count?: number,start?:number){
    const derived = options.path;
    const node = ethers.utils.HDNode.fromSeed(seed);
    const wallets = new Array(count||5).fill(0).map((elem,index)=> node.derivePath(derived+'/'+(index+(start||0))));
    return wallets;
  }

  async createShamirSecretFromSeed(entropy?: Uint8Array) {
    const hexSeed = ethers.utils.hexlify(this.entropy).split('0x');
    const b64 = ethers.utils.base64.encode('0x'+hexSeed[1]);
    this.shares = share(hexSeed[1], 3, 2,32) as [];

    return this.shares;
  }

  async getShamirCache() {
    return this.shares;
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