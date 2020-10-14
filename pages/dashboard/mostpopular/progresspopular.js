import React from 'react';
import Link from 'next/link';
import { Card, CardBody, Table, Progress } from 'reactstrap';
import NoDataAvailable from '../../../components/NoDataAvailable';

const ProgressPopular = ({ data, type }) => {

    let dataArr = data;
    
    if(dataArr && dataArr.length > 0){
        dataArr.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
        
     return (
    <div className="card" style={{height: '360px'}}>
        <div className="card-body">
            <span className="iconify icon" data-icon="heroicons-outline:user-group" data-inline="false"></span>
            <h4 className="header-title mb-2">{type}</h4>
            <Table responsive className="table-sm table-centered mb-4 font-14">
                <tbody>
                    {
                        dataArr.map((data, index) => (
                            index < 5 ? (<tr key={ index }>
                                <td>{ data.name }</td>
                                <td></td>
                                <td style={{ width: '50%' }}>
                                    <Progress color="success" value={(data.unique_cookies * 10) / 100} style={{ height: '13px' }} />
                                </td>
                                <td>{ data.unique_cookies }</td>
                            </tr>
                            ):(<div></div>)
                        ))
                    }
                </tbody>
            </Table>
            {
                dataArr.length > 5 ? (
                    <Link href={ '/stadistics/age/400200' }>
                    <a style={{
                        backgroundColor: '#f1f3fa',
                        border: 'none',
                        display: 'block',
                        color: '#000',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        textAlign: 'center',
                        width: '100%',
                        marginBottom: '1rem'
                    }}>
                        View All
                    </a>
                    </Link>
                ):(
                    <div></div>
                )
            }
        </div>
    </div>
    );
    }else{
        return null;
    }
};

export default ProgressPopular;


{/* <Card className="height-demographics-card">
<CardBody>
    <span className="iconify icon" data-icon="heroicons-outline:user-group" data-inline="false"></span>
    <h4 className="header-title mb-2">Age</h4>
    {
        dataArr.length > 0 ? (
            <div>
                <Table responsive className="table-sm table-centered mb-4 font-14">
                    <tbody>
                        {
                            dataArr.map((data, index) => (
                                <tr key={ index }>
                                    <td>{ data.segment_name }</td>
                                    <td style={{ width: '75%' }}>
                                        <Progress color="success" value={(data.unique_cookies * 10) / 100} style={{ height: '13px' }} />
                                    </td>
                                    <td>{ data.unique_cookies }</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Link href={ '/stadistics/age/400200' }>
                    <a style={{
                        backgroundColor: '#f1f3fa',
                        border: 'none',
                        display: 'block',
                        color: '#000',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        textAlign: 'center',
                        width: '100%'
                    }}>
                        View All
                    </a>
                </Link>
            </div>
        ) : (
            <NoDataAvailable />
        )
    }
    
</CardBody>
</Card> */}