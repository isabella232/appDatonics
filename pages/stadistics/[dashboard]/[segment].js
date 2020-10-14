import { useRouter } from "next/router";
import AdminLayout from "../../../components/layouts/admin";
import Link from "next/link";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { useState, useEffect } from "react";
import ViewAll from "./ViewAll";
import axios from 'axios';
import { jsonData } from "../../../helper/getReport";
import store from 'store-js';


const Segment = () =>{
    const [id, setId] = useState(store.get('id_shop') ? store.get('id_shop') : 0);
    const router = useRouter();
    const [results, setResults]  = useState([]);

    const getData = async () =>{
        let data;
        if(store.get('id_shop'))
            setId(store.get('id_shop'))
        if(id)
            data = await axios(`https://manage.pro-market.net/dpui?service=report&reportName=DataProviderSegmentUUsReport&dpid=${ id }`);
        if(data){
            let response = await jsonData(data.data);
            setResults(response);
        }
    }
    function formatName(){
        let format;
        let segments;
        let name = router.query.segment;
        if (name) {
            segments = name.split('_');        
        
            for (let index = 0; index < segments.length; index++) {
                if(index == 0)
                    format = segments[index];
                else
                    format = format + " " + segments[index]; 
            }
        }
    
        return format;
    }

    useEffect(()=>{
        getData();
    },[]);
    
    const viewAllSegment = () =>{
        return <ViewAll name={router.query.segment} data={results}/>
    }
    return (
    <AdminLayout contentTitle={'Audience Insights'}>
        <Row>
            <Col lg={12} className="text-right mb-3">
                <Link href={`/dashboard/${router.query.dashboard}`}>
                    <button className="btn btn-danger">Close</button>
                </Link>
            </Col>
            <Col lg={12}>
                <Card style={{height:'360px'}}>
                    <CardBody>
                    <span className="iconify icon" data-icon="heroicons-outline:user-group" data-inline="false"></span>
                    <h4 className="header-title mb-2">{formatName()}</h4>
                    {viewAllSegment()}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </AdminLayout>
    )
}

export default Segment;