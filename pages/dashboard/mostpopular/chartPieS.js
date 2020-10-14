import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
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

const ChartPieS = ({results, type}) =>{
  const [visible, setVisible] = useState(false);
  const visibleModal = () =>{
    setVisible(true);
  }
  const ModalOk = (e) =>{
      setVisible(false);
  }
  let dataArr = [];
  let series;
  let options; 
  if(results && results.length > 0){ 
    dataArr = [...results];
    let categories = extractColumn(results, 'name');
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
                    <ReactApexChart options={options} series={series} type="pie" height={300}/>
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

export default ChartPieS;