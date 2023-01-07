import { Button, Grid } from "@mui/material";
import ItemCard from "../cards/item-card";
import classes from "./home.module.scss";

interface CardsGroup {}

const CardsGroup: React.FC<CardsGroup> = ({}) => {
  const items = Array(25).fill({
    name: "Dark Elixer",
    price: 100,
    img_url: "https://wallpapercave.com/wp/wp2424020.jpg",
    creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
    owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
  });

  return (
    <div className={classes.cardsGroup}>
      <Grid container gap={3} justifyContent="center">
        {items.map((item, i) => {
          return (
            <Grid item key={i}>
              <ItemCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CardsGroup;
