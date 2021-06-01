# Create with fetch

- When dealing with a fullstack application, we want to make sure that we POST any new set of data from the frontend to the backend so that we do not lose it on a refresh.  
- To do so, we will set up a form, make a fetch request upon submission, post the body to the API, get the object back as JSON and manipulate the DOM to reflect the new addition in preferred way

# Frontend 

- When making POST requests with fetch, we need to include 3 important things with our fetch request as options: `method`, `headers`, and `body`.  
