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


