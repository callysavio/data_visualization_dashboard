import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const CountryChart = () => {
  const chartRef = useRef();
 const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    // Clear any existing chart content
    d3.select(chartRef.current).selectAll('*').remove();

    // Check if data is available
    if (records.length === 0) {
      return;
    }

    // Filter data for the United States of America
    const usaData = records.filter(item => item.country === 'United States of America' && item.sector === 'Energy');

    // Extract and format data for pie chart
    const topicsData = usaData.map(item => ({
      topic: item.topic,
      intensity: item.intensity,
    }));

    // Set up dimensions
    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create pie chart
    const pie = d3.pie().value(d => d.intensity);
    const dataPie = pie(topicsData);

    // Set up color scale
    const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

    // Create pie chart slices
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

    svg
      .selectAll('path')
      .data(dataPie)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colorScale(i))
      .attr('stroke', '#fff')
      .style('stroke-width', '2px')
      .style('cursor', 'pointer') // Add pointer cursor
      .on('mouseover', (event, d) => {
        // Highlight slice and increase size on hover
        d3.select(event.target).attr('fill', '#ffcc00').transition().duration(200).attr('transform', 'scale(1.1)');

        // Calculate percentage
        const percentage = ((d.data.intensity / d3.sum(topicsData, d => d.intensity)) * 100).toFixed(2);

        // Show tooltip with topic and percentage
        svg
          .append('text')
          .attr('id', 'tooltip')
          .attr('text-anchor', 'middle')
          .style('font-size', '14px')
          .text(`${d.data.topic}: ${percentage}%`)
          .attr('transform', `translate(${arc.centroid(d)})`);
      })
      .on('mouseout', (event, d) => {
        // Restore color and size, and remove tooltip on mouseout
        d3.select(event.target).attr('fill', colorScale(d.index)).transition().duration(200).attr('transform', 'scale(1)');
        svg.select('#tooltip').remove();
      });

    // Add title
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-1em')
      .style('font-size', '14px');

    // Add legend
    const legend = svg
      .selectAll('.legend')
      .data(dataPie)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(-60,${i * 20})`);

    legend
      .append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d, i) => colorScale(i));

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(d => d.data.topic);
  }, [records]);

  return <div id="pie-chart" className="di" ref={chartRef}></div>;
};

export default CountryChart;
