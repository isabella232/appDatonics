import ChartBar from "../chart/chartBar";
import NoDataAvailable from "../NoDataAvailable";
import Link from "next/link";
import ChartPie from "../chart/chartPie";
import ChartPieS from "../chart/chartPieS";
import ChartCard from "../../components/chart/chartCard";
import informationOutline from '@iconify/icons-mdi/information-outline';
import { searchIcon } from '../../storage/icons';
import 'antd/dist/antd.css';
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { InlineIcon, Icon } from "@iconify/react";
import { Button } from 'antd';
import { useRouter } from "next/router";

const { Card, CardBody, Row, Col } = require("reactstrap");

const ChartConditional = (result, type) =>{
    if(result && result.length > 5){
        return <ChartBar results={result}/>
    }else if(result && (result.length > 2 && result.length <= 5)){
        return <ChartPie results={result}/>
    }else if(result && result.length == 2){
        return <ChartPieS results={result}/>
    }else if(result && result.length == 1){
        return <ChartCard results={result} logo={searchIcon(type)}/>
    }
}

const CardSegment = ({data, type}) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    let dashboard = router.pathname.split('/');
    dashboard = dashboard[dashboard.length - 1 ];    
    const visibleModal = () =>{
        setVisible(true);
    }
    const ModalOk = (e) =>{
        setVisible(false);
    }
    return(
        <>
        {
            data.length > 0 ?(<Card className="height-demographics-card">
                <CardBody>
                <Row>
                    <>{data.length > 1 ? (<Col lg={10}><h4 className="header-title mb-2">{type}</h4></Col>):(null)}</>
                    <Col lg={data.length > 1 ? 1 : 12} className="text-right">{data.length > 0 ? (<InlineIcon icon={informationOutline} onClick={visibleModal} style={{fontSize: '28px', verticalAlign: '-moz-middle-with-baseline',color: '#ccc', cursor:'pointer'}}/>):(null)}</Col>
                    <>
                    {data.length > 1 ?
                    (<Col lg={1}> <Icon icon={searchIcon(type)} style={{fontSize: '28px', verticalAlign: '-moz-middle-with-baseline',color: '#ccc'}}/></Col>)
                    :(null)
                    }
                    </>
                </Row>
                    {ChartConditional(data,type)}
                    {
                        data.length > 6 ? (                  
                        <Link href={ `/stadistics/${dashboard}/${type}` }>
                        <a  style={{
                        backgroundColor: '#f1f3fa',
                        border: 'none',
                        display: 'block',
                        color: '#000',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        textAlign: 'center',
                        width: '100%',
                        marginBottom: '1rem',
                    }}>
                            View All
                        </a>
                    </Link>):(null)
                    }
                </CardBody>
                <Modal
                    title="Segment Description"
                    centered
                    visible={visible}
                    onOk={ModalOk}
                    onCancel={ModalOk}
                    width = '550px'
                    zIndex = '9999'
                    footer={[<Button type="primary" onClick={ModalOk}>
                    Ok
                    </Button>
                    ]}
                >
                {
                    data.length > 0 ? (
                        data.map((segment) => {
                        return<p><strong>{segment.segment_name}</strong>: {segment.description}</p>;
                        })
                    ):(null)
                }
            </Modal>
            </Card>):(<NoDataAvailable/>)
        }
        </>
    );
}

export default CardSegment;