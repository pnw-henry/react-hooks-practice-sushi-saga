import React, { useState, useEffect } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [sushi, setSushi] = useState([]);
  const [money, setMoney] = useState(50);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((sushi) => {
        const updatedSushis = sushi.map((sushi) => {
          return { ...sushi, eaten: false };
        });
        setSushi(updatedSushis);
      });
  }, []);

  function handleEatSushi(eatenSushi) {
    if (money >= eatenSushi.price) {
      const updatedSushis = sushi.map((sushi) => {
        if (sushi.id === eatenSushi.id) {
          return { ...sushi, eaten: true };
        }
        return sushi;
      });
      setSushi(updatedSushis);
      setMoney((money) => money - eatenSushi.price);
    } else {
      alert("Need more money!");
    }
  }

  const eatenSushi = sushi.filter((sushi) => sushi.eaten);

  return (
    <div className="app">
      <SushiContainer sushis={sushi} onEatSushi={handleEatSushi} />
      <Table plates={eatenSushi} money={money} />
    </div>
  );
}

export default App;
