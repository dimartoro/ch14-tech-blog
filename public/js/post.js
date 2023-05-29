const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-description').value.trim();
  
    console.log(title, description );
    if (title && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to delete Post');
      }
    }
  };

  const editButtonHandler = async (caller) => {
    if (caller.hasAttribute('data-id')) {
      if(caller.innerHTML == "Edit"){
      const postId = caller.getAttribute('data-id');
      document.querySelector(`#divEdit${postId}`).classList.remove("hidden");
      caller.innerHTML = "Cancel";
      }else{
        const postId = caller.getAttribute('data-id');
        document.querySelector(`#divEdit${postId}`).classList.add("hidden");
        caller.innerHTML = "Edit";
      }
    }
  };

  const updateButtonHandler = async (caller) => {
    if (caller.hasAttribute('data-id')) {
      const id = caller.getAttribute('data-id');
      const description = document.querySelector('#editdescription'+id).value.trim();
      const response = await fetch('/api/posts/'+id, {
        method: 'PUT',
        body: JSON.stringify({description}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to update Post');
      }
    }
  };


  function showCreatePost(){
    var currentValue = document.querySelector("#btnShowCreatePost").textContent;
    if(currentValue == "Cancel"){
      document.querySelector("#divCreatePost").classList.add('hidden');
      document.querySelector("#btnShowCreatePost").textContent = "Create a New Post";
    }else{
      document.querySelector("#divCreatePost").classList.remove('hidden');
      document.querySelector("#btnShowCreatePost").textContent = "Cancel";
    }
  }
  
  try{
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  }catch{};
  
  try{document
    .querySelector('.delete-post')
    .addEventListener('click', delButtonHandler);
  }catch{};

  // try{document
  //   .querySelector('.edit-post')
  //   .addEventListener('click', editButtonHandler);
  // }catch{};

  try{document
    .querySelector('.update-post')
    .addEventListener('click', updateButtonHandler);
  }catch{};

  try{document
    .querySelector('#btnShowCreatePost')
    .addEventListener('click', showCreatePost);
  }catch{};
