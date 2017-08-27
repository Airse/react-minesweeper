const getAdjacentCellsFromOffsets = (offsets, row, col, numRows, numCols) => {
  return offsets.map((offset) => {
    return { row: offset.row + row, col: offset.col + col };
  }).filter((cell) => {
    return (cell.row >= 0 && cell.row < numRows &&
      cell.col >= 0 && cell.col < numCols);
  });
};

export const getAdjacentCells = (row, col, numRows, numCols) => {
  const adjacentOffsets = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
  ];
  
  return getAdjacentCellsFromOffsets(adjacentOffsets, row, col, numRows, numCols);
};

