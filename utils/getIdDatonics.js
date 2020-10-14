import fetch from 'node-fetch';

const DATONICS_API = 'https://account.datonics.com/index.php/dpui/create_account';

const getIdDatonics = async ({ name, domian }) => {
    await fetch(DATONICS_API, {
        method: 'POST',
        data:{
            name:name,
            domian:domian
        },
        headers: {
            "Content-Type": "text/html",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'content-type',
            "origin":"*"
        },
    });
}

export default getIdDatonics;
