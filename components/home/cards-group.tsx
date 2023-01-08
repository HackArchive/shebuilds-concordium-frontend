import { Button, Grid } from "@mui/material";
import ItemCard from "../cards/item-card";
import classes from "./home.module.scss";

interface CardsGroup {}

const CardsGroup: React.FC<CardsGroup> = ({}) => {
  // const items = Array(13).fill({
  //   name: "Dark Elixer",
  //   price: 100,
  //   img_url: "https://wallpapercave.com/wp/wp2424020.jpg",
  //   creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
  //   owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
  // });

  const items = [
    // {
    //   name: "Dark Elixer",
    //   price: 100,
    //   img_url: "https://wallpapercave.com/wp/wp2424020.jpg",
    //   creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
    //   owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
    // },
    {
      name: "Pikachu",
      price: 250,
      img_url: "images/pikachu.png",
      creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
      owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
    },
    {
      name: "Charmander",
      price: 200,
      img_url: "images/charmander.png",
      creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
      owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
    },
    {
      name: "Bulbasaur",
      price: 180,
      img_url: "images/bulbasaur.png",
      creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
      owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
    },
    {
      name: "Butterfree",
      price: 80,
      img_url: "images/butterfree.png",
      creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
      owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
    },

    {
      name: "Pidgeotto",
      price: 150,
      img_url: "images/pidgeotto.png",
      creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
      owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
    },

    {
      name: "Squirtle",
      price: 120,
      img_url: "images/squirtle.png",
      creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
      owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
    },
  ];

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
