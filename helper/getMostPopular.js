import descriptions from '../storage/segmentDescription.json';

function extractColumn(arr, column) {
    return arr.map(x => x[column])
}
Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});


export function getMostPopular(results, month) {

    if (month != 1 && month != 2 && month != 3) {
        return getMonthPopular(results,month);
    }else{
        return FilterMonth(results, month);
    }
}

export function getMonthPopular(results, month){
    let segments = [];
    let filterMonth = results.filter(segment => segment.month == month);
    filterMonth.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
    filterMonth.map(segment => {
        let name = segment.segment_name.split(">");
        segments.push(name[0].trim());
    });
        let reports = [];
        let temp = [];
        segments.forEach(element => {
            let result = temp.filter(segment => segment == element);

            if(result.length <= 0)
                temp.push(element);
            result = [];
        })        

        segments = temp;
        
        
        segments.length > 10 ? segments.splice(10) : segments; 
               
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
        segments.forEach(segment => {            
            filterMonth.forEach(element => {
                if(element.segment_name.includes(segment)){
                    let typeReport = element.segment_name.split(">");
                    let description = descriptions.filter(description => description.segment_id ==  element.segment_id);
                    reports.push({
                        "report": typeReport[0].trim(),
                        "name": typeReport[typeReport.length -1].trim(),
                        "month": months[element.month.slice(4)-1],
                        "id_segment": element.segment_id,
                        "unique_cookies": element.unique_cookies,
                        description: description[0].segment_description
                    });
                }
            });
        });
    if(reports.length > 0)
    {
        reports.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
        return reports;
    }
}

function FilterMonth(results, filter) {
    let months = extractColumn(results, 'month').unique();
    months.sort((a,b) => b-a);
    let month = Math.max(...months);

    let filterReport = [];
    let tempArray = [...months];
    if(filter == 3)
        tempArray.splice(tempArray.length > 3 ? 3 : tempArray.length-1);
    else if(filter == 2)
        tempArray.splice(tempArray.length > 6 ? 6 : tempArray.length-1);
    else if(filter == 1)
        tempArray.splice(tempArray.length > 12 ? 12 : tempArray.length-1);       

    tempArray.forEach(month =>{
        let filterMonth = [];
        let segments = [];
        filterMonth = results.filter(segment => segment.month == month);
        filterMonth.sort((a, b) => (parseInt(a.unique_cookies) - parseInt(b.unique_cookies)) * -1);
        filterMonth.map(segment => {
            let name = segment.segment_name.split(">");
            segments.push(name[0].trim());
        });
        let temp = [];
        segments.forEach(element => {
            let result = temp.filter(segment => segment == element);

            if(result.length <= 0)
                temp.push(element);
            result = [];
        })
        segments = temp;            
        segments.length > 10 ? segments.splice(10) : segments;  
        
        segments.forEach(segment => {            
            filterMonth.forEach(element => {
                if(element.segment_name.includes(segment)){
                    let t = [];
                    let bandera = true;
                    if (filterReport.length > 0) {
                        t = filterReport.findIndex(seg => seg.id_segment == element.segment_id);
                        if (t != -1) {
                            filterReport[t].unique_cookies = parseInt(filterReport[t].unique_cookies) + parseInt(element.unique_cookies);
                            bandera = false;
                        }
                    }
                    if(bandera){
                        let typeReport = element.segment_name.split(">");
                        filterReport.push({
                            "report": typeReport[0].trim(),
                            "name": typeReport[typeReport.length -1].trim(),
                            "month": formatMonth(tempArray),
                            "id_segment": element.segment_id,
                            "unique_cookies": element.unique_cookies
                        });
                    }
                }
            });
        });
        
    });

    return filterReport;
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