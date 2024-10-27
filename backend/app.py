# app.py
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from io import BytesIO
from flask import Flask, request, jsonify, send_file
from satellite_processing import process_image
from flask_cors import CORS, cross_origin
import numpy as np
app = Flask(__name__)
cors = CORS(app)


# app.py


@app.route('/process-image', methods=['POST'])
def process_image_route():
    image_data = request.files['image']
    ndvi_image = process_image(image_data)

    # Save the NDVI image to a BytesIO object
    img_io = BytesIO()
    ndvi_image.save(img_io, 'PNG')
    img_io.seek(0)

    # Send the image back to the client
    return send_file(img_io, mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True)
