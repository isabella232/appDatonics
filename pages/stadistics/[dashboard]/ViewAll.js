import dataStatic from '../../../storage/datastatic.json';
import { chartData } from '../../../helper/helper';
import ChartBarView from '../../../components/chart/chartBarView';
import classification from '../../../storage/gpsClassification.json';
import 'antd/dist/antd.css';
import { Skeleton } from 'antd';

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function formatName(name){
    let format;
    let segments;
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

const ViewAll = ({name, data}) =>{  
    const id = [410001,410002,410003,410004,410005,410403,410402,410401,410309,410308,410307,410306,410305,410304,410303,410302,410301,410207,410206,410205,410204,410203,410202,410201,410108,410106,410105,410104,410103,410102,410101];
    let dataArr = [];
    let idSegments = [];
    let segments=[];
    let segment = 'department_store_visitors_based_on_gps_classification';
    let nameSegment = formatName(name)
    segments = dataStatic.filter(segment => segment.type == nameSegment);
        
    idSegments = extractColumn(segments, "id_segment");
    
    if(idSegments && data && name != segment){ 
        dataArr = chartData(data, idSegments, segments);
    }else if(idSegments && data && name == segment){
        dataArr = chartData(data, id, classification);
    }

    const progress = (dataArr) =>{
        return (<>
                {dataArr.length > 0 ? (
                    <div>
                        <Table responsive className="table-sm table-centered mb-3 font-14">
                            <tbody>
                                {
                                    dataArr.map((segment, index) => (
                                        <tr key={ index }>
                                            <td>
                                                <img src={ segment.segment_name } width="100px" alt='' />
                                            </td>
                                            <td style={{ width: '50%', verticalAlign: 'middle'}}>
                                                <Progress
                                                    color="success"
                                                    value={(parseInt(segment.unique_cookies) * 10) / 100}
                                                    style={{ height: '13px' }}
                                                />
                                            </td>
                                            <td style={{verticalAlign: 'middle'}}>{segment.unique_cookies}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <NoDataAvailable />
                )}
                </>
        );
    }

    return <div>
        {
           dataArr.length > 0 && name == segment? (
                    //<ChartBar results={dataArr}/>
                    <>
                        {progress(dataArr)}
                    </>
                ) : (
                    <ChartBarView results={dataArr}/>
                )
        }
        </div>
}

export default ViewAll;