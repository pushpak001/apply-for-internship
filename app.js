// Client ID and API key from the Developer Console
const CLIENT_ID = '388849016301-rrl16rtepmf4hm3gida9ih8ro1jjk3nj.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD2oqY7nEu3LjTCvJS372aFiBscxz5sbDw';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// Upload Resume function
function uploadResume(file) {
    const metadata = {
        'name': file.name,
        'mimeType': file.type
    };
    const accessToken = gapi.auth.getToken().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
        body: form
    })
    .then((response) => response.json())
    .then(function(data) {
        console.log('File ID: ' + data.id);
        alert('Resume uploaded successfully!');
    })
    .catch(function(error) {
        console.error('Error uploading resume:', error);
        alert('Error uploading resume!');
    });
}

// On load function
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Init API client library and set up sign-in listeners
function initClient() {
    gapi.client.init({
        apiKey: AIzaSyD2oqY7nEu3LjTCvJS372aFiBscxz5sbDw,
        clientId: 388849016301-rrl16rtepmf4hm3gida9ih8ro1jjk3nj.apps.googleusercontent.com,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

// Update UI sign-in state changes
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        // Enable submit button
        const submitBtn = document.querySelector('input[type="submit"]');
        submitBtn.disabled = false;
    } else {
        // Disable submit button
        const submitBtn = document.querySelector('input[type="submit"]');
        submitBtn.disabled = true;
    }
}

// Form submit listener
const form = document.getElementById('internship-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('resume');
    const file = fileInput.files[0];
    uploadResume(file);
});
