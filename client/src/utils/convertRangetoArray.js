const convertRangeToArray = (rangeString) => {
  const sizeArray = [];

  if (rangeString === "M-XXL") {
    const [start, end] = rangeString.split("-");
    const sizeOrder = ["M", "L", "XL", "XXL"];
    let startIdx = sizeOrder.indexOf(start);
    let endIdx = sizeOrder.indexOf(end);
    if (startIdx > endIdx) {
      [startIdx, endIdx] = [endIdx, startIdx];
    }

    for (let i = startIdx; i <= endIdx; i++) {
      sizeArray.push(sizeOrder[i]);
    }
  } else {
    const [start, end] = rangeString.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      sizeArray.push(i);
    }
  }
  return sizeArray;
};

export default convertRangeToArray;
