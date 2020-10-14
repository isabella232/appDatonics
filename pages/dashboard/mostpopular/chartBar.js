import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Icon, InlineIcon } from '@iconify/react';
import informationOutline from '@iconify/icons-mdi/information-outline';
import userGroup from '@iconify/icons-heroicons-outline/user-group';
import { Row, Col, Card, CardBody } from 'reactstrap';
import 'antd/dist/antd.css';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd';

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

const ChartBar = ({results,type}) =>{
  const [visible, setVisible] = useState(false);
  const visibleModal = () =>{
    setVisible(true);
}
const ModalOk = (e) =>{
    setVisible(false);
}
  let dataArr = [];
  let options;
  let series;
  if(results && results.length > 0){
    dataArr = [...results];
    results.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
    let categories = extractColumn(results, 'name');    
    let dataChart = extractColumnInt(results, 'unique_cookies');
    dataArr = dataArr.length > 10 ? dataArr.splice(dataArr.length - 10) : dataArr;
    series = [{
        name: "Volume",
        data: dataChart.length > 10 ? dataChart.splice(dataChart.length - 10) : dataChart,
      }];
    options = {
        chart: {
          toolbar:{
            show:false
          },
          type: 'bar',
          height: 350
        },
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
        colors: ['#FF455F','#008FFB','#00E396','#FEB019','#FE455F','#FF8B0A','#6C757D',],
        xaxis: {
          categories: categories.length > 10 ? categories.splice(categories.length-10) : categories,
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
    <div className="card" style={{height: '360px'}}>
        <div className="card-body">
        <Row>
                    <Col lg={10}><h4 className="header-title mb-2">{type}</h4></Col>
                    <Col lg={1} className="text-right"><InlineIcon icon={informationOutline} onClick={visibleModal} style={{fontSize: '28px',
verticalAlign: '-moz-middle-with-baseline',color: '#ccc', cursor:'pointer'}}/></Col>
                    <Col lg={1}><Icon icon={userGroup} style={{fontSize: '28px', verticalAlign: '-moz-middle-with-baseline',color: '#ccc'}}/></Col>
                </Row>
            {
              results ? (
                <ReactApexChart options={options} series={series} type="bar" height={260} />
              ):(null)
            }
        </div>
        <Modal
            title="Segment Description"
            centered
            visible={visible}
            onOk={ModalOk}
            onCancel={ModalOk}
            width = '550px'
            zIndex='9999'
            footer={[<Button type="primary" onClick={ModalOk}>
            Continue
          </Button>
        ]}
            >
                {
                    dataArr && dataArr.length > 0 ? (
                      dataArr.map((segment) => {
                        return<p><strong>{segment.name}</strong>: {segment.description}</p>;
                        })
                    ):(null)
                }
            </Modal>
    </div>
    );
}
//
export default ChartBar;