import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const UnitedStatesMap = () => {
  const ref = useRef();

  useEffect(() => {
    const width = 1050;
    const height = 600;

    const svg = d3.select(ref.current);

    const div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const overlay = d3
      .select('body')
      .append('div')
      .attr('class', 'overlay')
      .style('opacity', 0);

    const color = d3
      .scaleLinear()
      .range([
        'rgb(255,225,225)',
        'rgb(255,204,204)',
        'rgb(255,153,153)',
        'rgb(255,102,102)',
        'rgb(255,51,51)',
        'rgb(255,0,0)',
        'rgb(204,0,0)',
        'rgb(120,0,0)'
      ])
      .domain([0, 1, 2, 3, 4, 5, 6, 7]);

    const legendTitles = [
      '0 - 10',
      '11 - 100',
      '101 - 500',
      '501 - 1000',
      '1001 - 2000',
      '2001 - 5000',
      '5001 - 10000',
      '10000 -'
    ];

    const legend = d3
      .select('body')
      .append('svg')
      .attr('class', 'legend')
      .attr('width', 140)
      .attr('height', 200)
      .selectAll('g')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return 'translate(0,' + i * 20 + ')';
      });

    legend
      .append('circle')
      .attr('r', '0.55em')
      .attr('cy', 11)
      .attr('cx', 11)
      .style('fill', color);

    legend
      .append('text')
      .data(legendTitles)
      .attr('x', 28)
      .attr('y', 11)
      .attr('dy', '.35em')
      .text(d => {
        return d;
      });

    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale([1300]);

    const path = d3.geoPath().projection(projection);

    const stateColor = color => {
      if (!color || color === 0) {
        return 'rgb(255,255,255)';
      } else if (color > 0 && color <= 10) {
        return 'rgb(255,225,225)';
      } else if (color > 10 && color <= 100) {
        return 'rgb(255,204,204)';
      } else if (color > 100 && color <= 500) {
        return 'rgb(255,153,153)';
      } else if (color > 500 && color <= 1000) {
        return 'rgb(255,102,102)';
      } else if (color > 1000 && color <= 2000) {
        return 'rgb(255,51,51)';
      } else if (color > 2000 && color <= 5000) {
        return 'rgb(255,0,0)';
      } else if (color > 5000 && color <= 10000) {
        return 'rgb(204,0,0)';
      } else {
        return 'rgb(120,0,0)';
      }
    };

    const totalDeathsFrom = state => {
      let sum = 0;
      Object.keys(state).forEach(key => {
        if (key !== 'state' && state[key]) sum = Number(state[key]);
      });
      return sum;
    };

    const formatStateData = dateData => {
      let returnString = '';
      Object.keys(dateData).forEach(key => {
        if (!key) return;
        const formattedDate = formatDate(key);
        returnString += formattedDate + ': ' + dateData[key] + ' || ';
      });
      return returnString;
    };

    const formatDate = date => {
      const split = date.split('-');
      return split[1] + '.' + split[0] + '.' + split[2];
    };

    d3.csv('./us_state_data_parsed.csv').then(stateData => {
      d3.json('./us_state_boundaries.json').then(jsonData => {
        stateData.forEach((state, i) => {
          const stateNameInCsv = stateData[i].state;
          const numberOfDeaths = totalDeathsFrom(state);

          jsonData.features.forEach((feature, j) => {
            var stateNameInJson = jsonData.features[j].properties.name;
            const dataWithoutState = state;
            delete dataWithoutState.state;
            if (stateNameInCsv === stateNameInJson) {
              jsonData.features[j].properties.deaths = numberOfDeaths;
              jsonData.features[j].properties.casualties = dataWithoutState;
              return;
            }
          });
        });

        svg
          .selectAll('path')
          .data(jsonData.features)
          .enter()
          .append('path')
          .attr('d', path)
          .style('stroke', '#770000')
          .style('stroke-width', '2')
          .style('fill', d => {
            return stateColor(d.properties.deaths);
          })
          .on('mouseover', d => {
            div
              .transition()
              .duration(200)
              .style('opacity', 0.95);
            div
              .text(d.properties.name + ': ' + d.properties.deaths)
              .style('left', d3.event.pageX + 'px')
              .style('top', d3.event.pageY - 28 + 'px');
          })
          .on('mouseout', d => {
            div
              .transition()
              .duration(200)
              .style('opacity', 0);
          })
          .on('click', d => {
            overlay
              .transition()
              .duration(200)
              .style('opacity', 1);
            overlay.text(
              d.properties.name +
                ': ' +
                formatStateData(d.properties.casualties)
            );
          });
      });
    });
  });

  return <svg ref={ref} className="content" height="650" />;
};

export default UnitedStatesMap;
