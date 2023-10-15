// Store url on a variable
const string = 'https://jsonplaceholder.typicode.com/users';


//Create a function
async function getData(){
    // Make a Fetch Call
    const url = new URL(string);
    const request = new Request(url, {
        headers: { 'x-endri': 'hello'},
        method: 'GET',
        cache: 'no-store'
    });

    fetch(request)
    .then((resp)=>{
        return resp.json();
    })
    .then((data)=>{
        console.log(data);
    })
    .catch((error)=> console.log(error));
    
}


getData();