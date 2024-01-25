import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { GlobalContext } from '../../context';


const RegionBubbleChart = () => {
  const chartRef = useRef();
 const store = useContext(GlobalContext)
    const { records } = store
    
  useEffect(() => {
    if (!records || records.length === 0) return;

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Extract unique regions and count occurrences
    const regionCounts = {};
    records.forEach((item) => {
      const region = item.region;
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    });

    // Create SVG container
    const svg = d3.select(chartRef.current).append('svg').attr('width', 800).attr('height', 400);

    // Set up bubble chart parameters
    const diameter = 400;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const bubble = d3.pack()
      .size([diameter, diameter])
      .padding(1.5);

    const root = d3.hierarchy({ children: Object.entries(regionCounts).map(([region, count]) => ({ region, count })) })
      .sum((d) => d.count);

    bubble(root);

    const node = svg.selectAll('.node')
      .data(root.children)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

    node.append('circle')
      .attr('r', (d) => d.r)
      .style('fill', (d, i) => color(i));

    node.append('text')
      .attr('dy', '.3em')
      .style('text-anchor', 'middle')
      .text((d) => `${d.data.region} (${d.data.count})`);

    // Title
    svg.append('text')
      .attr('x', 400)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Bubble Chart - Region Distribution');

  }, [records]);

  return <div ref={chartRef}></div>;
};

export default RegionBubbleChart;
