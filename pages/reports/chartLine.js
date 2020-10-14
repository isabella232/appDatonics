import { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import dynamic from 'next/dynamic';
import axios from "axios";
import { getSeriesChart } from "../../helper/getReport";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});

const ChartLine = ({data, filter, source}) =>{  
     
    const [results, setResults] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    let chart = [];
    let series = [];
    let options = [];
    if(filter == 3 || filter == 2 || filter == 1)
    chart = getSeriesChart(source, data.segment_id, filter);
  
    if(chart.length > 0){
      series = [{
        name: "",
        data: chart[0]
    }];
    options = {
      chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: chart[1],
        }
      };
    }

    return(
        <div className="pl-3 pt-3 pb-3 card-body-toggle collapse show" style={{paddingBottom: "7px !important", paddingTop: "7px !important"}}>
            {
              data ? (
                <div>
                  <div className="row">
                <div className="col-sm-10" onClick={toggle} >{data.name}</div>
                <div className="col-sm-2">{data.unique_cockie != undefined ? data.unique_cockie: data.unique_cookies}</div>
            </div>
            {
              filter == 3 || filter == 2 || filter == 1 ?(<Collapse isOpen={isOpen}>
                <ReactApexChart options={options} series={series} type="line" height={350}/>
                </Collapse>):(null)
            }
            </div>
              ):(null)
            }
        </div>
    );
}
export default ChartLine;