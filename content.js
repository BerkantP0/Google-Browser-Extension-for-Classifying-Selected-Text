document.addEventListener('mouseup', function(event) {
  var selectedText = window.getSelection().toString().trim(); // Get the text selected by the user

  // Remove existing popup if any
  var existingPopup = document.getElementById('customPopup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup if selected text is not empty
  if (selectedText !== '') {
    var range = window.getSelection().getRangeAt(0); // Get the selection range
    var rect = range.getBoundingClientRect(); // Get the bounding rectangle of the selection

    // Create popup at bottom right corner of the text
    var popupDiv = document.createElement('div');
    popupDiv.id = 'customPopup';
    popupDiv.style.position = 'fixed';
    popupDiv.style.left = rect.right + 'px'; // Right edge of the selection
    popupDiv.style.top = rect.bottom + 'px'; // Bottom edge of the selection
    popupDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    popupDiv.style.border = '1px solid black';
    popupDiv.style.padding = '10px';

    // Send selected text to API
    fetch('http://127.0.0.1:5000/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: selectedText })
    })
    .then(response => {
      // Successful request to the API
      if (response.ok) {
        console.log("Request sent to API successfully.");
        return response.json(); // Get response as JSON
      } else {
        console.log("Error sending request to API.");
        throw new Error('API request failed.');
      }
    })
    .then(data => {
      // Process the response from the API
      console.log('API response:', data);

      // Generate appropriate message if text contains harmful content
      var message;
      if (data.prediction.includes("prof: True")) {
        message = "Content contains profanity or explicit language: " + selectedText;
      } else if (data.prediction.includes("grp: True")) {
        message = "Content is aggressive or offensive towards a group. For example, targeting a specific ethnic group, gender, or belief: " + selectedText;
      } else if (data.prediction.includes("indv: True")) {
        message = "Content is aggressive or offensive towards an individual. It targets or includes negative statements about a specific person: " + selectedText;
      } else if (data.prediction.includes("oth: True")) {
        message = "Content is aggressive or offensive towards another entity or event. Typically targeting a non-human entity or organization: " + selectedText;
      } else {
        message = "No harmful content detected in the text: "+ selectedText;
      }

      // Create popup content
      popupDiv.textContent = message;
      document.body.appendChild(popupDiv);

      // Send text and API response to background
      chrome.runtime.sendMessage({ type: 'showPopup', selectedText: selectedText, apiResponse: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});
