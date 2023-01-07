import classes from "./buttons.module.scss";

interface RoundedButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <span className={className}>
      <button className={classes.roundedButton} onClick={onClick}>
        {text}
      </button>
    </span>
  );
};

export default RoundedButton;
