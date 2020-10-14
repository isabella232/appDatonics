import { useState } from "react";
import { Collapse, Button, CardBody, Card, Table } from 'reactstrap';
import ChartLine from "./chartLine";

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const GenerateReport = ({data, type, position = 1, filter =0, source}) =>{
    
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => setIsOpen(!isOpen);
    

    if (data && data.length > 0) {
        data.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
        return (
            <div className={position ? "pl-3 border-bottom" : "border-bottom"}>
            <h5 onClick={toggle} style={{marginBottom:"0"}} className="table-header title-report"><a id="groups0" style={{fontWeight:"500",marginBottom:"0"}} className={position ? "custom-accordion-title d-block nav-link card-toggle " : "custom-accordion-title d-block nav-link"}>
            <i className="fas fa-caret-right"></i> &nbsp; &nbsp;{type.charAt(0).toUpperCase() + type.slice(1)}</a></h5>
            <Collapse isOpen={isOpen}>
                {
                    data.map((element, index) =>{
                        return (<ChartLine key={index} data={element} filter={filter} source={source}/>);
                    })
                }
            </Collapse>
          </div>
        );
    }else{
        return null;
    }
}

export default GenerateReport;