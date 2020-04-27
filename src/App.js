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

    const stateColor = color => {
      if (!color) {
        return 'rgb(255,255,255)';
      } else if (color === 0) {
        return 'rgb(255,255,255)';
      } else if (color > 0 && color <= 10) {
        return 'rgb(255,225,225)';
      } else if (color > 10 && color <= 100) {
        return 'rgb(255,204,204)';
      } else if (color > 100 && color <= 500) {
        return 'rgb(255,153,153)';
      } else if (color > 500 && color <= 1000) {
        return 'rgb(255,102,102)';
      } else if (color > 1000 && color <= 3000) {
        return 'rgb(255,51,51)';
      } else if (color > 3000 && color < 5000) {
        return 'rgb(255,0,0)';
      } else {
        return 'rgb(204,0,0)';
      }
    };

    d3.csv('./us_state_data_parsed.csv').then(function(state_data) {
      d3.json('./us_state_boundaries.json').then(function(json) {
        for (let i = 0; i < state_data.length; i++) {
          const stateNameInCsv = state_data[i].state;
          const numberOfDeaths = state_data[i].deaths;

          for (let j = 0; j < json.features.length; j++) {
            var stateNameInJson = json.features[j].properties.name;

            if (stateNameInCsv === stateNameInJson) {
              json.features[j].properties.deaths = numberOfDeaths;
              break;
            }
          }
        }
        svg
          .selectAll('path')
          .data(json.features)
          .enter()
          .append('path')
          .attr('d', path)
          .style('stroke', '#770000')
          .style('stroke-width', '2')
          .style('fill', function(d) {
            return stateColor(d.properties.deaths);
          });
      });
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
