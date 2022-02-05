A tool to organise and generate offline secure paper wallets.


# generate/import Mnemonic (BIP39)
* https://github.com/bitcoinjs/bip39
* i18n, select language 

``` js
mnemonic = new Mnemonic(language);
phrase = mnemonic.normalizeString(phrase);
var isValid = mnemonic.check(phrase);
```
* how to manage entropy and randomness ?
* BIP39 Seed 
* [https://electrum.readthedocs.io/en/latest/seedphrase.html](Electrum secure seed version), 
* print QRcodes


# Converting BIP39 mnemonic phrase to shamir secret sharing scheme
* https://github.com/iancoleman/shamir39
* https://www.npmjs.com/package/@stablelib/tss
* https://github.com/grempe/secrets.js
* https://francoisbest.com/posts/2020/password-reset-for-e2ee-apps
* use 2/N scheme

# generate private keys
* https://github.com/bitcoinjs/bip32
* BIP32 Root Key
* Account Extended Private Key ?
* Account Extended Public Key ?
* Derived Addresses ?

``` js
//
// BIP32
node = bip32.fromSeed(phrase);

//
// Derivation Path, 
// 'purpose/coin/account/internal'

// purpose 44 => BIP44, 49 => BIP49, 84 => BIP84
// coin 0 => BTC, 60 => ETH, 
const path = "m/44'/60'/0'/0";
b39 = node.derivePath(path);
``` 

# Derived Addresses
* print QRcodes
* list private/public keys


