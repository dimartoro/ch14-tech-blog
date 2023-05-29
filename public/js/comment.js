const submitCommentHandler = async () => {
  const description = document.querySelector('#comment-description').value.trim();
  const post_id = document.querySelector('#postId').value.trim();
  const created_by = document.querySelector('#userId').value.trim();
  const response = await fetch('/api/comments/', {
    method: 'POST',
    body: JSON.stringify({description,created_by,post_id}),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/api/posts/'+post_id);
  } else {
    alert(response.statusText);
  }
};

function createComment(postId){
  document.location.replace('/api/post/'+postId+'/comment');
}

try{
document
.querySelector('.new-comment-form')
.addEventListener('submit', submitCommentHandler);
}catch{}

