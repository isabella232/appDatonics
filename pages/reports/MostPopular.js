import { getMostPopular } from "../../helper/getMostPopular";
import GenerateReport from "./GenerateReport";
import { useState, useEffect } from "react";

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const MostPopular = ({data, month}) =>{

    //const [dataReport, setDataReport] = useState([]);
    //const [typeReport, setTypeReport] = useState([]);
    let dataReport = [];
    let typeReport = [];
    if (data && month) {
        let report = getMostPopular(data,month);
        if(report.length > 0){
            dataReport = report;
            let type =  extractColumn(report, "report").unique();
            typeReport = type.length > 0 ? type : [];
        }        
        
    }
    return (<div>
        { typeReport ? (
                typeReport.map((report, index)=>{
                    let dataArray = dataReport.filter(segment => segment.report == report);
                    return (<GenerateReport key={index} data={dataArray} type={report} position={0}/>)
                })):(null)
            }
    </div>);
}

export default MostPopular;