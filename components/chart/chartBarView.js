import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
function extractColumnInt(arr, column) {
    return arr.map(x => parseInt(x[column]))
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const ChartBarView = ({results}) =>{
  let options;
  let series;
  if(results && results.length > 0){
    results.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
    let categories = extractColumn(results, 'segment_name');    
    let dataChart = extractColumnInt(results, 'unique_cookies');
    series = [{
        name: "Volume",
        data: dataChart,
      }];
    options = {
        chart: {
          toolbar:{
            show:false
          },
          type: 'bar',
        },
        fill: {
          opacity: 1,
          type: 'solid',
        },
        colors: ['#FF455F','#008FFB','#00E396','#FEB019','#FE455F','#FF8B0A','#6C757D',],
        plotOptions: {
          bar: {
            barHeight: '50%',
            distributed: true,
            horizontal: true,
          }
        },
        fill: {
          opacity: 1,
          type: 'solid',
        },
        xaxis: {
          categories: categories,
        },
        legend:{
            show: false,
        },
        responsive: [{
          breakpoint: 600,
          options: {
            yaxis:{
              show:false
            },
            xaxis:{
              labels:{
                show:false
              }
            },
            dataLabels: {
              enabled: true,
              textAnchor: 'start',
              style: {
                colors: ['#fff']
              },
              formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
              },
              offsetX: 0,
              dropShadow: {
                enabled: true
              }
            },
          },
        }]
        
      }
  }
    
    return (
    <div>
      {
        results ? (
        <ReactApexChart options={options} series={series} type="bar" height={'auto'} />
        ):(null)
      }
    </div>
    );
}
//
export default ChartBarView