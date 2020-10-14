import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import downloadAlt from '@iconify/icons-el/download-alt';
import AdminLayout from '../../components/layouts/admin';
import { CardHeader, Card, CardBody, Row, Col, Table} from "reactstrap";
import AditionalinterestReport from './aditionalinterestReport';
import ShoppingpreferencesReport from './shoppingpreferencesReport';
import DemographicsReport from './demographicsReports';
import Segment from './segment';
import axios from 'axios';
import {recentMonth, jsonData, getReport} from '../../helper/getReport';
import MostPopular from "./MostPopular";
import ReactExport from "react-export-excel";
import { getMostPopular } from "../../helper/getMostPopular";
import 'antd/dist/antd.css';
import { Select } from 'antd';
import store from 'store-js';
import NoDataAvailable from "../../components/NoDataAvailable";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function extractColumn(arr, column) {
  return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const Index = () =>{
  const [results, setResults] = useState();
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState();
  const [id, setId] = useState(store.get('id_shop') ? store.get('id_shop') : 0);
  const { Option, OptGroup } = Select;

    useEffect(()=>{
      getData();
    },[]);
  const getData = async () =>{
    let data;
    let datamonths;
    let response;
    let months;
    if(id > 0){
      data = await axios(`https://manage.pro-market.net/dpui?service=report&reportName=DataProviderSegmentUUsReport&dpid=${ id }`);
      datamonths = await axios.post(`https://mighty-badlands-15868.herokuapp.com/api/shop/findData`,{data:{id_shop:id}});
      if(datamonths.data.length > 0)
        response = await jsonData(data.data, id, datamonths.data);
      else
        response = await jsonData(data.data, id);
        console.log(response);
      if(response.length > 0){
        setResults(response);
        months = await recentMonth(response);
        setMonths(months);
        setMonth(months[0].month);
      }
    }
  }
  const downloadXlsx =  () =>{
    let report;
    let dataReport = [];
    if(month && results){
      report = getMostPopular(results, month);
      report.sort((a,b)=>{  if (a.report > b.report) {
        return 1;
      }
      if (a.report < b.report) {
        return -1;
      }
      return 0;});
      dataReport = getReport(results, month);
      dataReport.push(...report);
    }

    return dataReport.length > 0 ? (
      <ExcelFile filename="Datonics report" element={<h5 className="text-right" style={{cursor:'pointer'}}><Icon icon={downloadAlt}/> Export</h5>}>
                <ExcelSheet data={dataReport} name="datonics">
                    <ExcelColumn label="Month" value="month"/>
                    <ExcelColumn label="Report" value="report"/>
                    <ExcelColumn label="Segment" value="name"/>
                    <ExcelColumn label="Cookies" value="unique_cookies"/>
                </ExcelSheet>
      </ExcelFile>
    ):(null)
  }

  const demographicsReports = () =>{
   
    if(results && month)
      return <DemographicsReport data={results} month={month}/>
    return null;
  }
  
  const Aditionalinterest = () =>{
    if(results && month)
      return <AditionalinterestReport data={results} month={month}/>
    return null;
  }

  const ShopinPreferences = () =>{
    if(results && month)
      return <ShoppingpreferencesReport data={results} month={month}/>
    return null;
  }

  const mostPopular = () =>{
    if(results && month){
      return <MostPopular data={results} month={month}/>
      
    }
      
    return;
  }

  function cambioFiltro(value) {
    setMonth(value);
  }
  
  return (
      <div>
          <AdminLayout contentTitle={'Reports'}>
                {
                  months && month ? (
                    <Card>
                    <CardBody style={{paddingBottom: "0"}}>
                    <Row>
                    <Col lg={10}>
                    <Select defaultValue={month} style={{ width: 200, marginBottom:'1rem' }} onChange={cambioFiltro}>
                      <OptGroup label="Filter">
                        {
                          months.map(month => {
                            return <Option value={month.month}>{month.name}</Option>
                          })
                        }
                      </OptGroup>
                    </Select>
                    </Col>
                    <Col lg={2}>
                      {downloadXlsx()}
                    </Col>
                  </Row>
                  </CardBody>
                  </Card>
                  ) : 
                  (null)
                }

            <Card>
              { results && months.length > 0 ?(
                <div>
                <CardHeader>
                  <Segment titleLeft="Segment" titleRight="Volume"/>
                </CardHeader>
                <CardBody className="pt-0">
                  {demographicsReports()}
                  {Aditionalinterest()}
                  {ShopinPreferences()}
                  {mostPopular()}
                </CardBody>
              </div>
              ):(
                <CardBody>
                  <NoDataAvailable message="Not Data Available To Generate Report."/>
                </CardBody>
              ) 
                
              }
            </Card>
          </AdminLayout>
      </div>   
  );
}
export default Index;