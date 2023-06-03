const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log(response);
  
      if (response.ok) {
        document.location.replace('/api/posts');
      } else {
        alert("Your email, password or both are wrong!");
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(password.length < 8){
      alert("Password must be at least 8 characters long!");
      return;
    }    
  
    if (name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/api/posts');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  try{
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  }catch{
    
  }

  try{
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  }catch{

  }
  