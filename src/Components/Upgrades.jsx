import "./Upgrades.css";
export default function Upgrades(props) {
  return (
    <>
      <div className="amount">{props.amount}</div>
      <div className="upgrade-name">{props.name}</div>
      <div className="upgrade-cost">
        {props.cost}
        <i className="fa-solid fa-cookie-bite"></i>
      </div>
      <div className="upgrade-increase">
        {props.increase}
        <i className="fa-solid fa-plus"></i>
      </div>

      <button
        onClick={props.buyButton}
        disabled={props.disabled}
        className="buy-button"
      >
        BUY <i className="fa-solid fa-cookie"></i>
      </button>
    </>
  );
}
