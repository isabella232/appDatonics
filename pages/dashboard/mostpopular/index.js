import AdminLayout from "../../../components/layouts/admin";
import HeaderAnalytics from "../../../components/HeaderAnalytics";
import React, { useEffect, useState } from 'react';
import {Row, Col} from 'reactstrap';
import dynamic from 'next/dynamic';
import ProgressPopular from './progresspopular';
import ChartBar from './chartBar';
import { getMostPopular } from "../../../helper/getMostPopular";
import axios from "axios";
import { jsonData, recentMonth } from "../../../helper/getReport";
import ChartPie from "./chartPie";
import ChartCard from "./chartCard";
import store from 'store-js';
import NoDataAvailable from "../../../components/NoDataAvailable";
import ChartPieS from "./chartPieS";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false});

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const Index = () => {
    const [dataReport, setDataReport] = useState([]);
    const [typeReport, setTypeReport] = useState([]);
    const [id, setId] = useState(store.get('id_shop') ? store.get('id_shop') : 0);

    const getDataReport = async () =>{
        let data;
        let result;
        let months;
        let report;
        let type;
        if(id > 0){
            data = await axios(`https://manage.pro-market.net/dpui?service=report&reportName=DataProviderSegmentUUsReport&dpid=${ id }`);
            result = await jsonData(data.data,id);
            if(result.length > 0){
                months = await recentMonth(result);
                report = await getMostPopular(result, months[0].month);
                console.log(JSON.stringify(report));  
                setDataReport(report);
                type = await extractColumn(report, "report").unique();
                setTypeReport(type);
            }
        }
        
        
    }
    const grafica = (result,type) =>{
        if(result && result.length > 5){
            return <ChartBar results={result} type={type}/>
        }else if(result && (result.length > 2 && result.length <= 5)){
            return <ChartPie results={result} type={type}/>
        }else if(result && result.length == 2){
            return <ChartPieS results={result} type={type}/>
        }else if(result && result.length == 1){
            return <ChartCard results={result} type={type}/>
        }
    }

    let components = [1,2,3,4,5,6,7,8,9,8];
    
    useEffect(()=>{
        getDataReport();
    },[]);
    return(
        <AdminLayout contentTitle={'Most Popular'}>
            <HeaderAnalytics />
            <Row>
            {
                dataReport.length > 0 ? (
                    typeReport.map((report, index)=>{
                        let dataArray = dataReport.filter(segment => segment.report == report);
                        return (
                        <Col lg={6}>
                            {grafica(dataArray, report)}
                        </Col>
                        )
                    })
                ):(
                    components.map(element => {
                        return  (
                            <Col lg={6}>
                            <div className="card" style={{height: '360px'}}>
                            <div className="card-body">
                            <span className="iconify icon" data-icon="heroicons-outline:user-group" data-inline="false"></span>
                                <NoDataAvailable/>
                                </div>
                            </div>
                            </Col>
                            )
                    })
                )
            }
            </Row>
        </AdminLayout>
    );
}
//<ProgressPopular data={dataArray} key={index} type={report}/>
export default Index;