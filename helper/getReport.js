import dataStatic from '../storage/datastatic.json';
import descriptions from '../storage/segmentDescription.json';
import axios from 'axios';

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

export function getReport(data, month){
    if(month != 3 && month != 2 && month != 1)
        return filterMonth(data, month);
    else
        return filterLastMonths(data,month)
}

function filterMonth(data, month) {    
    let reports = [];
    let dataMonth = data.filter(element => {
        return element.month == month
    })
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    if(dataMonth){
        dataStatic.forEach(datastatic =>{
            let result  = dataMonth.filter(data =>{
                return data.segment_id == datastatic.id_segment  &&  data.month == month   
            });
            if(result.length > 0){  
                let description = descriptions.filter(description => description.segment_id ==  result[0].segment_id);              
                reports.push({
                    "month": months[result[0].month.slice(4)-1],
                    "report": datastatic.report,
                    "type": datastatic.type,
                    "segment_id": result[0].segment_id,
                    "name": datastatic.name,
                    "unique_cookies": result[0].unique_cookies,
                    description: description[0].segment_description
                });

                result = [];
            }
        });        
        if(reports)
            return reports;            
    }        
}

function filterLastMonths(data,month) {
    let reports = [];
    let segments = [];
    let totalCookies = 0;
    let sizeMonth = 0;

    dataStatic.forEach(datastatic =>{
        segments  = data.filter(segment =>{
            return segment.segment_id == datastatic.id_segment     
        });
        
        let recentMonth = extractColumn(segments, "month").unique();
        if(month == 3)
            sizeMonth = recentMonth.length > 3 ? 3 : recentMonth.length;
        else if(month == 2)
            sizeMonth = recentMonth.length > 6 ? 6 : recentMonth.length;
        else
            sizeMonth = recentMonth.length > 12 ? 12 : recentMonth.length;
        
        segments.sort((a, b) => (parseInt(a.month) - parseInt(b.month)) * -1)

        segments.forEach((element,index) => {
            if(index < sizeMonth)
                totalCookies += parseInt(element.unique_cookies);
        });      
        
        if(segments.length > 0){
            if(recentMonth.length + 1 > sizeMonth){
                recentMonth = recentMonth.splice(recentMonth.length - sizeMonth);
            }
            let description = descriptions.filter(description => description.segment_id == datastatic.id_segment);
            reports.push({
                "month": formatMonth(recentMonth),
                "report": datastatic.report,
                "type": datastatic.type,
                "segment_id": datastatic.id_segment,
                "name": datastatic.name,
                "unique_cookies": totalCookies,
                description: description[0].segment_description
            });
            totalCookies = 0;
        }
    });
    
    if(reports)
        return reports;
    return [];
}
function formatMonth(months) {
    let cadena = "";
    let nameMonth = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    months.forEach(month => {
        cadena = cadena.length > 0 ? cadena + "," + nameMonth[month.slice(4)-1] : nameMonth[month.slice(4)-1];
    })

    return cadena;
}
export function getSeriesChart(data, id_segment, filter){
    let segments;
    let size = 0;
    if(filter == 3){
        size  = data.length > 3 ? 3 : data.length;
    }else if(filter == 2){

        size  = data.length > 6 ? 6 : data.length;

    }else if(filter == 1){

        size  = data.length > 12 ? 12 : data.length;
    }
    segments = data.filter(segment=> segment.segment_id == id_segment);
    segments.sort((a, b) => (parseInt(a.month) - parseInt(b.month)))
    return chartLast3Month(segments,size);
}

function chartLast3Month(data, size){

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    let series = [];
    let month = [];
    let options = [];
    data.sort((a, b) => (parseInt(a.month) - parseInt(b.month)) * - 1);
    data.forEach((segment,index)=>{
        if(index < size){
            series.push(segment.unique_cookies);
            month.push(months[segment.month.slice(4)-1]);
        }
    });
    options.push(series.reverse());
    options.push(month.reverse());

    return options;
}
export function jsonData(data, id, datamonths = []){
    let jsonObj = [];
    let month = "";
        let csv = data;
        let buffering = csv.toString();        
        let arr = buffering.split('\n');        
        let header = arr[0].replace(/['"]+/g, '').toLowerCase();        
        let h = header.split(',');
        for (let i = 1; i < arr.length-1; i++) {
            let secc = arr[i].split('","');
            let obj = {};
            for (let j = 0; j < secc.length; j++) { 
              if(h[j] != undefined){
                let inner_head = h[j].trim().replace(/ /g, '_'); 
                let value = secc[j].trim().replace(/['"]+/g, ''); 
                  if(inner_head == 'run_date'){
                      inner_head = 'month';
                      month = value.substr(0,10).split('-').join("");
                      value = value.substr(0,7).split('-').join("");
                  }
                  if (inner_head == 'cookies_unique') {
                      inner_head = 'unique_cookies';
                  }             
                if(value.length > 0)
                    obj[inner_head] = value;
              }            
                               
            }
            if(Object.keys(obj).length > 0){
                jsonObj.push(obj);
            }
                
        }
        let date = new Date();
        if(Object.keys(jsonObj).length > 0 && month == date.getFullYear() + '0228' || month == date.getFullYear() + (date.getFullYear() + '' + (date.getMonth() >= 9 ? date.getMonth() + 1 :'0' + (date.getMonth() + 1)) + '30') + '30'){
            getDataShopMonth(id,month.substr(0,6), jsonObj);
        }
        //jsonObj = [];
        if(datamonths.length > 0)
        {
            datamonths.forEach(segment=>{
                jsonObj.push(...segment.data);
            })
        }
        return Object.keys(jsonObj).length > 0 ? jsonObj : [];
}

function getDataShopMonth(id_shop, month, jsonObj) {
    let datajson = [];
    axios.post('https://mighty-badlands-15868.herokuapp.com/api/shop/findShopMonth',{
        data:{
            id_shop:id_shop,
            month:month
        }
    }).then(result=>{
        if(result.data.length > 0)
            return;
        else{
            saveDataShop(jsonObj,id_shop,month);
        }
    });
}

function saveDataShop(jsonObj, id_shop, month){
    axios.post('https://mighty-badlands-15868.herokuapp.com/api/shop/saveDataShop',{
        data:{
            month:month,
            id_shop:id_shop,
            data: JSON.stringify(jsonObj)
        }
    }).then(result=>{
        if(result.length <= 0){
            saveDataShop(month,id_shop, jsonObj);
        }
    });
}

export function recentMonth(results){
    let numberMonth = [];
    let recentMonth = 0;
    let arrMonth = [
      {
        "name": "Last 3 Months",
        "month": 3
      },
      {
        "name": "Last 6 Months",
        "month": 2
      },
      {
        "name": "Last 12 Months",
        "month": 1
      },
    ];
    let name_month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December']
    
    if(results && results.length > 0){                        
      numberMonth = extractColumn(results, 'month').unique();
      numberMonth.sort((a, b) => (parseInt(a.month) - parseInt(b.month)) * -1);
    }
    
    if(numberMonth && numberMonth.length > 0){          
      recentMonth = Math.max(...numberMonth);
      arrMonth.push({
        "name": "Last 30 Days",
        "month": recentMonth
      });
      
      return arrMonth.sort((a, b) => (parseInt(a.month) - parseInt(b.month)) * -1);
    }
}