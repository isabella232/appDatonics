import React from "react";
import {Card, CardBody ,Row, Col} from 'reactstrap';
import Form from './form'
import AdminLayout from '../../components/layouts/admin';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
            <AdminLayout contentTitle={'Support'}>
              <Row>
                <Col lg={6} style={{paddingLeft:'20px'}}>
                    <Card>
                        <CardBody>
                            <Form/>
                        </CardBody>
                    </Card> 
                </Col>
              </Row>  
            </AdminLayout>
        </div>   
    );
  }
}

export default Index;