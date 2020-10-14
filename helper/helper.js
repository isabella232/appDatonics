import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import descriptions from '../storage/segmentDescription.json';

export function chartData(apiData,idSegments, jsonTitles, numberView = idSegments.length){      
    let Segment = [];
    let arrayMonth = [];
    let dataChart = [];
    let contador = 0;
    
    
    if(apiData == '' || apiData.length <= 0 ){
        return '';
    }
    for(let index = 0; index < numberView; index++) {
        Segment = apiData.filter(element => element.segment_id == idSegments[index]);
        if(Segment.length <= 0){
            //dataChart.push(generateJsonEmpty(idSegments[index],jsonTitles));
            contador +=1;
        }else if(Segment.length == 1){
            dataChart.push(generateJson(Segment[0],jsonTitles));
            contador = 0;
        }else{
            let data = [];
            let month = {};
            arrayMonth = Segment.map((value,index)=>{
                return value['month'];
            });
            month = Math.max.apply(null,arrayMonth);
            data = apiData.filter(element => element.month == month && element.segment_id == idSegments[index]);
            contador = 0;
            dataChart.push(generateJson(data[0], jsonTitles));
        }
    }
    if(contador >= numberView) 
        return [];
    dataChart.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
    
    return dataChart;
}

export function generateJsonEmpty(id_segment,jsonTitles){
    let dataJson = [];
    let jsonTitle = {};
    jsonTitle = jsonTitles.filter(element => {
        return element.id_segment == id_segment;
    });
    let description = descriptions.filter(description => description.segment_id ==  jsonTitle[0].id_segment);
    dataJson.push({ 
        month: "0",
        segment_id: jsonTitle[0].id_segment,
        segment_name: jsonTitle[0].name,
        unique_cookies: "0",
        description: description[0].segment_description
    });

    return dataJson[0];
}

export function generateJson(data,jsonTitles){

    let dataJson = [];
    let jsonTitle = {};
    jsonTitle = jsonTitles.filter(element => {
        return element.id_segment == data.segment_id;
    });
    let description = descriptions.filter(description => description.segment_id ==  jsonTitle[0].id_segment);
    dataJson.push({ 
        month: data.month,
        segment_id: jsonTitle[0].id_segment,
        segment_name: jsonTitle[0].name,
        unique_cookies: data.unique_cookies,
        description: description[0].segment_description
    });

    return dataJson[0];
}

export function getShop(){
    const GET_SHOP = gql`
{
  shop{
    name
    myshopifyDomain
  }
}
`;
const {loading, error, data} = useQuery(GET_SHOP);
    if(loading){console.log('loading');}
    if(error){console.log('error: ' + error.message);}
    if(data){console.log(data);}
}