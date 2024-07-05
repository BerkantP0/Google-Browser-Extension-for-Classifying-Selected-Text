# Google Extension That Classifies Selected Turkish Text Based On Toxicity

This project involves developing a Google Chrome extension that allows users to classify selected text on web pages. The extension leverages machine learning algorithms to analyze the content and categorize it based on predefined criteria such as sentiment, topic, or presence of hate speech. Users can select any text segment on a webpage, and the extension will provide real-time classification results, enhancing the browsing experience by offering immediate insights into the nature of the content.

## Setting Up a Chrome Extension with Local API


## Dataset
[Toxic Comment Detection Multilingual [Extended]](https://www.kaggle.com/datasets/alansun17904/toxic-comment-detection-multilingual-extended)

### Files Required

Ensure the following files are placed in a directory:

- `app.py`: Python script for the local API.
- `content.js`: JavaScript content script for the Chrome extension.
- `manifest.json`: Manifest file that defines the extension.
- `model.h5`: Example model file (replace with your actual model file).
- `dataset.csv`: Example dataset file (replace with your actual dataset).

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
