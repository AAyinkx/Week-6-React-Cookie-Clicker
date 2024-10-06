import "./App.css";
import { useEffect, useState } from "react";
import Upgrades from "./Components/Upgrades";
import Stylesheets from "./Components/Stylesheets";
import Header from "./Components/Header";
import SecondaryContainer from "./Components/SecondaryContainer";

export default function () {
  const [cookieCount, setCookieCount] = useState(0);
  const [cookiesPerSecond, setCookiePerSecond] = useState(1);
  const [upgradesData, setUpgradesData] = useState([]);

  function handleUpgradePurchase(upgradeId, cost, increase) {
    if (cookieCount >= cost) {
      // Subtract the cost from total cookies
      setCookieCount((prevCount) => prevCount - cost);

      // Increase CPS by the 'increase' value of the upgrade
      setCookiePerSecond((prevCPS) => prevCPS + increase);
      setUpgradesData((prevItems) =>
        prevItems.map(
          (item) =>
            item.id === upgradeId ? { ...item, count: (item.count += 1) } : item
          //Three dots creates a new object by copying all the properties. Spread operator
          //!Tried fixing a problem but it didn't work. Returns NaN
        )
      );
    }
  }

  function handleCookieCount() {
    setCookieCount(cookieCount + 1);
  }

  function handleReset() {
    setCookieCount(0);
    setCookiePerSecond(1);
  }

  useEffect(() => {
    const cookiesPerSecondInterval = setInterval(() => {
      console.log("Button has been pressed");
      setCookieCount((currentCookies) => currentCookies + cookiesPerSecond);
    }, 1000);

    return () => {
      clearInterval(cookiesPerSecondInterval);
    };
  }, [cookiesPerSecond]);

  useEffect(() => {
    async function getUpgrades() {
      const response = await fetch(
        "https://cookie-upgrade-api.vercel.app/api/upgrades"
      );
      const upgrades = await response.json();
      setUpgradesData(upgrades);
    }
    getUpgrades();
  }, []);

  return (
    <>
      <Stylesheets />
      <div id="main-container">
        <Header />
        <SecondaryContainer
          cookieCount={cookieCount}
          cookiesPerSecond={cookiesPerSecond + " Cookie(s)/sec"}
          clickCookie={handleCookieCount}
          resetButton={handleReset}
        />
      </div>

      <div id="upgrades-container">
        {upgradesData.map((upgrade) => (
          <div key={upgrade.id} className="upgrade-item">
            <Upgrades
              amount={0}
              buyButton={() => {
                handleUpgradePurchase(
                  upgrade.id,
                  upgrade.cost,
                  upgrade.increase
                );
              }}
              name={upgrade.name}
              cost={upgrade.cost}
              increase={upgrade.increase}
              disabled={cookieCount < upgrade.cost}
            />
          </div>
        ))}
      </div>
    </>
  );
}
