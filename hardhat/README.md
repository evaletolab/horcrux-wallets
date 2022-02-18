# Horcrux State diagram

## Horcrux Store 
[![](https://mermaid.ink/img/pako:eNqdV1lv4zYQ_iuCFgukhePqPvywQJ0DBRokRR3sFqj7QEkjmTUleSkqiRvkv5e6bJGyZLc0YJsz3xz8OBxK72qYR6Au1IIhBrcYJRSl1y-GoqwzhY8_f_xLub7-opQF0Ayl8NMOFcVrTiNJv8lpSMu3RthOasUfT783wqGHSr18nNL-9vRtoeiapqWF8kXZ5a_8W69mjdHysUatfvm5mXO4KOB_asHdze2qFdXrbATKeyPqr2P3K-xPSCl-4WYH3UfzU4GbgCynKIFWegCLBPA_tSBABThWy187EZz0E22FyrsijWOSISIkQgzVTgqOh6Nut22zoPC9xBR6Zp2k0f4NIVMWtXkVLi0LpgSgQLpj-xEjKVQ9rRUVa41cYEudqSnQFOGIl1tN_VplG0hhrS743whiVBK2Vmc91VdEMQoIFBWm3a61GqBwm9C8zKLG9HWDGbSGlZ7vQIro_iYnOW0Qn-5u7m7u73uYAsI8iyRUzEfU98SAMiyCNgW58rRZVYefZ4rvzA3XsjXf00z_8w_DJJa8loFK9obFHTiVvTdqf0jwpAfn4MCc24Zv6brrWK7goMv9pL13PoF2Ac_wxvoc6aZuatqpRGUkP7eaoZ_ISALSJLjy57bWDp2zOjrrJ0hwBv14Zj2EeGJCopZXYrbcJtMFcgQMaiOoedVbtW-62u1yoDZaNeJDiI4ozV83gKLJFcR5xu5Rism-QazXfFUUgjLcAFN4H-TzmfICNEIZminVaSGS-Qr_054w3dm99elDAZCldJQ-gVd9erCM3w8TNNXqeqljRISENxOgE0x2iL6bAWFtf3jA2XZ60zEjML7rECXwcNnKUchbWj-p-uja_twxHN3xDMMyZwqfuq5jm46pG151nty5r-m-o7meZQrnqXE3zmStl45GQHiWMuZBrPuE8mupV7c4yRAZJ6DRP08ejaY08jee7WQTPeBONrn_zVTt9gwTJM93ZyBZzmCQ2bCwapi4UF6gNookzPmtqe59nGfDmI7jnEZKYa3qI_Sg7yVkITyWaSB4lG883qyG_nhfRVe6ZlR3Ff8ybHumaHPLF4qSsNUp2zMBjCNRlnAZMFRsh-u3TSsOQhkmLt5DvhZFEqbi_AEnGzaRWoe7AHKL6HZiCzvYU8kKHMEFyBuCw231gCLee6bumPKGw_Nl1PTAIkFBHLpx3EMmFPdvD1LxJDWDKM9OuJpEyhlKuJBiNlxFHHt8yDCxGkHY3DxCe6mRiYi6CUxsAfALlEoU2bbBhwySe90AFRL-0lGhxh5xYkzI834H2lgj7AD62BXXAYxjfzQ16_xTZGdnHu1042g3-vDX2Vk9O9e5PJ59tLv-D-Gc3hPm5cHcXpKeNxqtMuPvEh_8RaLc8TceuIswvw7VRYxIATMVlSxf7bNQXTBaQgdq32lb1Me_T41RkQ)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqdV1lv4zYQ_iuCFgukhePqPvywQJ0DBRokRR3sFqj7QEkjmTUleSkqiRvkv5e6bJGyZLc0YJsz3xz8OBxK72qYR6Au1IIhBrcYJRSl1y-GoqwzhY8_f_xLub7-opQF0Ayl8NMOFcVrTiNJv8lpSMu3RthOasUfT783wqGHSr18nNL-9vRtoeiapqWF8kXZ5a_8W69mjdHysUatfvm5mXO4KOB_asHdze2qFdXrbATKeyPqr2P3K-xPSCl-4WYH3UfzU4GbgCynKIFWegCLBPA_tSBABThWy187EZz0E22FyrsijWOSISIkQgzVTgqOh6Nut22zoPC9xBR6Zp2k0f4NIVMWtXkVLi0LpgSgQLpj-xEjKVQ9rRUVa41cYEudqSnQFOGIl1tN_VplG0hhrS743whiVBK2Vmc91VdEMQoIFBWm3a61GqBwm9C8zKLG9HWDGbSGlZ7vQIro_iYnOW0Qn-5u7m7u73uYAsI8iyRUzEfU98SAMiyCNgW58rRZVYefZ4rvzA3XsjXf00z_8w_DJJa8loFK9obFHTiVvTdqf0jwpAfn4MCc24Zv6brrWK7goMv9pL13PoF2Ac_wxvoc6aZuatqpRGUkP7eaoZ_ISALSJLjy57bWDp2zOjrrJ0hwBv14Zj2EeGJCopZXYrbcJtMFcgQMaiOoedVbtW-62u1yoDZaNeJDiI4ozV83gKLJFcR5xu5Rism-QazXfFUUgjLcAFN4H-TzmfICNEIZminVaSGS-Qr_054w3dm99elDAZCldJQ-gVd9erCM3w8TNNXqeqljRISENxOgE0x2iL6bAWFtf3jA2XZ60zEjML7rECXwcNnKUchbWj-p-uja_twxHN3xDMMyZwqfuq5jm46pG151nty5r-m-o7meZQrnqXE3zmStl45GQHiWMuZBrPuE8mupV7c4yRAZJ6DRP08ejaY08jee7WQTPeBONrn_zVTt9gwTJM93ZyBZzmCQ2bCwapi4UF6gNookzPmtqe59nGfDmI7jnEZKYa3qI_Sg7yVkITyWaSB4lG883qyG_nhfRVe6ZlR3Ff8ybHumaHPLF4qSsNUp2zMBjCNRlnAZMFRsh-u3TSsOQhkmLt5DvhZFEqbi_AEnGzaRWoe7AHKL6HZiCzvYU8kKHMEFyBuCw231gCLee6bumPKGw_Nl1PTAIkFBHLpx3EMmFPdvD1LxJDWDKM9OuJpEyhlKuJBiNlxFHHt8yDCxGkHY3DxCe6mRiYi6CUxsAfALlEoU2bbBhwySe90AFRL-0lGhxh5xYkzI834H2lgj7AD62BXXAYxjfzQ16_xTZGdnHu1042g3-vDX2Vk9O9e5PJ59tLv-D-Gc3hPm5cHcXpKeNxqtMuPvEh_8RaLc8TceuIswvw7VRYxIATMVlSxf7bNQXTBaQgdq32lb1Me_T41RkQ)


# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
