import { Card, CardBody } from "reactstrap";
import {Icon} from '@iconify/react';
import ResistorNodes from '@iconify/icons-mdi/resistor-nodes';

const ChartCard = ({results, type}) =>{
    
    return(
    <Card className="height-demographics-card">
        <CardBody>
            { results ? (
            <div className="text-center">
                <h3 className=" mb-2" style={{color:'#6c757d !important',textTransform: 'uppercase',letterSpacing:'.02em',fontSize: '1.2rem',marginTop: '0'}}>{type}</h3> 
             
                <div className="text-center padd-box-text">
                <Icon icon={ResistorNodes} style={{fontSize: "60px"}}/>
                <h2 className="my-2 mb-3 text-big" id="active-users-count">{results[0].unique_cookies}</h2>
                </div>
             </div>
            ):(null)

            }
        </CardBody>
    </Card>
    );
}

export default ChartCard;