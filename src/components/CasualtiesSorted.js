import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const CasualtiesSorted = () => {
  const [states, setStates] = useState([]);
  useEffect(() => {
    const newdata = [];
    async function getData() {
      await d3.csv('./us_state_data_parsed.csv').then(stateData => {
        stateData.forEach(data => newdata.push(data));
        console.log(stateData);
        // setStates(stateData);
      });
    }
    getData();
  });

  return (
    <div>
      {states.forEach(state => {
        return <div>moi</div>;
      })}
    </div>
  );
};

export default CasualtiesSorted;
