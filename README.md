# UnderstandingAPI

- Using Promise

// Store url on a variable
const url = 'https://jsonplaceholder.typicode.com/users';


//Create a function
function getData(){
    // Make a Fetch Call
    fetch(url)
    .then((resp)=>{
        return resp.json();
    })
    .then((data)=>{
        console.log(data);
    })
}


getData();

- Using Async/Await
- Try and Catch block

// Store url on a variable
const url = 'https://jsonplaceholder.typicode.com/users';


//Create a function
async function getData(){
    // Make a Fetch Call
    try {
        let resp = await fetch(url);
            // Check if resp is ok
            if(!resp.ok) throw new error("error")
            console.log(resp);
        
            let data = await resp.json();
            console.log(data);    
    } catch (error) {
        console.log(error);
    }
    
}

getData();

# URL, Request, Headers

// URL and Request Objects
/*
 url: href, host, hostname, port, protocol, origin, pathname, hash, search, searchParams
request options: method, body, headers, cache
cache  (HTTP Cache, NOT Cache API)
- `default`: cache first, server request if stale, update cache if newer
- `reload`: always go to server AND update the cache
- `no-store`: always go to server but do not update the cache
- `no-cache`: make a conditional request to server and compare, update cache and use latest
- `force-cache`: only makes request if there is no HTTP Cache file
- `only-if-cache`: from cache or 504 gateway timeout error
Headers
- string | object literal | new Headers()
*/

const str = 'http://127.0.0.1:5500/local-sample.json?attempt=123&other=hello';

export function getData() {
  //
  const url = new URL(str);
  // console.log(url.host, url.origin, url.protocol, url.port, url.pathname);
  const request = new Request(url, {
    headers: { 'x-steve': 'hello' },
    method: 'GET',
    cache: 'no-store',
  });

  fetch(request)
    .then((response) => {
      // console.log(response.status);
      if (!response.ok) throw new Error('Invalid');
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.warn(err.message));
}

// Response objects

const jsonstr = 'http://127.0.0.1:5500/local-sample.json'; // json file
const imgstr = 'https://picsum.photos/id/237/300/200'; // image file
const fontstr = 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXp-p7K4KLg.woff2'; // font file
const htmlstr = 'http://127.0.0.1:5500/'; //html file

// HTTP Request  - HEAD, BODY
// HTTP Response - HEAD, BODY

let obj = {
  id: crypto.randomUUID(),
  name: 'the one who knocks',
  favouriteColor: 'blue',
};

export function getData() {
  //
  fetch(imgstr)
    .then((resp) => {
      if (!resp.ok) throw new Error('invalid');
      return resp.blob(); //binary large object images, video, audio, fonts.

      resp.text(); //for text, html, and xml files, and css, and js.
      resp.json(); //for json files
    })
    .then((blob) => {
      console.log(blob); //blob is a chunk of memory on users computer
      let url = URL.createObjectURL(blob);
      let img = document.getElementById('pic');
      img.src = url;
    })
    .catch(console.warn);

  let jsonstring = JSON.stringify(obj);
  // console.log(jsonstring);
  let file = new File([jsonstring], 'mydata.json', { type: 'application/json' });

  let response = new Response(file, {
    status: 200,
    statusText: 'Say my name',
    headers: {
      'content-type': 'application/json',
      'content-length': file.size,
      'x-steve': 'starts with x for a custom header name',
    },
  });

  // console.log(response.headers.get('content-type'));
  // console.log(response.headers.get('content-length'));
}

# Generate

// Create Webpage content from fetch results

const jsonstr = 'https://random-data-api.com/api/v2/users?size=10';
const imgstr = 'https://picsum.photos/id/237/300/200';
const textstr = 'http://127.0.0.1:3000/';

export function getData() {
  let list = document.getElementById('list'); //the <ul>
  let img = document.getElementById('pic'); //the <img>
  let header = document.querySelector('header');

  fetch(jsonstr)
    .then((response) => {
      if (!response.ok) throw new Error('invalid');
      return response.json();
    })
    .then((dataArray) => {
      //
      list.innerHTML = dataArray
        .map(({ uid, first_name, last_name }) => {
          return `<li class="listitem" data-uid="${uid}">
            <p>${first_name}</p>
            <p>${last_name}</p>
          </li>`;
        })
        .join('');
    })
    .catch(console.warn);

  fetch(textstr)
    .then((response) => {
      if (!response.ok) throw new Error('invalid');
      return response.text();
    })
    .then((txt) => {
      header.innerHTML += `<h2>${txt}</h2>`;
    })
    .catch(console.warn);

  fetch(imgstr)
    .then((resp) => {
      if (!resp.ok) throw new Error('invalid');
      return resp.blob();
    })
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      console.log(url);
      let img = document.getElementById('pic');
      img.src = url;
    })
    .catch(console.warn);
}


# Authentication

// API Keys, Authorization, Credentials, Content-Security-Policy

export function getData() {
  //What is an API Key
  //Where can we pass it to the server - querystring, headers, cookies
  //controlling when cookies and credentials are passed to a server
  //CSP meta tags and headers

  let str = 'http://127.0.0.1:3000/?name=value&steve=griffith';
  let url = new URL(str); //url.search
  let sp = url.searchParams;
  sp.append('hello', 'world');
  sp.append('api-key', 'kajshdfkahjsdfkjhsdfkahsdfkjksdjhfksjdh');
  // document.cookie('')

  let h = new Headers();
  // h.append('content-type', 'application/json')
  // h.append('origin', 'https://cia.org')
  h.append('x-api-key', 'kajshdfkahjsdfkjhsdfkahsdfkjksdjhfksjdh'); //API key
  h.append('Authorization', 'Bearer kajshdfkahjsdfkjhsdfkahsdfkjksdjhfksjdh'); //JWT
  //Forbidden Header Names

  let request = new Request(url, {
    method: 'GET',
    headers: h,
    cache: 'default',
    credentials: 'same-origin',
  });

  fetch(request)
    .then((response) => {
      if (!response.ok) throw new Error('invalid');
      return response.text();
    })
    .then((txt) => {
      console.log(txt);
    })
    .catch(console.warn);
}


# Upload File

//how to upload one or more files from the browser to a server
//FormData objects
//HTTP Methods POST, PATCH, PUT

let endpoint = 'http://127.0.0.1:3000/';

export function setData() {
  //
  const imgInput = document.getElementById('imgfile');
  const jsonInput = document.getElementById('jsonfile');

  document.getElementById('myform').addEventListener('submit', (ev) => {
    ev.preventDefault();
    //upload something
    let obj = {
      id: 123,
      name: 'steve',
    };
    let jsonstring = JSON.stringify(obj);

    let fd = new FormData(document.getElementById('myform'));
    // console.log(imgInput.files[0]);
    // fd.append('imageFile', imgInput.files[0], imgInput.files[0].name);

    let request = new Request(endpoint, {
      method: 'POST',
      // body: jsonstring,
      body: fd,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    fetch(request)
      .then((response) => {
        if (!response.ok) throw new Error('invalid');
        return response.text();
      })
      .then((txt) => {
        console.log(txt);
      })
      .catch(console.warn);
  });
}


# CORS

// CORS - cross origin resource sharing
/*
All requests that are not GET or HEAD need to include an `origin` header. 
Set by the browser, not the script.
Server sets ACCESS-Control-Allow-Origin: http://127.0.0.1:5500

Simple Request: The preflight request is NOT needed when:

1. method is HEAD, GET, or POST;
2. and headers are only accept, accept-language, content-language, content-type, or range
3. and content-type is only `text/plain`, `multipart/form-data`, or `application/x-www-form-urlencoded`;
4. and `accept`, `accept-language`, and `content-language` are only standard values;
5. and no ReadableStream object is used in the Request

CORS OPTIONS request includes the 
`Access-Control-Request-Method` and 
`Access-Control-Request-Headers` headers.

Request Mode
- no-cors: skip the OPTIONS request
- cors: must meet the CORS criteria. OPTIONS request will be made
- same-origin: result in an error if not same origin
- navigate: only set by the browser, not by JS


Opaque responses can be used as the contents of a `<script>`, `<link rel="stylesheet">`, `<img>`, `<video>`, `<audio>`, `<iframe>`, `<embed>` or `<object>`.

Not for `<canvas>`.

Not for Web Fonts.

Not for Cache Storage `add()` or `addAll()`. But you can do a fetch and then use Cache `put()`.

Opaque responses have a status of 0.

Using no-cors mode basically means that, if you get an opaque response:

1. you don't care about seeing the resulting file
2. don't bother sending a preflight request.

A CORS-safelisted response-header names

`Cache-Control` `Content-Language` `Content-Length` `Content-Type` `Expires` `Last-Modified` `Pragma`
*/

export function getData() {
  //
  const imgurl = `https://picsum.photos/id/237/300/200`;

  let request = new Request(imgurl, {
    cache: 'default',
    credentials: 'same-origin',
    method: 'GET',
    mode: 'no-cors',
  });

  fetch(imgurl).then((resp) => {
    console.log('External IMG mode: cors');
    console.log(resp.status); // 200
  });
  fetch(imgurl, { mode: 'no-cors' }).then((resp) => {
    console.log('External IMG mode: no-cors');
    console.log(resp.status); // 0
  });

  const jsonurl = `http://127.0.0.1:5500/local-sample.json`;
  fetch(jsonurl, { mode: 'cors' }).then((resp) => {
    console.log('Local JSON mode: cors');
    console.log(resp.status); // 200
  });
  fetch(jsonurl, { mode: 'no-cors' }).then((resp) => {
    console.log('Local JSON mode: no-cors');
    console.log(resp.status); // 0
  });
}


# Multiple Requests

// Multiple Request Management
// Talk to multiple servers

const jsonstr = 'https://random-data-api.com/api/v2/users?size=10';
const imgstr = 'https://picsum.photos/id/237/300/200';

// Create the function to make the Fetch request
// Get all data at the same time
// Promise object has a method - .Promise.all();
// .race() -> I will give an array of promises
// .allSettled() -> Give me the array when everything is succesfully done

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


# // How to abort a fetch call

const url = 'https://picsum.photos/id/237/3000/2000';

const controller = new AbortController();
const signal = controller.signal;

export function getData() {
  let abortBtn = document.getElementById('abort');
  abortBtn.addEventListener('click', (ev) => {
    controller.abort();
    console.log('aborted');
  });

  let request = new Request(url, {
    signal: signal,
  });
  fetch(request)
    .then((response) => {
      if (!response.ok) throw new Error('invalid');
      return response.blob();
    })
    .then((blob) => {
      console.log('got the blob');
    })
    .catch(console.warn);
}


# Progress

// measure the download progress of a file

const imgstr = 'https://picsum.photos/id/237/3000/2000'; //big image

export function getData() {
  //download a big image and measure the progress of the download
  fetch(imgstr).then(async (response) => {
    //create a reader to read the stream of data from the response body
    const reader = response.body.getReader();
    //get the length (size) of the file
    const contentLength = +response.headers.get('content-length');
    //how much data so far
    let receivedLength = 0;
    let chunks = [];
    console.group('progress');
    while (true) {
      const { done, value } = await reader.read();
      if (done) break; //exit if no more data
      chunks.push(value);
      receivedLength += value.length;
      console.log(`Received ${receivedLength} of ${contentLength}`);
    }
    console.groupEnd('progress');
    //combine all the data chunks into single byteArray
    let byteArray = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      byteArray.set(chunk, position);
      position += chunk.length;
    }
    //if it were a text file we could use
    //let txt = new TextDecoder('utf-8').decode(byteArray);
    //and then JSON.parse if it was a JSON string

    //for an image
    let blob = new Blob([byteArray], { type: 'image/jpg' });
    let url = URL.createObjectURL(blob);
    let img = document.getElementById('pic');
    img.src = url;
    img.alt = imgstr;
  });
}

