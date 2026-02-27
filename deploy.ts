import { AztecAddress, createPXEClient, getSandboxAccounts } from '@aztec/aztec.js';
// Import compiled contract (Assuming successful Nargo compilation)
import { KampungTokenContract } from './target/KampungToken.js';

const PXE_URL = 'http://localhost:8080'; // Local Aztec Sandbox URL

async function main() {
    console.log("🌴 Initiating Kampung Token Deployment (Private L2) 🌴");
    
    // 1. Connect to the Aztec network (Sandbox/Testnet)
    const pxe = createPXEClient(PXE_URL);
    
    // 2. Retrieve the deployer's account (Village Head / Admin)
    const accounts = await getSandboxAccounts(pxe);
    const adminAccount = accounts[0];

    console.log(`Preparing deployment transaction from wallet: ${adminAccount.address.toString()}`);

    // 3. Deploy Contract with an Initial Supply of 1,000,000 Tokens
    const initialSupply = 1_000_000n;
    console.log("⏳ Processing Zero-Knowledge Proof for deployment...");
    
    const tx = KampungTokenContract.deploy(pxe, initialSupply, adminAccount.address).send();
    const receipt = await tx.wait();

    console.log(`✅ SUCCESS! Kampung Token successfully deployed to the Aztec network!`);
    console.log(`📍 Smart Contract Address: ${receipt.contractAddress?.toString()}`);
}

main().catch((err) => {
    console.error("Deployment failed:", err);
});
