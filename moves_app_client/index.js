// fetch request 


fetch(url)
    .then(resp => resp.json())
    .then(data => otherFunction(data))

fetch(url)
    .then(resp => resp.json())
    .then(data => {

        // do something with data
    })
    
fetch(url, {
    method: 'GET', 
    headers: {
        
    }
})
    .then(resp => resp.json())
    .then(otherFunction)

// fetch returns a promise 
// .then is a method available to the promise class
// .json() returns a promise
// .then called on second promise, exposes our data we requested

data = {
    attributes: {

    }
}