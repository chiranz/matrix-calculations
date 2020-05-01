// DATA STRUCTURES
/* formattedMatrix = {
    rows: [
      {cols:[
        {
          row: i,
          col: j,
          val: val[i][j],
          readOnly: false
        }, .....
      ], index: i}, 
      ......
    ]
}*/

export const getFormattedMatrix = (rows, cols) => {
  let result = {
    rows: [],
    size: { rows, cols },
  };
  for (let i = 0; i < +rows; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < +cols; j++) {
      const col = {
        row: i,
        col: j,
        value: null,
        readOnly: false,
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  return result;
};

export const getFormattedMatrixFromArray = (array, rows, cols) => {
  let result = { rows: [] };
  for (let i = 0; i < rows; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < cols; j++) {
      const col = {
        row: i,
        col: j,
        value: array[i * cols + j],
        readOnly: true,
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  result.size = {
    rows,
    cols,
  };
  return result;
};

// Flat the matrix to upload to the database
export const getFlatMatrix = (matrix) => {
  const flatMatrix = matrix.rows
    .map((row) => row.cols.map((col) => col.value))
    .flat();
  return flatMatrix;
};

export const getReadOnlyMatrix = (matrix) => {
  const flatMatrix = getFlatMatrix(matrix);
  const readOnlyMatrix = getFormattedMatrixFromArray(
    flatMatrix,
    matrix.size.rows,
    matrix.size.cols
  );
  return readOnlyMatrix;
};

// Find if any field is empty in a given matrix
export const isMatrixFieldEmpty = (matrix) => {
  const matrixValues = getFlatMatrix(matrix);
  return matrixValues.some((val) => val === null);
};

// Add two matrix
export const addMatrix = (matrix1, matrix2) => {
  const flat1 = getFlatMatrix(matrix1);
  const flat2 = getFlatMatrix(matrix2);
  let result = [];
  for (let i = 0; i < flat1.length; i++) {
    result.push(flat1[i] + flat2[i]);
  }
  result = getFormattedMatrixFromArray(
    result,
    matrix1.size.rows,
    matrix1.size.cols
  );
  return result;
};

// substract two matrix
export const substractMatrix = (matrix1, matrix2) => {
  const flat1 = getFlatMatrix(matrix1);
  const flat2 = getFlatMatrix(matrix2);
  let result = [];
  for (let i = 0; i < flat1.length; i++) {
    result.push(flat1[i] - flat2[i]);
  }
  result = getFormattedMatrixFromArray(
    result,
    matrix1.size.rows,
    matrix1.size.cols
  );
  return result;
};

// Multiply Matrix
export const multiplyMatrix = (matrix1, matrix2) => {
  // Matrix1 Size
  const rows1 = matrix1.size.rows;
  const cols1 = matrix1.size.cols;
  // Matrix 2 Size
  const rows2 = matrix2.size.rows;
  const cols2 = matrix2.size.cols;
  if (cols1 !== rows2) {
    return { error: "Cannot perform multiplication of the given matrices" };
  }

  const flat1 = getFlatMatrix(matrix1);
  const flat2 = getFlatMatrix(matrix2);
  let results = new Array(rows1 * cols2).fill(0);
  for (let i = 0; i < rows1; i++) {
    for (let j = 0; j < cols2; j++) {
      const index = i * cols2 + j;
      for (let k = 0; k < rows2; k++) {
        const index1 = i * cols2 + k;
        const index2 = k * cols2 + j;
        results[index] += flat1[index1] * flat2[index2];
      }
    }
  }
  results = getFormattedMatrixFromArray(results, rows1, cols2);
  return { results };
};
