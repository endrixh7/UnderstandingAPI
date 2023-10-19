// Multiple Request Management
// Talk to multiple servers

const jsonstr = 'https://random-data-api.com/api/v2/users?size=10';
const imgstr = 'https://picsum.photos/id/237/300/200';

// Create the function to make the Fetch request
// Get all data at the same time
// Promise object has a method - .Promise.all();
// .race() -> I will give an array of promises
// .allSettled() -> Give me the array when everything is succesfully done

export function getData() {
    //
    let imgResponse;
    let jsonResponse;
    //sequence
    fetch(imgstr)
      .then((response) => {
        if (!response.ok) throw new Error('invalid');
        return response.blob();
        //we can add another then and work with image here
      })
      .then((blob) => {
        //work with blob add img to page...
        return fetch(jsonstr);
      })
      .then((response) => {
        if (!response.ok) throw new Error('invalid');
        jsonResponse = response.json();
        return Promise.all([imgResponse, jsonResponse]);
      })
      .then(([blob, dataObj]) => {
        console.log(dataObj);
        console.log(blob);
      })
      .catch(console.warn);
  
    Promise.all([fetch(imgstr), fetch(jsonstr)])
      .then(([imgRes, jsonRes]) => {
        return Promise.all([imgRes.blob(), jsonRes.json()]);
      })
      .then(([blob, jsonData]) => {
        //at the same time
      })
      .catch(console.warn);
  }

getData();