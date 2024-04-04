export const Tile = ({
  title,
  isFirstTile,
  isSecondTile,
  isWin,
  onClick,
}) => {
  const firstTileClass = isFirstTile ? 'first-tile' : '';

  const isPlayComplete =
    (isFirstTile || isSecondTile) && typeof isWin === 'boolean';

  const winClass = isPlayComplete && isWin ? 'win' : '';
  const loseClass = isPlayComplete && !isWin ? 'lose' : '';

  return (
    <div
      className={`game-tile ${firstTileClass} ${winClass} ${loseClass}`}
      role="button"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
