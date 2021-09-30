const Button = ({ color, event, styles = [], text }) => {
  return (
    <button
      onClick={event}
      className={`button button--${color} ${styles.join(" ")}`}
    >
      {text}
    </button>
  );
};

export default Button;
