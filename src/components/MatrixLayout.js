import React, { useState } from "react";
import MatrixBoard from "./MatrixBoard";
import {
  isMatrixFieldEmpty,
  addMatrix,
  substractMatrix,
  multiplyMatrix,
} from "../helpers";

export default function MatrixLayout({
  leftMatrix,
  rightMatrix,
  updateLeftMatrix,
  updateRightMatrix,
  matrixSize,
}) {
  const [showOperation, setShowOperation] = useState(false);
  const [errorLeft, setErrorLeft] = useState("");
  const [errorRight, setErrorRight] = useState("");
  const [errorGlobal, setGlobalError] = useState("");
  const [result, setResult] = useState(null);

  const handleLeftMatrixChange = (field) => {
    setErrorLeft("");
    updateLeftMatrix((state) => {
      state.rows[field.row].cols[field.col].value = field.value;
    });
  };
  const handleRightMatrixChange = (field) => {
    setErrorRight("");
    updateRightMatrix((state) => {
      state.rows[field.row].cols[field.col].value = field.value;
    });
  };
  // Operate matrix with multiplication
  const handleMultiply = () => {
    const { result, error } = multiplyMatrix(leftMatrix, rightMatrix);
    if (error) {
      setGlobalError(error);
      return;
    }
    setResult(result);
  };

  // TODO: make this work
  const handleAdd = () => {
    const result = addMatrix(leftMatrix, rightMatrix);
    setResult(result);
  };
  // TODO: make this work
  const handleSubstract = () => {
    const result = substractMatrix(leftMatrix, rightMatrix);
    setResult(result);
  };
  // TODO: Handle Input matrix
  const handleInputMatrix = () => {
    const isLeftEmpty = isMatrixFieldEmpty(leftMatrix);
    const isRightEmpty = isMatrixFieldEmpty(rightMatrix);
    if (isLeftEmpty) {
      setErrorLeft("Fields can't be empty!");
    }
    if (isRightEmpty) {
      setErrorRight("Fields can't be empty!");
    }
    if (isLeftEmpty || isRightEmpty) {
      return;
    }
    setShowOperation(true);
  };

  const actions = showOperation ? (
    <div className="d-flex flex-col">
      <button className="button" onClick={handleAdd}>
        Add
      </button>
      <button className="button" onClick={handleSubstract}>
        Substract
      </button>
      <button className="button" onClick={handleMultiply}>
        Multiply
      </button>
    </div>
  ) : (
    <button className="button" onClick={handleInputMatrix}>
      Submit
    </button>
  );

  return (
    <div className="main-container">
      <div className="panel-container">
        {errorGlobal && <div className="error">{errorGlobal}</div>}
        <div className="panel-wrapper">
          <div className="left-panel">
            <MatrixBoard
              matrix={leftMatrix}
              title="Left Matrix"
              onChange={handleLeftMatrixChange}
              error={errorLeft}
            />
          </div>
          {actions}
          <div className="right-panel">
            <MatrixBoard
              matrix={rightMatrix}
              title="Right Matrix"
              onChange={handleRightMatrixChange}
              error={errorRight}
            />
          </div>
        </div>
      </div>
      <div>{result ? <MatrixBoard matrix={result} title="Result" /> : ""}</div>
    </div>
  );
}
