import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Tile } from './Tile';

export const Game = (props) => {
  const [data, setData] = useState(
    props.data
  );
  const [firstTile, setFirstTile] = useState();
  const [secondTile, setSecondTile] = useState();
  const [country, setCountry] = useState();

  const PARSED_DATA = useMemo(() => {
    return Object.entries(data)
      .map(([country, capital]) => [
        { value: country, isCountry: true, sortValue: Math.random() },
        {
          value: capital,
          isCountry: false,
          sortValue: Math.random(),
        },
      ])
      .flat()
      .sort((a, b) => a.sortValue - b.sortValue);
  }, [data]);

  const isWin = useMemo(() => {
    // console.log(firstTile, secondTile);
    if (!firstTile || !secondTile) return;

    if (firstTile.isCountry === secondTile.isCountry) {
      return false;
    }

    const country = firstTile.isCountry
      ? firstTile.value
      : secondTile.value;
    const capital = firstTile.isCountry
      ? secondTile.value
      : firstTile.value;
    setCountry(country);
    const isWin = capital === props.data[country];
    // console.log(country, 'country tile');
    // console.log(capital, 'capital tile');
    // console.log(countryCapital, "country tile's actual capital");
    // console.log(isWin, 'is country tile capital === capital tile');

    return isWin;
  }, [firstTile, secondTile, props.data]);

  const resetGame = () => {
    setFirstTile(undefined);
    setSecondTile(undefined);
    setCountry(undefined);
  };

  useEffect(() => {
    let timerId;
    if (typeof isWin !== 'boolean') return;

    if (isWin && country) {
      const newData = { ...data };

      timerId = setTimeout(() => {
        delete newData[country];
        setData(newData);
        resetGame();
      }, 1000);
    } else {
      timerId = setTimeout(() => resetGame(), 1000);
    }

    return () => clearTimeout(timerId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWin, country]);

  const handleTileClick = (value) => {
    // console.log(value, 'value');
    if (!firstTile) {
      return setFirstTile(value);
    }
    if (!secondTile) {
      return setSecondTile(value);
    }
  };

  return (
    <main>
      {PARSED_DATA.map((item) => (
        <Tile
          isFirstTile={item.value === firstTile?.value}
          isSecondTile={item.value === secondTile?.value}
          title={item.value}
          isWin={isWin}
          onClick={() =>
            handleTileClick({
              value: item.value,
              isCountry: item.isCountry,
            })
          }
        />
      ))}
      {!PARSED_DATA.length && (
        <h1 style={{ color: 'green' }}>Congratulations! You Won!</h1>
      )}
    </main>
  );
};
