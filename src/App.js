import React, { useRef, useEffect } from 'react';
import './App.css';
import * as d3 from 'd3';

const UnitedStatesMap = () => {
  const ref = useRef();

  useEffect(() => {
    const width = 1280;
    const height = 800;

    const svg = d3.select(ref.current);

    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale([1500]);

    const path = d3.geoPath().projection(projection);

    d3.json('./us-state-boundaries.json').then(function(json) {
      svg
        .selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', '#888888')
        .style('stroke-width', '2')
        .style('fill', 'rgb(207,203,167)');
    });
  });

  return <svg ref={ref} className="content" width="1280" height="800" />;
};

const App = () => {
  return (
    <div className="map-wrapper">
      <UnitedStatesMap />
    </div>
  );
};

export default App;
