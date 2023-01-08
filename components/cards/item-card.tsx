import { deserializeReceiveReturnValue } from "@concordium/common-sdk";
import * as WebSDK from "@concordium/web-sdk";
import { Button, Grid } from "@mui/material";
import useWallet from "../../context/wallet-context/use-wallet";
import {
  contractInfo,
  getItemCount,
  addItem,
  sendMoney,
  getAllItems,
} from "../../helpers/wallet-helper";
import classes from "./card.module.scss";

interface ItemCardProps {
  name: string;
  price: number;
  img_url: string;
  creator: string;
  owners: string[];
  className?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  img_url,
  creator,
  owners,
  className,
}) => {
  const wallet = useWallet();

  return (
    <div className={classes.card}>
      <img src={img_url} alt="Item Image" />

      <p>Dark Elixer</p>

      <p>
        Buy from <span>CCD {price}</span>
      </p>

      <Grid container gap={1}>
        <Grid item flexGrow={1}>
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={async () => {
              // contractInfo(wallet.state.provider!, wallet.state.account!);
              // addItem(wallet.state.provider!, wallet.state.account!);
              const data = await getAllItems(
                wallet.state.provider!,
                wallet.state.account!
              );

              if (data == undefined) return;

              // const dRes = deserializeReceiveReturnValue(
              //   WebSDK.toBuffer(data.result, "hex"),
              //   WebSDK.toBuffer(data.schema, "base64"),
              //   "market",
              //   "get_all_items"
              //   // SchemaVersion.V2
              // );

              console.log(data);

              // getItemCount(wallet.state.provider!, wallet.state.account!);
            }}
          >
            BUY
          </Button>
        </Grid>

        <Grid item flexGrow={1}>
          <Button variant="contained" fullWidth color="error">
            SELL
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemCard;
