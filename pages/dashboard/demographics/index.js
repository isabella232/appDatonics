import AdminLayout from "../../../components/layouts/admin";
import HeaderAnalytics from "../../../components/HeaderAnalytics";
import dataStatic from '../../../storage/datastatic.json';
import CardSegment from "../../../components/Card/cardSegment";
import { chartData } from "../../../helper/helper";
import NoDataAvailable from "../../../components/NoDataAvailable";
import React, {useState, useEffect} from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import axios from "axios";
import { jsonData } from "../../../helper/getReport";
import store from 'store-js';

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const Index = () => {
    const [results, setResults] = useState([]);
    const [id, setId] = useState(store.get('id_shop') ? store.get('id_shop') : 0);
    const data = dataStatic.filter(data => data.report == "Demographics");
    const nameSegment = extractColumn(data, 'type').unique();
    const initData = [10,9,8,7,6,5,4,3,2,1];

    const getChartResults = async () => {
        let data;
        let response = [];
        if (id > 0){
            data = await axios(`https://manage.pro-market.net/dpui?service=report&reportName=DataProviderSegmentUUsReport&dpid=${ id }`);
           response = await jsonData(data.data,id);
        }
        if(response.length > 0){
            setResults(response);
        }
    };

    useEffect(() => {
        getChartResults();
    }, []);
    return(
        <AdminLayout contentTitle={'Audience Insights '}>
            <HeaderAnalytics />
            {
                results.length > 0 ? (
                    <Row>
                {
                   nameSegment.map((name, index) => {
                    let segments = data.filter(segment => segment.type == name);
                    let idSegment = extractColumn(segments, "id_segment");
                    let dataArr = chartData(results, idSegment, segments);
                       return (
                           <>
                           {
                               dataArr.length > 0 ? (
                               <Col lg={6}>
                                <CardSegment key={index} data={dataArr} type={name} />
                               </Col>):(<>
                               </>)
                           }
                           </>
                       )
                   })
                }
            </Row>
                ):(<Row>
                    {
                        initData.map(element => {
                            return (<Col lg={6}>
                                <Card className="height-demographics-card">
                                    <CardBody>
                                        <NoDataAvailable/>
                                    </CardBody>
                                </Card>
                               </Col>)
                    })
                    }
                </Row>
                )
            }
        </AdminLayout>
    );
}

export default Index;