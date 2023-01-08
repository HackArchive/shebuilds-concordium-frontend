import { Button, Grid } from "@mui/material";
import useWallet from "../../context/wallet-context/use-wallet";
import {
  contractInfo,
  getItemCount,
  sendMoney,
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
            onClick={() => {
              // getItemCount(wallet.state.provider!, wallet.state.account!);
              // contractInfo(wallet.state.provider!, wallet.state.account!);
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
