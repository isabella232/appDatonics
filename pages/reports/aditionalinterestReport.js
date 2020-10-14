import { useState } from "react";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import GenerateReport from "./GenerateReport";
import { getReport } from "../../helper/getReport";

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const AditionalinterestReport = ({data, month}) =>{
    let dataArr = [];
    let dataReport = [];
    let typeReports = [];
    if(data){
        dataArr = getReport(data, month);
        if(dataArr.length > 0){
            dataReport = dataArr.filter(element => element.report == "aditionalinterest");
            typeReports = extractColumn(dataArr, "type").unique();        
        }
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen); 
    
    return (
               <div>
            {
                dataReport.length > 0 ?(<div>
                    <h5  className="border-bottom table-header title-report" onClick={toggle} style={{ marginBottom: '0rem' }}><a id="groups0" style={{fontWeight:"500",paddingBottom:"1px !important"}} className="custom-accordion-title d-block nav-link">
                    <i className="fas fa-caret-right" style={{fontSize:"1rem"}}></i>  &nbsp; &nbsp;Additional Interest</a></h5>
                    <Collapse isOpen={isOpen}>
                        {
                            typeReports.map((report, index) =>{
                                let reports = dataReport.filter(data => data.type == report);                   
                                return (
                                    <div>
                                        <GenerateReport key={index} data={reports} type={report} filter={month} source={data}/>
                                    </div>
                                );
                            })
                        }
                    </Collapse>
                </div>):(null)
            }
        </div>
      );
}

export default AditionalinterestReport;