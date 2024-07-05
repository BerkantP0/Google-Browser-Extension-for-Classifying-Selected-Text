# Google-Browser-Extension-for-Classifying-Selected-Text-NLP
# Setting Up a Chrome Extension with Local API

This project demonstrates how to set up a Chrome extension that interacts with a local API using Python.

## Project Setup

### Files Required

Ensure the following files are placed in a directory:

- `app.py`: Python script for the local API.
- `content.js`: JavaScript content script for the Chrome extension.
- `manifest.json`: Manifest file that defines the extension.
- `model.h5`: Example model file (replace with your actual model file).
- `veriseti.csv`: Example dataset file (replace with your actual dataset).

### Chrome Extension Installation

1. Open Chrome and navigate to `chrome://extensions/`.

2. Enable Developer Mode:
   - Toggle the switch on the top right corner to enable Developer Mode.

3. Load the extension:
   - Click on "Load unpacked" on the top left.
   - Select the directory containing your files.

4. Activate the extension:
   - Once loaded, you should see your extension icon in the Chrome toolbar.

## Running the Local API

1. Open a terminal or command prompt.

2. Navigate to the directory where `app.py` is located:
   ```sh
   cd path/to/your/directory
