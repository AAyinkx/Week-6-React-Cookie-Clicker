import "./SecondaryContainer.css";
import heartCookie from "../../public/heartCookie.png";
export default function SecondaryContainer(props) {
  return (
    <div id="secondary-container">
      <div id="number-of-cookies">{props.cookieCount}</div>
      <div id="cookies-per-second">{props.cookiesPerSecond}</div>
      <div id="cookie-container">
        <img
          onClick={props.clickCookie}
          id="cookie"
          alt="Cookie to click"
          src={heartCookie}
        />
      </div>
      <button id="reset" onClick={props.resetButton}>
        RESET <i className="fa-solid fa-rotate-right"></i>
      </button>
    </div>
  );
}
