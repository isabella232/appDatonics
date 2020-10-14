import { Row, Col } from "reactstrap";

const Segment = (props) =>{
    return (
            <Row className="header-white border-bottom border-top" style={{marginBottom: "0"}}>
                <Col lg={10}>
                        <p style={{padding:'0px'}}><strong>{props.titleLeft}</strong></p>
                </Col>
                <Col lg={2}>
                        <p style={{padding:'0px'}}> <strong>{props.titleRight}</strong></p>
                </Col>
            </Row>
    );
}

export default Segment;