// Function to handle file upload
function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        fileList.appendChild(listItem);
    }

    // You can send the uploaded files to the server for storage
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server (e.g., display success message or handle errors)
    })
    .catch(error => {
        // Handle any errors
    });
}

// Function to handle file deletion
function handleFileDelete(fileId) {
    // Send a request to the server to delete the file with the given ID
    fetch(`/delete/${fileId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server (e.g., update the file list)
    })
    .catch(error => {
        // Handle any errors
    });
}

// Event listener for the upload button
const uploadButton = document.getElementById('uploadButton');
uploadButton.addEventListener('click', handleFileUpload);
