import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const IntensityDistributionChart = () => {
  const chartRef = useRef();
  const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    // Clear any existing chart content
    d3.select(chartRef.current).selectAll('*').remove();

    // Check if data is available
    if (records.length === 0) {
      console.error('No data available for IntensityDistributionChart');
      return;
    }

    // Extract relevant data
    const sectors = [...new Set(records.map(item => item.sector))];
    const intensityData = records.map(item => ({ sector: item.sector, intensity: item.intensity }));

    // Set up dimensions
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(intensityData, d => d.intensity)])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(sectors)
      .range([0, height])
      .padding(0.1);

    // Set up color scale
    const colorScale = d3.scaleOrdinal()
      .domain(sectors)
      .range(d3.schemeCategory10);

    // Draw bars
    svg.selectAll('.bar')
      .data(intensityData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => yScale(d.sector))
      .attr('width', d => xScale(d.intensity))
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.sector));

    // Add x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold');
      // .text('Intensity Distribution by Sector');

  }, [records]);

  return <div  className="di" ref={chartRef}></div>;
};

export default IntensityDistributionChart;
