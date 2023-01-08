import {
  detectConcordiumProvider,
  WalletApi,
} from "@concordium/browser-wallet-api-helpers";
import {
  CcdAmount,
  AccountAddress,
  AccountTransactionType,
  TransactionExpiry,
  signTransaction,
  AccountTransaction,
  buildBasicAccountSigner,
  ModuleReference,
  deserializeReceiveReturnValue,
  SchemaVersion,
} from "@concordium/common-sdk";
import { Buffer } from "buffer";

const SCHEMA =
  "//8DAQAAAAYAAABtYXJrZXQAAgAAAAgAAABhZGRfaXRlbQQUAAQAAAAEAAAAbmFtZRYCBQAAAHByaWNlBQwAAAB0b3RhbF9zdXBwbHkFCQAAAGltYWdlX3VybBYCFQEAAAAQAAAAUGFyc2VQYXJhbXNFcnJvcgIEAAAAdmlldwIQAgUQAhUCAAAABAAAAE5vbmUCBAAAAFNvbWUBAQAAABQABwAAAAQAAABuYW1lFgIFAAAAcHJpY2UFDAAAAHRvdGFsX3N1cHBseQUJAAAAaW1hZ2VfdXJsFgIEAAAAc29sZAUHAAAAY3JlYXRvchUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwGAAAAb3duZXJzEAIVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMAA==";

const MODULE_REF = new ModuleReference(
  "eef4a934ac3bd61faf061dce1e8f35d499171efa50286e0e94c968c5bd8c8b12"
);

const CONTRACT_INDEX = BigInt(2431);
const CONTRACT_SUBINDEX = BigInt(0);

const ZERO_AMOUNT = new CcdAmount(BigInt(0));

export const connectToWallet = async () => {
  const provider = await detectConcordiumProvider();
  const accountAddr = await provider.connect();

  return { provider, account: accountAddr };
};

export const sendMoney = async (provider: WalletApi, account: string) => {
  const client = provider.getJsonRpcClient();

  const senderAddress = new AccountAddress(account);
  const expiry = new TransactionExpiry(new Date(Date.now() + 3600000));
  const nonce = await client.getNextAccountNonce(senderAddress);

  const transaction: AccountTransaction = {
    header: {
      sender: senderAddress,
      expiry,
      nonce: nonce?.nonce!,
    },
    payload: {
      amount: new CcdAmount(BigInt(1)),
      toAddress: senderAddress,
    },
    type: AccountTransactionType.Transfer,
  };

  const sig = await signTransaction(
    transaction,
    buildBasicAccountSigner(process.env.PVT_KEY ?? "")
  );

  client
    .sendAccountTransaction(transaction, sig)
    .then((val) => {
      console.log(`Success: ${val}`);
    })
    .catch((err) => console.log(`Error: ${err}`));
};

export const getAllItems = async (provider: WalletApi, account: string) => {
  const client = provider.getJsonRpcClient();

  client
    .invokeContract({
      contract: {
        index: CONTRACT_INDEX,
        subindex: CONTRACT_SUBINDEX,
      },
      method: "market.view",
      invoker: new AccountAddress(account),
    })
    .then((result) => {
      if (result == undefined || result?.tag == "failure") {
        throw new Error(result?.reason.tag ?? "Failed to invoke contract");
      }

      console.log(result.returnValue);

      const deserializedValue = deserializeReceiveReturnValue(
        // toBuffer(result.returnValue ?? "", "hex"),
        // toBuffer(SCHEMA, "base64"),

        Buffer.from(result.returnValue, "hex"),
        Buffer.from(SCHEMA, "base64"),
        "market",
        "view",
        SchemaVersion.V2
      );

      console.log(deserializedValue);
    })
    .catch(console.log);

  provider
    .sendTransaction(
      account,
      AccountTransactionType.Update,
      {
        amount: new CcdAmount(BigInt(1)),
        maxContractExecutionEnergy: BigInt(3000),
        initName: "market",
        moduleRef: MODULE_REF,
      },
      {},
      SCHEMA
    )
    .then((val) => {
      console.log(`Success: ${val}`);
    })
    .catch((err) => console.log(`Error: ${err}`));
};
