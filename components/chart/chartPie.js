import dynamic from 'next/dynamic';

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

const ChartPie = ({results}) =>{   
  let series;
  let options; 
  if(results && results.length > 0){ 
    let categories = extractColumn(results, 'segment_name');
    series = extractColumnInt(results, 'unique_cookies');
    options = {
        chart: {
          height: 300,
          type: 'donut',
        },
        fill: {
          opacity: 1,
          type: 'solid',
        },
        colors: ['#FF455F','#008FFB','#00E396','#FEB019','#FE455F','#FF8B0A','#6C757D',],
        labels: categories,
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          verticalAlign: 'middle',
          floating: false,
          fontSize: '14px',
          markers: {
              radius: 0,
          },
          offsetX: 0,
          offsetY: 10,
        },
        plotOptions: {
          pie: {
              customScale: 0.8,
              donut: {
                  size: '50%'
              }
          }
        },
        responsive: [{
          breakpoint: 600,
          options: {
              chart: {
                  height: 240,
              },
            legend: {
              show:false
            },
          },
        }]
      }
  }
      return(
        <div>
          {
            results ? (
            <ReactApexChart options={options} series={series} type="donut" height={300}/>
            ):(null)
          }
        </div>
      );
}

export default ChartPie;