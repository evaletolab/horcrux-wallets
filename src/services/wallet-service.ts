import { $config } from './config-service';
import * as bip39 from 'bip39';

class WalletService {
  private _STORAGE = "horcrux-wallet";


  entropy256Bits = function() {
    const bytes = Buffer.allocUnsafe(64);
    const self: any = window;
    const cryptoObj = self.crypto || self.msCrypto; // for IE
    cryptoObj.getRandomValues(bytes);
    return new Promise(()=> bytes);
  }

  async createEntropy() {
    this.entropy256Bits();
  }

  async createUser(username: string) {

    bip39.entropyToMnemonic(Buffer.from('000000', 'hex'))    
  }


}
//
// service start with $
export const $wallet = new WalletService();