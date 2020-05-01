import React, { useState, useEffect } from "react";
import "./App.css";
import SizeForm from "./components/SizeForm";
import { getFormattedMatrix } from "./helpers/matrixHelper";
import MatrixLayout from "./components/MatrixLayout";
import { useImmer } from "use-immer";

function App() {
  const [matrixSize, setMatrixSize] = useState({});
  const [leftMatrix, updateLeftMatrix] = useImmer({});
  const [rightMatrix, updateRightMatrix] = useImmer({});
  useEffect(() => {
    if (Object.values(matrixSize).length) {
      const formattedMatrix = getFormattedMatrix(
        matrixSize.rows,
        matrixSize.cols
      );
      updateLeftMatrix(() => ({
        ...formattedMatrix,
      }));
      updateRightMatrix(() => ({
        ...formattedMatrix,
      }));
    }
  }, [matrixSize, updateLeftMatrix, updateRightMatrix]);

  return (
    <div className="App">
      <header className="App-header">Matrix Calculations</header>
      <main className="main-container">
        <SizeForm setMatrixSize={setMatrixSize} />
        {Object.values(matrixSize).length ? (
          <MatrixLayout
            {...{
              leftMatrix,
              rightMatrix,
              updateLeftMatrix,
              updateRightMatrix,
              matrixSize,
            }}
          />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
