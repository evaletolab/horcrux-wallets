A tool to organise and manage paper wallets without thirdparties.

## ⇾ Follow our funky new development ⇾ [king-kong-II-web3](https://github.com/evaletolab/kng-web3) 🌶️

# Installation

``` bash
> npm i
> npm run btc
```
> Note about bitcoinjs-lib.js:
> Remove all tslint the comments /* eslint-disable node/no-deprecated-api */
> Remove Typescript fields for class ECPair


try the demo, https://evaletolab.github.io/horcrux-wallets/

# Project goal

The goal of this application is to provide a few solutions to protect a Mnemonic without the needs of a trusted thirdparties.

We propose the usage of Shamir Shared Secret (SSS) to protect your Mnemonic without the problem of single point of security. We decide to use as source of SSS the entropy that produce the Mnemonic. Shamir split entropy in **3 separate pieces** (called Horcruxes). Your need at least two pieces to reconstitute deterministicaly the same Mnemonic. We recomend you keep them in separate places/locations:

* Use printed paper.
* Use a digital pipcture with our Steganography solution.
* And use our Horcrux SmartContract. 👇


## Store one Horcrux on Ethereum

<a href="https://mermaid-js.github.io/mermaid-live-editor/edit/#pako:eNqdV1lv4zYQ_iuEFgskhePqPvywQHNhFw2aognaBdb7QEkjm7UOL0UlcYP895I6Iok67JYGZJHzzT0cUq9KkIWgrJScYQbXBG8oTi6e9HWK-Pj203d0cfEJFTnQFCfw8x7n-XNGQ9SnbzMa0OIFrdB9CijfYgooi9DDFieEVtAGIuBf7_-oFodyBfnLl-sVevj8y9l5heLzcv33-79WyFJVNcnRJ7TPnvlTK6d93J6SJ-7Mr3Co1jnf6Ho7L8lCY7t0Xrsorwrk58qXZUCBL58tl8tz7nrOMoo3gHZc3qiCd7f5S7mQkBdoQlm9T0svSMp0y0ZPOC5gnVZMZdJGGV6RNCqGMui1JKFL2AzfuMXfW3o5LakUfhSEp7KlNSsV9W8IWMfxpMgZ8gFBsmeHCaYxhe1aCRFFVRGr51v1N-algN-w7eNXZaEkQBNMQl7Kr4JhrbAtJLBWVvw1hAgXMVsriw7pT0wJ9mPIBea11qj4ONhtaFakYcX6vCUMakZB5zlNMD1cZXFGK8SHm6ubq9vbDiaHIEtDCRXxEXYlMaCM9EHbPD5z1YWo6o8L5NlL3TEt1XNVw_t4PjTiku8YoBK_bnIBtuB3J_nfDRyVYL8LMJaW7pma5tim0xPQ2D7K7x43oHbgEV5YN0aaoRmqOmaojOTbXtW1EYskIN34Z95SNI1yaDyqk7OugTFJoavPKEdPX9-gPpVXYnq528wXSAsY1IZfxlWryZ7hqNeXA7JekzEfPe2Y0ux5Czic9SDKUnbLG3R8qBDrNfeKgl8EW2CIN1U-X6AnoCFO8QKJ3RJL7A_kn3qHafb-pRs-7EN8KW2lD-CKXweW8rNnJkwluXR1KhBBzHsO0JlINoiumEHA6v5wR9LdfNIJi2E66xBu4O40z3HAm17XqHLrWt7S1m3NdnXdNBaITx3Htgzb0HRX7Cdn6amaZ6uOaxq9_VSJm45kSZe2hh9zK2XMXb_uN5Qflp26JZsUx9MBqOiPs1ujKo3shVs720TfcaNN7n9HqhR7JBJxlu2PQNKMwcCyYWGVsL6jvEAtHEqY46kRNwmSpUOdtm2PIyW1pvj1etCPAtIAfisSvydRPvF4sxrK430Vn2mqLs4q_tAta4HUpen1ijJmD2O8RxTobaDM3mHAcL4b-m8ZZuQHMqzvvIs9NQwljIj5Hdls2YxpDe4EyDWmu5kUNrD7guUkhBOQVzEJduKC0j_3DM025ITD42mh6YD7AfKjwImiDnJDSff0iEWcpGYQZumIqFmkbKGECyhhQy-iyOVDhvWrEXrJzUJ8kBpZH1E2gZkUAD9AqRQiy9L5kEFyrxuggph_2gjU1BUnInH8eNiDOtUIG4A2dcQ1AL3tj4ZqHr9FNnxGy6fpLd_k5a_hMzt8jn26Pqvlu_gP6uzODfN0ZU7HSNed1CbY-IfGG_-QKPYh_8C4CQk_DpVVhOMcFgouWPZwSANlxWgBDaj-Xq5Rb_8C9tB1qw">
<img align="right" width="50%" src="https://mermaid.ink/img/pako:eNqdV1lv4zYQ_iuEFgskhePqPvywQHNhFw2aognaBdb7QEkjm7UOL0UlcYP895I6Iok67JYGZJHzzT0cUq9KkIWgrJScYQbXBG8oTi6e9HWK-Pj203d0cfEJFTnQFCfw8x7n-XNGQ9SnbzMa0OIFrdB9CijfYgooi9DDFieEVtAGIuBf7_-oFodyBfnLl-sVevj8y9l5heLzcv33-79WyFJVNcnRJ7TPnvlTK6d93J6SJ-7Mr3Co1jnf6Ho7L8lCY7t0Xrsorwrk58qXZUCBL58tl8tz7nrOMoo3gHZc3qiCd7f5S7mQkBdoQlm9T0svSMp0y0ZPOC5gnVZMZdJGGV6RNCqGMui1JKFL2AzfuMXfW3o5LakUfhSEp7KlNSsV9W8IWMfxpMgZ8gFBsmeHCaYxhe1aCRFFVRGr51v1N-algN-w7eNXZaEkQBNMQl7Kr4JhrbAtJLBWVvw1hAgXMVsriw7pT0wJ9mPIBea11qj4ONhtaFakYcX6vCUMakZB5zlNMD1cZXFGK8SHm6ubq9vbDiaHIEtDCRXxEXYlMaCM9EHbPD5z1YWo6o8L5NlL3TEt1XNVw_t4PjTiku8YoBK_bnIBtuB3J_nfDRyVYL8LMJaW7pma5tim0xPQ2D7K7x43oHbgEV5YN0aaoRmqOmaojOTbXtW1EYskIN34Z95SNI1yaDyqk7OugTFJoavPKEdPX9-gPpVXYnq528wXSAsY1IZfxlWryZ7hqNeXA7JekzEfPe2Y0ux5Czic9SDKUnbLG3R8qBDrNfeKgl8EW2CIN1U-X6AnoCFO8QKJ3RJL7A_kn3qHafb-pRs-7EN8KW2lD-CKXweW8rNnJkwluXR1KhBBzHsO0JlINoiumEHA6v5wR9LdfNIJi2E66xBu4O40z3HAm17XqHLrWt7S1m3NdnXdNBaITx3Htgzb0HRX7Cdn6amaZ6uOaxq9_VSJm45kSZe2hh9zK2XMXb_uN5Qflp26JZsUx9MBqOiPs1ujKo3shVs720TfcaNN7n9HqhR7JBJxlu2PQNKMwcCyYWGVsL6jvEAtHEqY46kRNwmSpUOdtm2PIyW1pvj1etCPAtIAfisSvydRPvF4sxrK430Vn2mqLs4q_tAta4HUpen1ijJmD2O8RxTobaDM3mHAcL4b-m8ZZuQHMqzvvIs9NQwljIj5Hdls2YxpDe4EyDWmu5kUNrD7guUkhBOQVzEJduKC0j_3DM025ITD42mh6YD7AfKjwImiDnJDSff0iEWcpGYQZumIqFmkbKGECyhhQy-iyOVDhvWrEXrJzUJ8kBpZH1E2gZkUAD9AqRQiy9L5kEFyrxuggph_2gjU1BUnInH8eNiDOtUIG4A2dcQ1AL3tj4ZqHr9FNnxGy6fpLd_k5a_hMzt8jn26Pqvlu_gP6uzODfN0ZU7HSNed1CbY-IfGG_-QKPYh_8C4CQk_DpVVhOMcFgouWPZwSANlxWgBDaj-Xq5Rb_8C9tB1qw" /></a>

We created a simple ethereum contract that can store one Horcrux (SSS split)  in a secure way. Here is the main idea 🧵
What? storing a secret in a public blochain is insaine !

**0/5** First, Shamir is considered enough secure ([1](https://github.com/WebOfTrustInfo/rwot8-barcelona/blob/master/draft-documents/shamir-secret-sharing-best-practices.md), [2](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing), [3](https://www.npmjs.com/package/secrets.js-34r7h), [4](https://crypto.stackexchange.com/questions/64082/formal-proof-of-shamirs-secret-sharing-scheme-security)) to store a private and we recommend to store only one share. That is, any combination of shares less than the necessary threshold conveys absolutely no information about the secret. Second, the shared part is XOR mixed with a private key before being stored. We already planned a tool to delegate the storage and avoid the relation between the original wallet and the stored Horcrux.

**1/5** To secure an Horcrux user have to choose and remember an email and password. 

**2/5** On browser, we computes a pair of values to secure the process. First one is the KECCAK256 hash of the text `ethers.utils.id(username+password)` that produce a `iid` (identity id). We compute the value `PoW` with the Proof-Of-Work of the `iid` ,both values are inputs for:

* mix (XOR) or encrypt the Horcrux,
* derive the storage key for the EVM,
* restore the Horcrux.

> Note: PoW on the client side, is a simple solution to to discourage the brut force attack.

**3/5** Because the initial Horcrux should not be stored on a public blockchain, we derive a `privateKey` based on the KECCAK256 hash of `iid` and `pow`. The the Horcrux has tobe MIXED (or encrypted) before to be stored. 

**4/5** At this point, the storage key is a derivation of the `privateKey`. That means that neither the privateKey or the horcrux can be restored.

**5/5** to restore the content we call a pur solidity function, that means no transaction, it's a silent call.

  
<br clear="right" />  
  

## Restore one Horcrux from Ethereum

[![](https://mermaid.ink/img/pako:eNqdV1lv4zYQ_iuCFgskhaPqPvywQHNhFxs0xSbYFljvAyVRMmFadCnJsRvkv3coybFEHXZLA4bI-ebgx-GQfFUjFmN1ruYFKvAtQSlH66utucgUaD9--alcXX1SyhzzDK3xrxuU5y-Mx0ot748L9Jcvt3Pl6fNvF5c1CvrV-B-Pf84VR9f1da58UjbsBf6NqtvFbTjZQjBf8b4eB73B8WO_EguPx6HGtzRYAT8zHvFyp3FccIK3-ELTNIDXChUPwxDlVZFardJmKi8YRyn-kS_RT2WugH7JM2WLaIkb9NvB07APYWRNdjiuQdVnNfjX47ejS2nqIKvHMwbBc5IuC4UlbdS83SE59FhcRmA63FccAfcz4PmysS-cCcPLOkYRsjpT15ivEYkhW14FbKEWS7zGC3UOnzFOUEmLhTprib4jTlBIcS4wr7XphRqiaJVyVmZxrfqyJAVuFIUcIl0jvr9hlPEa8eHu5u7m_r6FyXHEslhCJdDitqUC84J0QcucXvj6TCTex5kSuJrp2Y4e-LoVfLzsB3ENSY25pG_aYMAV-v6o_nuAgxbcdwOW5piBbRiea3sdA4fYB_X90wE0E3jGu6LNkWEZlq4PBSojYWfqpjEQkQTkaXgRaGJfV80AVkd77QApyXDbn1W1jr9uQF0pZGJ2vUqnE-QI6OVGWPFqNOLA8vTb657YbMQIWsc74py9LDGKJ2eQsKy4R2tC9zVisYBZcRyW0RIXCtQ96M-ULeYxytBMEbuFSupP5J9mhxnuZtemD4WYXktb6QP2xa8Fy6C8T9BUiaupjhER0TKHlZ9g8oBom-kR1tSHB5KtphedFBSPrzqOU_xw3sxRBLW4HVS1dZ1Ac03XcH3TtK2ZAl3Pcx3LtQzTF_vJ0wLdCFzd822rs59qc-NMVnJpa4QUopQxD928TzmcZ628JWmG6DgBtfx5cmvUqcF2EO1kEX3HDRa5_81UZfYEE5SxzQmIOMt6kfUTq4J1JwoJ6qBYwpxeGnE-Epb1fbquO4yU3Nri16lBf5c4i_Dv5TrsWJRPPChWfXtQV9GFoZvirII_03Fmiq7ZQScpafE0pHvCgXkkyu4cBgXKV_35O5adhJEM607eR4EexxJGcP4gbiMToR1wZ0BuEV9NLOEB9lgWOYnxGcgbSqKVuKB0zz3LcC15wfHzedS0wF2CwiTykqSFTDlpnx5U8CQVg5hlA6YmkXKEEi7ipOjPIkl8aDKsm424s7gsRnupkHURVRGYWAIMByiXKHIcE5oMkmtdDxVReH0I1NgVJyGUPu83WB8rhAeAMXbEHQDmsT5aun36FnnQs456hnnUG738HfTslp7nnu_POepd_Qd3buuGeb4zrxWk7496E2rw-HmDh0S5ieEpchcTOA7VeYJojmcqKgv2tM8idV7wEh9AzZO0Qb39C-9cSpA)](https://mermaid-js.github.io/mermaid-live-editor/edit/#pako:eNqdV1lv4zYQ_iuCFgskhaPqPvywQHNhFxs0xSbYFljvAyVRMmFadCnJsRvkv3coybFEHXZLA4bI-ebgx-GQfFUjFmN1ruYFKvAtQSlH66utucgUaD9--alcXX1SyhzzDK3xrxuU5y-Mx0ot748L9Jcvt3Pl6fNvF5c1CvrV-B-Pf84VR9f1da58UjbsBf6NqtvFbTjZQjBf8b4eB73B8WO_EguPx6HGtzRYAT8zHvFyp3FccIK3-ELTNIDXChUPwxDlVZFardJmKi8YRyn-kS_RT2WugH7JM2WLaIkb9NvB07APYWRNdjiuQdVnNfjX47ejS2nqIKvHMwbBc5IuC4UlbdS83SE59FhcRmA63FccAfcz4PmysS-cCcPLOkYRsjpT15ivEYkhW14FbKEWS7zGC3UOnzFOUEmLhTprib4jTlBIcS4wr7XphRqiaJVyVmZxrfqyJAVuFIUcIl0jvr9hlPEa8eHu5u7m_r6FyXHEslhCJdDitqUC84J0QcucXvj6TCTex5kSuJrp2Y4e-LoVfLzsB3ENSY25pG_aYMAV-v6o_nuAgxbcdwOW5piBbRiea3sdA4fYB_X90wE0E3jGu6LNkWEZlq4PBSojYWfqpjEQkQTkaXgRaGJfV80AVkd77QApyXDbn1W1jr9uQF0pZGJ2vUqnE-QI6OVGWPFqNOLA8vTb657YbMQIWsc74py9LDGKJ2eQsKy4R2tC9zVisYBZcRyW0RIXCtQ96M-ULeYxytBMEbuFSupP5J9mhxnuZtemD4WYXktb6QP2xa8Fy6C8T9BUiaupjhER0TKHlZ9g8oBom-kR1tSHB5KtphedFBSPrzqOU_xw3sxRBLW4HVS1dZ1Ac03XcH3TtK2ZAl3Pcx3LtQzTF_vJ0wLdCFzd822rs59qc-NMVnJpa4QUopQxD928TzmcZ628JWmG6DgBtfx5cmvUqcF2EO1kEX3HDRa5_81UZfYEE5SxzQmIOMt6kfUTq4J1JwoJ6qBYwpxeGnE-Epb1fbquO4yU3Nri16lBf5c4i_Dv5TrsWJRPPChWfXtQV9GFoZvirII_03Fmiq7ZQScpafE0pHvCgXkkyu4cBgXKV_35O5adhJEM607eR4EexxJGcP4gbiMToR1wZ0BuEV9NLOEB9lgWOYnxGcgbSqKVuKB0zz3LcC15wfHzedS0wF2CwiTykqSFTDlpnx5U8CQVg5hlA6YmkXKEEi7ipOjPIkl8aDKsm424s7gsRnupkHURVRGYWAIMByiXKHIcE5oMkmtdDxVReH0I1NgVJyGUPu83WB8rhAeAMXbEHQDmsT5aun36FnnQs456hnnUG738HfTslp7nnu_POepd_Qd3buuGeb4zrxWk7496E2rw-HmDh0S5ieEpchcTOA7VeYJojmcqKgv2tM8idV7wEh9AzZO0Qb39C-9cSpA)

# Steganography

> TODO

# Printer


# bitcoin

* https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/addresses.spec.ts
