from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import tensorflow as tf
import pandas as pd

# Initialize Flask application
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the model
model = load_model('newmodel.h5')

# Load the dataset
df = pd.read_csv('dataset.csv')

from tensorflow.keras.layers import TextVectorization

# Define the text vectorization layer
X = df['text']
y = df[df.columns[3:]].values

MAX_FEATURES = 200000  # Number of words in the vocabulary

# Define a custom standardization function to preprocess the text
def custom_standardization(input_text):
    input_text = tf.strings.lower(input_text)
    input_text = tf.strings.regex_replace(input_text, '[^a-zA-Z0-9 ]', '')
    return input_text

# Define the TextVectorization layer
vectorizer = TextVectorization(max_tokens=MAX_FEATURES,
                               output_sequence_length=1800,
                               output_mode='int',
                               standardize=custom_standardization)

# Adapt the vectorizer to the dataset
vectorizer.adapt(X.values)
vectorized_text = vectorizer(X.values)

# Define API endpoint
@app.route('/classify', methods=['POST'])
def classify_text():
    # Get the request data in JSON format
    data = request.get_json()
    
    # Extract text data
    text = data['text']
    
    # Vectorize the text
    vectorized_text = vectorizer([text])
    
    # Make predictions using the model
    prediction = model.predict(vectorized_text)
    
    # Interpret and classify the prediction results
    text = ''
    for idx, col in enumerate(df.columns[3:]):
        text += '{}: {} '.format(col, prediction[0][idx] > 0.5)
    
    # Return the result and prediction probabilities in JSON format
    return jsonify({
        'prediction': text
    })

if __name__ == '__main__':
    # Run the application
    app.run(debug=True)
