import fetch from 'node-fetch';

const TYPEFORM_API = 'https://api.typeform.com/forms/aCcwpCEd/responses';
const TYPEFORM_API_KEY = '5vaDsViYWUVB6dpU2TzPWthbLqtFJ6xZipQUaXivmW7y';

const getAnswerTypeForm = () => {
    return fetch(TYPEFORM_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TYPEFORM_API_KEY}`
        }
    });
}

export default getAnswerTypeForm;
