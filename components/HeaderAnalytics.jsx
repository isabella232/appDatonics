import { Row, Col, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import React, { useEffect , useState} from 'react';
import { jsonData } from '../helper/getReport';
import store from 'store-js';

//postgresql-concentric-26527

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const HeaderAnalytics = () => {const [results, setResults] = useState([]);
    const [id, setId] = useState(store.get('id_shop') ? store.get('id_shop') : 0);
    const [forMonth, setForMonth] = useState();
    
    const getChartResults = async () => {
        let data;
        if(id > 0)
            data = await axios(`https://manage.pro-market.net/dpui?service=report&reportName=DataProviderSegmentUUsReport&dpid=${ id }`);
        if(data){
            let response = await jsonData(data.data);
            setResults(response);
        }
         
    };
    useEffect(() => {
        getChartResults();
    }, []);

    const HasDataOn = () =>{
        if(results.length == 0){
            return (<div className="text-center"><div className="loader">
                    <div className="bar"></div>
                    </div>
                    <h5 style={{marginTop:"1.5rem"}}>Hold Tight! Your segments will begin to populate in as little as 24 hours.</h5>
                    </div>);
        }
        let months = extractColumn(results,'month').unique();
                
        months.sort((a, b) => b - a);
        let lastMonth = 0;
        let nameMonths=
        ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"]
        if(months.length > 1){
            lastMonth = months[1];
        }
        let month = Math.max(...months);
        let m = month.toString();
        if(!forMonth) {setForMonth(nameMonths[parseInt(m.substr(4,5))-1])};
        let recentMonth = results.filter(segment => segment.month == month);
        let totalCookies = extractColumn(recentMonth, 'unique_cookies').reduce((total,cookies) => parseInt(total) + parseInt(cookies));
        totalCookies = totalCookies > 100000000 ? 100000000 : totalCookies;
        return new Intl.NumberFormat("en-US").format(totalCookies)
    }
    return (
        <Row>
            {/*<Col lg={6}>
                <Card className="tilebox-one">
                    <CardBody>
                        <i className="uil uil-users-alt float-right"></i>
                        <h6 className="text-uppercase mt-0">UNIQUE MONTHLY VISITORS</h6>
                        <h2 className="my-2" style={{fontWeight:'700'}} id="active-users-count">39,154</h2>
                        <p className="mb-0 text-muted">
                            <span className="text-success mr-2">
                                <span className="mdi mdi-arrow-up-bold"></span> 5.27%</span>
                            <span className="text-nowrap">Since last month</span>
                        </p>
                    </CardBody>
                </Card>
            </Col>*/}
            <Col lg={results.length > 0 ? 6 : 12}>
                <Card className="tilebox-one" style={{overflow: 'hidden'}}>
                    <CardBody>
                        <i className="mdi mdi-chart-arc float-right"></i>
                        {results.length > 0 ? (<h6 className="text-uppercase mt-0">USERS DATONICS HAS DATA ON</h6>):(null)}
                        <h2 className="my-2" style={{fontWeight:'700'}}  id="active-users-count">{HasDataOn()}</h2>
                        <p className="mb-0 text-muted">
                           {/*  <span className="text-success mr-2">
                                <span className="mdi mdi-arrow-up-bold"></span> 68.63% Of Unique Visitors</span> */}
                            {/* <span className="text-nowrap">Since last month</span> */}
                        </p>
                    </CardBody>
                </Card>
            </Col>
            <>
            {
                results.length > 0 ? (
                <Col lg={6}>
                    <Card className="tilebox-one" style={{overflow: 'hidden', minHeight: '129px'}}>
                        <CardBody>
                            <i className="mdi mdi-chart-arc float-right"></i>
                            {results.length > 0 ? (<h6 className="text-uppercase mt-0">DATA FOR</h6>):(null)}
                            <h2 className="my-2" style={{fontWeight:'700'}}  id="active-users-count">Last 30 Days</h2>
                        </CardBody>
                    </Card>
                </Col>):(null)
            }
            </>
        </Row>
    );
};

export default HeaderAnalytics;