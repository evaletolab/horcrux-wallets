//import { $config } from './config-service';
import * as bip39 from 'bip39';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { BIP32Interface } from 'bip32';

class WalletService {
  private _STORAGE = "horcrux-wallet";

  //
  // FIXME, replace all import by ethers@4.0
  // https://docs.ethers.io/v4/api-wallet.html

  async entropy256Bits() {
    const bytes = Buffer.allocUnsafe(32);
    const self: any = window;
    const cryptoObj = self.crypto || self.msCrypto; // for IE
    cryptoObj.getRandomValues(bytes);
    return bytes;
  }

  async createEntropy() {
    return await this.entropy256Bits();
  }

  async createMnemonic() {
    const entropy: Buffer = await this.createEntropy() as Buffer;
    return bip39.entropyToMnemonic(entropy.toString('hex'))    
  }

  async createSeed(mnemonic: string) {
    return bip39.mnemonicToSeed(mnemonic);
  }

  async createRootKey(seed: string){
    const bip32 = BIP32Factory(ecc);
    const node: BIP32Interface = bip32.fromBase58(seed);
    //let child: BIP32Interface = node.derivePath('m/0/0');

    return node.toBase58();
  }

  //
  // create public/private eth address
  // - sign Horcrux method call 
  // - 
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