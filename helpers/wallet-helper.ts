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
  "829b6edb6383ffe0510247979bef9523e45b84131b049d43e5ba2675d000e65d"
);

const CONTRACT_INDEX = BigInt(2436);
const CONTRACT_SUBINDEX = BigInt(0);

const CONTRACT_ADDRESS = {
  index: CONTRACT_INDEX,
  subindex: CONTRACT_SUBINDEX,
};

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

export const getItemCount = async (provider: WalletApi, account: string) => {
  const client = provider.getJsonRpcClient();

  client
    .invokeContract({
      contract: CONTRACT_ADDRESS,
      method: "market.get_item_count",
      invoker: new AccountAddress(account),
    })
    .then((result) => {
      if (result == undefined || result?.tag == "failure") {
        console.log(result);

        console.error(`Rejection Result: ${result?.reason.tag}`);
        throw new Error(result?.reason.tag ?? "Failed to invoke contract");
      }

      console.log(result.returnValue);

      // const deserializedValue = deserializeReceiveReturnValue(
      //   // toBuffer(result.returnValue ?? "", "hex"),
      //   // toBuffer(SCHEMA, "base64"),

      //   Buffer.from(result.returnValue, "hex"),
      //   Buffer.from(SCHEMA, "base64"),
      //   "market",
      //   "view"
      //   // SchemaVersion.V2
      // );

      // console.log(deserializedValue);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const contractInfo = async (provider: WalletApi, account: string) => {
  const client = provider.getJsonRpcClient();

  client
    .getInstanceInfo(
      CONTRACT_ADDRESS,
      "f31544254fc442afbe098896772c4f869e3ced67435f309eb2aac74364cbe43a"
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
};
