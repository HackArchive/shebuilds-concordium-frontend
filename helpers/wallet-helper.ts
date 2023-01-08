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
  SchemaVersion,
  deserializeReceiveReturnValue,
} from "@concordium/common-sdk";
import { Buffer } from "buffer";

const SCHEMA =
  "//8DAQAAAAYAAABtYXJrZXQABgAAAAgAAABhZGRfaXRlbQYUAAQAAAAEAAAAbmFtZRYCBQAAAHByaWNlCgwAAAB0b3RhbF9zdXBwbHkFCQAAAGltYWdlX3VybBYCBRUGAAAAEAAAAFBhcnNlUGFyYW1zRXJyb3ICDwAAAE5hbWVMZW5ndGhFcnJvcgIQAAAAVG90YWxTdXBwbHlFcnJvcgINAAAASW1hZ2VVcmxFcnJvcgIRAAAASXRlbU5vdEZvdW5kRXJyb3ICEQAAAEl0ZW1Ob3RPd25lZEVycm9yAggAAABidXlfaXRlbQYQAgUQAg8FARUGAAAAEAAAAFBhcnNlUGFyYW1zRXJyb3ICDwAAAE5hbWVMZW5ndGhFcnJvcgIQAAAAVG90YWxTdXBwbHlFcnJvcgINAAAASW1hZ2VVcmxFcnJvcgIRAAAASXRlbU5vdEZvdW5kRXJyb3ICEQAAAEl0ZW1Ob3RPd25lZEVycm9yAg0AAABnZXRfYWxsX2l0ZW1zARACDwUUAAcAAAAEAAAAbmFtZRYCBQAAAHByaWNlCgwAAAB0b3RhbF9zdXBwbHkFCQAAAGltYWdlX3VybBYCBAAAAHNvbGQFBwAAAGNyZWF0b3IVAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMBgAAAG93bmVycxACFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADA4AAABnZXRfaXRlbV9jb3VudAEFDwAAAGdldF9zaW5nbGVfaXRlbQIFFAAHAAAABAAAAG5hbWUWAgUAAABwcmljZQoMAAAAdG90YWxfc3VwcGx5BQkAAABpbWFnZV91cmwWAgQAAABzb2xkBQcAAABjcmVhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAYAAABvd25lcnMQAhUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwNAAAAdHJhbnNmZXJfaXRlbQYPBRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwBFQYAAAAQAAAAUGFyc2VQYXJhbXNFcnJvcgIPAAAATmFtZUxlbmd0aEVycm9yAhAAAABUb3RhbFN1cHBseUVycm9yAg0AAABJbWFnZVVybEVycm9yAhEAAABJdGVtTm90Rm91bmRFcnJvcgIRAAAASXRlbU5vdE93bmVkRXJyb3ICAA==";

const MODULE_REF = new ModuleReference(
  "8beeb44b68c55f46bd577e5bdbb95f195e7b4ca2e550071dcbd7c822a8c8342b"
);

const CONTRACT_INDEX = BigInt(2438);
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
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAllItems = async (provider: WalletApi, account: string) => {
  const client = provider.getJsonRpcClient();

  // console.log(Buffer.from([0, 1]));
  // console.log(Buffer.from([0, 1]));

  return client
    .invokeContract({
      contract: CONTRACT_ADDRESS,
      method: "market.get_all_items",
      invoker: new AccountAddress(account),
    })
    .then((result) => {
      if (result == undefined || result?.tag == "failure") {
        console.log(result);

        console.error(`Rejection Result: ${result?.reason.tag}`);
        throw new Error(result?.reason.tag ?? "Failed to invoke contract");
      }

      console.log(result.returnValue);

      const data = {
        result: result.returnValue ?? "",
        schema: SCHEMA,
      };

      return data;

      // const dRes = deserializeReceiveReturnValue(
      //   Buffer.from(result.returnValue!, "hex"),
      //   Buffer.from(SCHEMA, "base64"),
      //   "market",
      //   "get_all_items"
      //   // SchemaVersion.V2
      // );

      // console.log(dRes);
    })
    .catch((err) => {
      console.error(err);

      return undefined;
    });
};

export const addItem = async (provider: WalletApi, account: string) => {
  const client = provider.getJsonRpcClient();

  provider
    .sendTransaction(
      account,
      AccountTransactionType.Update,
      {
        amount: ZERO_AMOUNT,
        address: CONTRACT_ADDRESS,
        receiveName: "market.add_item",
        maxContractExecutionEnergy: BigInt(3000),
      },
      {
        name: "Dark Elixer",
        price: 100,
        total_supply: 100,
        image_url: "https://wallpapercave.com/wp/wp2424020.jpg",
      },
      SCHEMA
    )
    .then((txHash) => {
      console.log(txHash);
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
      "9d9b29d823e06bd170d8c6945e3f41fa337e4dc19e55e1e9f3070a55ad822209"
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
};
