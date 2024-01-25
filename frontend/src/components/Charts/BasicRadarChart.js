// BasicRadarChartD3.js
import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { GlobalContext } from '../../context';

const BasicRadarChartD3 = ({ data }) => {
    const chartRef = useRef();
    const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    if (!records || records.length === 0) return;

    // Limit data to 15 items
    const limitedData = records.slice(0, 15);

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Set up dimensions
    const width = 400;
    const height = 400;

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Extract labels and values from data
    const labels = limitedData.map((item) => item.topic);
    const values = limitedData.map((item) => item.relevance);

    // Set up scales
    const maxValue = d3.max(values);
    const angleSlice = (Math.PI * 2) / limitedData.length;

    const radiusScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, height / 2]);

    // Plot data points
    const radarLine = d3
      .lineRadial()
      .angle((d, i) => i * angleSlice)
      .radius((d) => radiusScale(d))
      .curve(d3.curveLinearClosed);

    svg
      .append('path')
      .datum(values)
      .attr('d', radarLine)
      .attr('fill', 'rgba(75,192,192,0.2)')
      .attr('stroke', 'rgba(75,192,192,1)')
      .attr('stroke-width', 2)
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Plot axis lines
    const axis = svg
      .selectAll('.axis')
      .data(labels)
      .enter()
      .append('g')
      .attr('class', 'axis');

    axis
      .append('line')
      .attr('x1', width / 2)
      .attr('y1', height / 2)
      .attr('x2', (d, i) => width / 2 + radiusScale(maxValue) * Math.cos(i * angleSlice))
      .attr('y2', (d, i) => height / 2 + radiusScale(maxValue) * Math.sin(i * angleSlice))
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    // Plot labels
    axis
      .append('text')
      .attr('class', 'legend')
      .text((d) => d)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => width / 2 + radiusScale(maxValue * 1.1) * Math.cos(i * angleSlice - Math.PI / 2))
      .attr('y', (d, i) => height / 2 + radiusScale(maxValue * 1.1) * Math.sin(i * angleSlice - Math.PI / 2));
  }, [records]);

  return <div ref={chartRef} id="intensity-chart"></div>;
};

export default BasicRadarChartD3;
