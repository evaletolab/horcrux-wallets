import { $config } from './config-service';
import * as bip39 from 'bip39';
import * as randomBytes from 'randombytes';

class WalletService {
  private _STORAGE = "horcrux-wallet";

  async createEntropy() {
    return randomBytes(64);
  }

  async createUser(username: string) {

    bip39.entropyToMnemonic(Buffer.from('000000', 'hex'))    
  }


}
//
// service start with $
export const $wallet = new WalletService();