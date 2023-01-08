import classes from "./card.module.scss";

function Card(props) {
  function handleChoice() {
    if (!props.disabled) props.handleChoice(props.card);
  }

  return (
    <div className={classes.card}>
      <div className={props.flipped ? classes.flipped : ""}>
        <img
          className={`${classes.front} ${
            props.card.matched ? classes.matched : ""
          }`}
          src={props.card.src}
          alt="card front"
        />

        <img
          className={classes.back}
          src="/images/card_back.png"
          alt="card back"
          onClick={() => handleChoice()}
        />
      </div>
    </div>
  );
}

export default Card;
