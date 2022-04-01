A tool to organise and manage paper wallets without thirdparties.
# Installation

``` bash
> npm i
> npm run btc
```
try the demo, https://evaletolab.github.io/horcrux-wallets/

# Project goal

The goal of this application is to provide a few solutions to protect a Mnemonic without the needs of a trusted thirdparties.

We propose the usage of Shamir Shared Secret (SSS) to protect your Mnemonic without the problem of single point of security. We decide to use as source of SSS the entropy that produce the Mnemonic. Shamir split entropy in **3 separate pieces** (called Horcruxes). Your need at least two pieces to reconstitute deterministicaly the same Mnemonic. We recomend you keep them in separate places/locations:

* Use printed paper.
* Use a digital pipcture with our Steganography solution.
* And use our Horcrux SmartContract. 👇


## Store one Horcrux on Ethereum

<a href="https://mermaid.ink/img/pako:eNqdV1lv4zYQ_iuCFgskhePqPvywQHNhFw2aojHaBdb7QEkjmzUleSkqsRvkv5fUEUvUYbc0IIsz35wcDqlXNcwiUBdqzhCDW4zWFCVXz8YqVfj49tN35erqk1LkQFOUwM87lOcvGY2ULn-T0ZAW-4pYT0rG18c_KmJfg2B_-XK7UJ4-_3JxWaH4vKT__vjXQrE1TUty5ZOyy174Uy-nXdyO4mfu9q9wqOhcbpB-nJdsYfFIuqyDkakC-bmKZR5S4OSL-Xx-qSyUnGUUrUHZcn2DBt7D5i8lIcF7aJJWvY9rL3DKDNtRnhEpYJVWQuXyDAq8KtKoBMqk15qELeEzfOMefz_yy2nJpfCjwBRasg2l4v4NIWsFnhQ5UwJQINmxw4jQkMEjrYSI8qmY1fOt-huKUsDv2Gb5VZ2pCdAE4YgX7asQWKlsAwms1AV_jSBGBWErddZi_YkoRgGBXGBea4tqgMLtmmZFGlWiLxvMoBYUfL6mCaKHm4xktEJ8uLu5u7m_b2FyCLM0klAxH1FbEwPKcBe0ycmFp81EVX-cKb4zN1zL1nxPM_2Pl30nrvmOASrJGxZX4Ah5b1T-3cFBDc67AnNuG76l665juR0Fje-D8t5pB-oAlrBn7Rzppm5q2pCjMpJve83QBzySgHQdXPhz0TTKofOsjs7aDhKcQtueWY6Ova5DXS6vxPR6u54ukCOgVxtBmVe9Zvumq91e99hGzUZ8dKwjSrOXDaBoMoI4S9k9SjA5VIjVikdFISjCDTCFN1U-nynPQCOUopkidguRxJ_wP_UO053dvp0-FAC5lrbSB_DErwVL-SkzkaaSXYY6loiQ8J4DdCKTDaKtppewuj884HQ7veiYERhfdYjW8HBe5CjkTa_tVLl1bX_uGI7ueIZhmTOFT13XsU3H1A1P7Cd37mu672iuZ5md_VSpG89kyZe2RkC4lzLmoVv3a8oPy1bd4nWKyHgCKv5ycmtUpZHtubeTTfQdN9jk_nemSrUnMkGybHcCkmYMep71C6uEdQPlBWqjSMKcXhpxk8BZ2rfpOM4wUjJriV-nB_0oIA3htyIJOhrlE483q74-3lfRha4Z4qziD8O2Z4o2t_xOURL2NCR7woBxTJTVOQwYyrf9-G3TioNQhnWD95CvRZGEETl_wOsNm3CtwZ0BuUV0O7GEDeyxYDmO4AzkDcHhVlxQuueeqTumvOCwPC81LXA3QUEcunHcQq4pbp8eRORJagZRlg6omkTKHkq4kGLWjyKOPT5kWLcaobO4WYQOUiPrIsomMLEEwA9QKqXItg0-ZJDc63qokPBPG4Eau-LEmJDlYQfaWCNsAPrYEdcAjGN_NDXr9C2ykTOPcrpxlBu9_DVyVkvOdc63Zx_lrv6DOad1wzzfmNty0vNGrQkx_qHxxj8kil3EPzDuIsyPQ3URI5LDTEUFy54OaaguGC2gAdVfxjXq7V_u7G5j)](https://mermaid-js.github.io/mermaid-live-editor/edit/#pako:eNqdV1lv4zYQ_iuCFgskhePqPvywQHNhFw2aojHaBdb7QEkjmzUleSkqsRvkv5fUEUvUYbc0IIsz35wcDqlXNcwiUBdqzhCDW4zWFCVXz8YqVfj49tN35erqk1LkQFOUwM87lOcvGY2ULn-T0ZAW-4pYT0rG18c_KmJfg2B_-XK7UJ4-_3JxWaH4vKT__vjXQrE1TUty5ZOyy174Uy-nXdyO4mfu9q9wqOhcbpB-nJdsYfFIuqyDkakC-bmKZR5S4OSL-Xx-qSyUnGUUrUHZcn2DBt7D5i8lIcF7aJJWvY9rL3DKDNtRnhEpYJVWQuXyDAq8KtKoBMqk15qELeEzfOMefz_yy2nJpfCjwBRasg2l4v4NIWsFnhQ5UwJQINmxw4jQkMEjrYSI8qmY1fOt-huKUsDv2Gb5VZ2pCdAE4YgX7asQWKlsAwms1AV_jSBGBWErddZi_YkoRgGBXGBea4tqgMLtmmZFGlWiLxvMoBYUfL6mCaKHm4xktEJ8uLu5u7m_b2FyCLM0klAxH1FbEwPKcBe0ycmFp81EVX-cKb4zN1zL1nxPM_2Pl30nrvmOASrJGxZX4Ah5b1T-3cFBDc67AnNuG76l665juR0Fje-D8t5pB-oAlrBn7Rzppm5q2pCjMpJve83QBzySgHQdXPhz0TTKofOsjs7aDhKcQtueWY6Ova5DXS6vxPR6u54ukCOgVxtBmVe9Zvumq91e99hGzUZ8dKwjSrOXDaBoMoI4S9k9SjA5VIjVikdFISjCDTCFN1U-nynPQCOUopkidguRxJ_wP_UO053dvp0-FAC5lrbSB_DErwVL-SkzkaaSXYY6loiQ8J4DdCKTDaKtppewuj884HQ7veiYERhfdYjW8HBe5CjkTa_tVLl1bX_uGI7ueIZhmTOFT13XsU3H1A1P7Cd37mu672iuZ5md_VSpG89kyZe2RkC4lzLmoVv3a8oPy1bd4nWKyHgCKv5ycmtUpZHtubeTTfQdN9jk_nemSrUnMkGybHcCkmYMep71C6uEdQPlBWqjSMKcXhpxk8BZ2rfpOM4wUjJriV-nB_0oIA3htyIJOhrlE483q74-3lfRha4Z4qziD8O2Z4o2t_xOURL2NCR7woBxTJTVOQwYyrf9-G3TioNQhnWD95CvRZGEETl_wOsNm3CtwZ0BuUV0O7GEDeyxYDmO4AzkDcHhVlxQuueeqTumvOCwPC81LXA3QUEcunHcQq4pbp8eRORJagZRlg6omkTKHkq4kGLWjyKOPT5kWLcaobO4WYQOUiPrIsomMLEEwA9QKqXItg0-ZJDc63qokPBPG4Eau-LEmJDlYQfaWCNsAPrYEdcAjGN_NDXr9C2ykTOPcrpxlBu9_DVyVkvOdc63Zx_lrv6DOad1wzzfmNty0vNGrQkx_qHxxj8kil3EPzDuIsyPQ3URI5LDTEUFy54OaaguGC2gAdVfxjXq7V_u7G5j"><img align="right" width="50%" src="https://mermaid.ink/img/pako:eNqdV1lv4zYQ_iuCFgskhePqPvywQHNhFw2aojHaBdb7QEkjmzUleSkqsRvkv5fUEUvUYbc0IIsz35wcDqlXNcwiUBdqzhCDW4zWFCVXz8YqVfj49tN35erqk1LkQFOUwM87lOcvGY2ULn-T0ZAW-4pYT0rG18c_KmJfg2B_-XK7UJ4-_3JxWaH4vKT__vjXQrE1TUty5ZOyy174Uy-nXdyO4mfu9q9wqOhcbpB-nJdsYfFIuqyDkakC-bmKZR5S4OSL-Xx-qSyUnGUUrUHZcn2DBt7D5i8lIcF7aJJWvY9rL3DKDNtRnhEpYJVWQuXyDAq8KtKoBMqk15qELeEzfOMefz_yy2nJpfCjwBRasg2l4v4NIWsFnhQ5UwJQINmxw4jQkMEjrYSI8qmY1fOt-huKUsDv2Gb5VZ2pCdAE4YgX7asQWKlsAwms1AV_jSBGBWErddZi_YkoRgGBXGBea4tqgMLtmmZFGlWiLxvMoBYUfL6mCaKHm4xktEJ8uLu5u7m_b2FyCLM0klAxH1FbEwPKcBe0ycmFp81EVX-cKb4zN1zL1nxPM_2Pl30nrvmOASrJGxZX4Ah5b1T-3cFBDc67AnNuG76l665juR0Fje-D8t5pB-oAlrBn7Rzppm5q2pCjMpJve83QBzySgHQdXPhz0TTKofOsjs7aDhKcQtueWY6Ova5DXS6vxPR6u54ukCOgVxtBmVe9Zvumq91e99hGzUZ8dKwjSrOXDaBoMoI4S9k9SjA5VIjVikdFISjCDTCFN1U-nynPQCOUopkidguRxJ_wP_UO053dvp0-FAC5lrbSB_DErwVL-SkzkaaSXYY6loiQ8J4DdCKTDaKtppewuj884HQ7veiYERhfdYjW8HBe5CjkTa_tVLl1bX_uGI7ueIZhmTOFT13XsU3H1A1P7Cd37mu672iuZ5md_VSpG89kyZe2RkC4lzLmoVv3a8oPy1bd4nWKyHgCKv5ycmtUpZHtubeTTfQdN9jk_nemSrUnMkGybHcCkmYMep71C6uEdQPlBWqjSMKcXhpxk8BZ2rfpOM4wUjJriV-nB_0oIA3htyIJOhrlE483q74-3lfRha4Z4qziD8O2Z4o2t_xOURL2NCR7woBxTJTVOQwYyrf9-G3TioNQhnWD95CvRZGEETl_wOsNm3CtwZ0BuUV0O7GEDeyxYDmO4AzkDcHhVlxQuueeqTumvOCwPC81LXA3QUEcunHcQq4pbp8eRORJagZRlg6omkTKHkq4kGLWjyKOPT5kWLcaobO4WYQOUiPrIsomMLEEwA9QKqXItg0-ZJDc63qokPBPG4Eau-LEmJDlYQfaWCNsAPrYEdcAjGN_NDXr9C2ykTOPcrpxlBu9_DVyVkvOdc63Zx_lrv6DOad1wzzfmNty0vNGrQkx_qHxxj8kil3EPzDuIsyPQ3URI5LDTEUFy54OaaguGC2gAdVfxjXq7V_u7G5j" /></a>

We create a simple ethereum contract that can store one Horcrux (SSS split)  in a secure way. Here is the main idea 🧵

**1/5** To secure an Horcrux user have to choose and remember an email and password. 


**2/5** On browser, we computes a pair of values to secure the process. First one is the KECCAK256 hash of the text `ethers.utils.id(username+password)` that produce a `iid` (identity id). We compute the value `PoW` with the Proof-Of-Work of the `iid` ,both values are inputs for:

* mix (XOR) or encrypt the Horcrux,
* generate the storage key on EVM,
* restore the Horcrux.

> Note: PoW on the client side, is a simple solution to to discourage the brut force attack.

**3/5** Because the initial Horcrux should not be stored on a public blockchain, we derive a `privateKey` based on the KECCAK256 hash of `iid` and `pow`. The the Horcrux has tobe MIXED (or encrypted) before to be stored. 


**4/5** At this point, we derive the key used for the storage with the KECCAK256 hash of the privateKey. That means that neither the privateKey or the horcrux can be restored.

**5/5** to restore the content we use a pur function in solidity, that means no transaction, it's a silent call

  
<br clear="right" />  
  

## Restore one Horcrux from Ethereum

[![](https://mermaid.ink/img/pako:eNqdl-tv2zYQwP8VQUUBp1A8vR_-UGB5oUWDZliCbUDdD5RE2YQp0aOkxF6Q_31HPWKJsmRvNGCIvN8dj8fjUXpVIxZjdaHmBSrwDUErjtLLZ3OZKdB-fPqpXF5-Vsoc8wyl-JctyvMXxmOllg_HBf31681Cefzy6-yipqBfjf_28OdCcXRdT3Pls7JlL_BvVN0-94XxiJe7OccxxulsPp83hsDAOFAj1TKOAcqrIrVaQbRPV98ru-BzZzBjWYTb8Q4tes3oLF-ji56kGqnEecE4WuEfMPBTWSgco1h5RrTEjam31uVjzgoDKdnhuEaqx2rwr4ffD75vOXmG5X7D-1ZWj2cMYkBxUigs6UKLbofk0GNxGYHlcF_5DhugQYwvGvNiLmF3XTso_FU1NcU8RSSGlHkV2FIt1jjFS3UBjzFOUEmLpap1RH8gTlBIcS6Y19r0Ug1RtFlxVmZxrfqyJgVuFIUcPE0R318zynhNfLi9vr2-u-swOY5YFktUAi3uWiowL0gfWud05uuayL6PmhK4c9OzHT3wdSv4eDF04goyG3NJ37TBgCv0_VH9dwePWnDfDVhzxwxsw_Bc2-sZaH0_qu-fdqBZwBPeFd0YGZZh6foxR2USjqduGkc8kkC-CmfBXBzuqhkQ1dFe10FKMtydz6pab76-Q30pZGJ2tVlNJ8gBGORGWMXVaMSB5ek3VwOx2YgRtN7siHP2soaDPbmChGXFHUoJ3dfEcgmr4jgsozUuFCh-0NeUZ8xjlCFNEaeFSuqP5J_mhBnudtcNHwoxvZKO0gfsi18Hy6DGT4SpEldLHQtERMscdn4iki3RNTMIWFMf7km2md50UlA8vus4XuH781aOIijDXaeqo-sEc9d0Ddc3TdvSFOh6nutYrmWYvjhP3jzQjcDVPd-2euepNjceyUouHY2Qgpcyc9_P-xXH-27eklWG6HgAavnT5NGoU4PtwNvJIvrOHS1y_ztSldkTkaCMbU8g4iobeDZMrArrLxQS1EGxxJzeGnE_EpYN53Rd9zgpTWuLX68G_V1ieJP4XqZhz6J840GxGtqDuopmhm6Kuwr-TMfRFH1uB72kpMXjMd0TE5iHQNm9y6BA-Wa4fseykzCSsf7ifRTocSwxIub3ZLUuJlxruTOQG8Q3E1vYYg9lkZMYn0FeUxJtxAtK_96zDNeSNxw_nReaDtwPUJhEXpJ0yBUn3duDijhJxSBm2RFTk6TsocRFnBTDVSSJD03G-tmIe5vLYrSXClmfqIrAxBZguEC5FCLHMaHJkFzrBlRE4RNEUGOvOAmh9Gm_xfpYIWwBY-yKawHzUB8t3T79FtnqWQc9wzzojb78tXp2R89zz5_POehd_ofp3M4b5vmTeR0nfX90NqEGXz5v8CFRbmP4FLmNCVyH6iJBNMeaisqCPe6zSF0UvMQt1HyXNtTbv2rYQtI)](https://mermaid-js.github.io/mermaid-live-editor/edit/#pako:eNqdl-tv2zYQwP8VQUUBp1A8vR_-UGB5oUWDZliCbUDdD5RE2YQp0aOkxF6Q_31HPWKJsmRvNGCIvN8dj8fjUXpVIxZjdaHmBSrwDUErjtLLZ3OZKdB-fPqpXF5-Vsoc8wyl-JctyvMXxmOllg_HBf31681Cefzy6-yipqBfjf_28OdCcXRdT3Pls7JlL_BvVN0-94XxiJe7OccxxulsPp83hsDAOFAj1TKOAcqrIrVaQbRPV98ru-BzZzBjWYTb8Q4tes3oLF-ji56kGqnEecE4WuEfMPBTWSgco1h5RrTEjam31uVjzgoDKdnhuEaqx2rwr4ffD75vOXmG5X7D-1ZWj2cMYkBxUigs6UKLbofk0GNxGYHlcF_5DhugQYwvGvNiLmF3XTso_FU1NcU8RSSGlHkV2FIt1jjFS3UBjzFOUEmLpap1RH8gTlBIcS6Y19r0Ug1RtFlxVmZxrfqyJgVuFIUcPE0R318zynhNfLi9vr2-u-swOY5YFktUAi3uWiowL0gfWud05uuayL6PmhK4c9OzHT3wdSv4eDF04goyG3NJ37TBgCv0_VH9dwePWnDfDVhzxwxsw_Bc2-sZaH0_qu-fdqBZwBPeFd0YGZZh6foxR2USjqduGkc8kkC-CmfBXBzuqhkQ1dFe10FKMtydz6pab76-Q30pZGJ2tVlNJ8gBGORGWMXVaMSB5ek3VwOx2YgRtN7siHP2soaDPbmChGXFHUoJ3dfEcgmr4jgsozUuFCh-0NeUZ8xjlCFNEaeFSuqP5J_mhBnudtcNHwoxvZKO0gfsi18Hy6DGT4SpEldLHQtERMscdn4iki3RNTMIWFMf7km2md50UlA8vus4XuH781aOIijDXaeqo-sEc9d0Ddc3TdvSFOh6nutYrmWYvjhP3jzQjcDVPd-2euepNjceyUouHY2Qgpcyc9_P-xXH-27eklWG6HgAavnT5NGoU4PtwNvJIvrOHS1y_ztSldkTkaCMbU8g4iobeDZMrArrLxQS1EGxxJzeGnE_EpYN53Rd9zgpTWuLX68G_V1ieJP4XqZhz6J840GxGtqDuopmhm6Kuwr-TMfRFH1uB72kpMXjMd0TE5iHQNm9y6BA-Wa4fseykzCSsf7ifRTocSwxIub3ZLUuJlxruTOQG8Q3E1vYYg9lkZMYn0FeUxJtxAtK_96zDNeSNxw_nReaDtwPUJhEXpJ0yBUn3duDijhJxSBm2RFTk6TsocRFnBTDVSSJD03G-tmIe5vLYrSXClmfqIrAxBZguEC5FCLHMaHJkFzrBlRE4RNEUGOvOAmh9Gm_xfpYIWwBY-yKawHzUB8t3T79FtnqWQc9wzzojb78tXp2R89zz5_POehd_ofp3M4b5vmTeR0nfX90NqEGXz5v8CFRbmP4FLmNCVyH6iJBNMeaisqCPe6zSF0UvMQt1HyXNtTbv2rYQtI)

# Steganography

> TODO

# Printer
