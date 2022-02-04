//import { $config } from './config-service';
import { utils }  from 'ethers';
import { share, combine } from 'secrets.js-34r7h';


class WalletService {
  private _STORAGE = "horcrux-wallet";

  //
  // FIXME, replace all import by ethers@4.0
  // https://docs.ethers.io/v4/api-wallet.html

  async entropy256Bits() {
    const bytes = new Uint8Array(32);
    const self: any = window;
    const cryptoObj = self.crypto || self.msCrypto; // for IE
    cryptoObj.getRandomValues(bytes);
    return bytes;
  }

  async createEntropy() {
    return await this.entropy256Bits();
  }

  async createMnemonic() {
    const entropy = await this.createEntropy() as Uint8Array ;
    return utils.HDNode.entropyToMnemonic(utils.hexlify(entropy))    
  }

  async getSeed(mnemonic: string) {
    return utils.HDNode.mnemonicToSeed(mnemonic);
  }

  async createRootKey(seed: string){
    const node = utils.HDNode.fromSeed(seed);
    // defaultPath ⇒ "m/44'/60'/0'/0/0"
    const child = node.derivePath('m/0/0');
    // Get the extended public key
    // let xpub = child.neuter().extendedKey;

    // Get the extended private key
    return child.extendedKey;
  }

  async createShamirSecretFromSeed(seed: string) {
    const hexSeed = seed.split('0x');
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
    // let sig = ethers.utils.splitSignature(flatSig);




  }

} 
//
// service start with $
export const $wallet = new WalletService();