document.addEventListener('DOMContentLoaded', function () {
    // Initial load: Display existing posts or encourage the user to create one
    fetchPosts();
});

// Function to display posts
function displayPosts(posts) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (posts.length === 0) {
        contentDiv.innerHTML = '<p>No posts available. Create one!</p>';
    } else {
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.textContent = post.userName;

            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.textContent = post.message;

            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            post.comments.forEach(comment => {
                const commentText = document.createElement('p');
                commentText.textContent = `${comment.userName}: ${comment.message}`;
                commentDiv.appendChild(commentText);
            });

            postDiv.appendChild(userDiv);
            postDiv.appendChild(messageDiv);
            postDiv.appendChild(commentDiv);

            contentDiv.appendChild(postDiv);
        });
    }
}

// Function to display loader
function showLoader() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<div class="loader"></div>';
}

// Function to handle post creation
function createPost() {
    const userName = document.getElementById('user-name').value;
    const message = document.getElementById('post-message').value;

    if (userName && message) {
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, message }),
        })
        .then(response => response.json())
        .then(newPost => {
            fetchPosts();
        });
    } else {
        alert('Please enter both user name and message.');
    }
}

// Function to handle searching
function searchPosts() {
    const searchPhrase = document.getElementById('search-input').value;

    if (searchPhrase) {
        showLoader();
        fetch(`/search/${searchPhrase}`)
        .then(response => response.json())
        .then(searchResults => {
            displayPosts(searchResults);
        });
    } else {
        alert('Please enter a search phrase.');
    }
}

// Function to fetch all posts
function fetchPosts() {
    showLoader();
    fetch('/posts')
    .then(response => response.json())
    .then(posts => {
        displayPosts(posts);
    });
}

// Event listener for creating a new post
document.getElementById('create-post-btn').addEventListener('click', createPost);

// Event listener for searching posts
document.getElementById('search-btn').addEventListener('click', searchPosts);
