// MultiXAxesChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const MultiXAxesChart = () => {
  const chartRef = useRef();
  const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    if (!records || records.length === 0) return;

    const targetTitle = 'U.S. production could begin to ramp back up following the rig count upturn.';
    const chartData = records.find((item) => item.title === targetTitle);

    if (!chartData) return;

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Create SVG container
    const svg = d3.select(chartRef.current).append('svg').attr('width', 600).attr('height', 400);

    // Create scales
    const xScale = d3.scaleBand().domain(['Intensity', 'Impact', 'Likelihood']).range([50, 550]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, 10]).range([300, 50]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to SVG
    svg.append('g').attr('transform', 'translate(0, 300)').call(xAxis).append('text').text('Factors').attr('x', 300).attr('y', 40).attr('text-anchor', 'middle').attr('font-family', 'sans-serif').attr('font-size', '14px').attr('fill', 'black');

    svg
      .append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis)
      .append('text')
      .text('Values')
      .attr('transform', 'rotate(-90)')
      .attr('x', -150)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', 'black');

    // Create bars
    svg
      .selectAll('rect')
      .data(['intensity', 'impact', 'likelihood'])
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d))
      .attr('y', (d) => yScale(chartData[d]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => 300 - yScale(chartData[d]))
      .attr('fill', (d) => {
        switch (d) {
          case 'intensity':
            return 'steelblue';
          case 'impact':
            return 'orange';
          case 'likelihood':
            return 'green';
          default:
            return 'gray';
        }
      });

    // Add labels
    svg
      .selectAll('text')
      .data(['intensity', 'impact', 'likelihood'])
      .enter()
      .append('text')
      .text((d) => `${d}: ${chartData[d]}`)
      .attr('x', (d) => xScale(d) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(chartData[d]) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px')
      .attr('fill', 'black');

    // Add legend
    const legend = svg.append('g').attr('transform', 'translate(550, 10)');
    const legendKeys = ['Intensity', 'Impact', 'Likelihood'];

    legend
      .selectAll('rect')
      .data(legendKeys)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d) => {
        switch (d) {
          case 'Intensity':
            return 'steelblue';
          case 'Impact':
            return 'orange';
          case 'Likelihood':
            return 'green';
          default:
            return 'gray';
        }
      });

    legend
      .selectAll('text')
      .data(legendKeys)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', 20)
      .attr('y', (d, i) => i * 20 + 12)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px')
      .attr('fill', 'black');

    // Add chart title
    svg
      .append('text')
      .text('Relationship between Intensity, Impact, and Likelihood')
      .attr('x', 300)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', 'black');
  }, [records]);

  return <div ref={chartRef}></div>;
};

export default MultiXAxesChart;
