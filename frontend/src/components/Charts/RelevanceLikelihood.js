import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';


const RelevanceLikelihood = () => {
  const chartRef = useRef();
  const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    // Clear any existing chart content
    d3.select(chartRef.current).selectAll('*').remove();

    // Check if data is available
    if (records.length === 0) {
      console.error('No data available for RelevanceLikelihood');
      return;
    }

    // Filter data for the specific title
    const petroleumData = records.find(
      (item) =>
        item.title ===
        'Polymerization will remain top 3 end-users in global n-Hexane Market.'
    );

    // Check if data is available and in the expected format
    if (!petroleumData) {
      console.error('No data found for the specified title');
      return;
    }

    // Extract relevant data
    const relevance = petroleumData.relevance || 0;
    const likelihood = petroleumData.likelihood || 0;

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

    // Set up color scale
    const color = d3.scaleOrdinal().range(['#69b3a2', '#404080']);

    // Create data for circular bar plot
    const barData = [
      { label: 'Relevance', value: relevance, color: color(0) },
      { label: 'Likelihood', value: likelihood, color: color(3) },
    ];

    // Set up scales
    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      .align(0)
      .domain(barData.map((d) => d.label));

    const y = d3.scaleLinear().range([0, radius]).domain([0, d3.max(barData, (d) => d.value)]);

    // Draw circular bars
    svg
      .selectAll('path')
      .data(barData)
      .enter()
      .append('path')
      .attr('fill', (d) => d.color)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius((d) => y(d.value))
        .startAngle((d) => x(d.label))
        .endAngle((d) => x(d.label) + x.bandwidth())
        .padAngle(0.1)
        .padRadius(radius))
      .on('mouseover', function () {
        d3.select(this).attr('fill', '#ffb366');
        d3.select(this).attr('cursor', 'pointer');
        // Highlight on hover
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', (d) => d.color); // Reset color on mouseout
      });

    // Add relevance and likelihood labels
    svg
      .selectAll('text')
      .data(barData)
      .enter()
      .append('text')
      .attr('transform', (d) => {
        const angle = (x(d.label) + x.bandwidth() / 2) - Math.PI / 2;
        const labelRadius = y(d.value) - 50; // Adjust the radius as needed
        const xPosition = Math.cos(angle) * labelRadius;
        const yPosition = Math.sin(angle) * labelRadius;
        return `translate(${xPosition},${yPosition})`;
      })
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text((d) => `${d.label}: ${d.value}`);
  }, [records]);

  return <div className="di" ref={chartRef}></div>;
};

export default RelevanceLikelihood;
