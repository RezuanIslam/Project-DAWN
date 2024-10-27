# from flask_socketio import SocketIO, emit
import satellite_processing as sp
from flask import Response
import numpy as np
from ultralytics import YOLO
# import cvzone
import cv2
import random
from flask import Flask, request, jsonify, send_file
import tensorflow as tf
from keras.preprocessing import image
from flask_cors import CORS, cross_origin
from flask import request
import math
import pickle
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from io import BytesIO

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.debug = True
class_name = [
    'Apple Apple scab',
    'Apple Black rot',
    'Apple Cedar apple rust',
    'Apple healthy',
    'Blueberry healthy',
    'Cherry (including sour) healthy',
    'Cherry (including sour) Powdery mildew',
    'Corn (maize) Cercospora leaf spot Gray leaf spot',
    'Corn (maize) Common rust',
    'Corn (maize) healthy',
    'Corn (maize) Northern Leaf Blight',
    'Grape Black rot',
    'Grape Esca (Black Measles)',
    'Grape healthy',
    'Grape Leaf blight (Isariopsis Leaf Spot)',
    'Orange Haunglongbing (Citrus greening)',
    'Peach Bacterial spot',
    'Peach healthy',
    'Pepper, bell Bacterial spot',
    'Pepper, bell healthy',
    'Potato Early blight',
    'Potato healthy',
    'Potato Late blight',
    'Raspberry healthy',
    'Soybean healthy',
    'Squash Powdery mildew',
    'Strawberry healthy',
    'Strawberry Leaf scorch',
    'Tomato Bacterial spot',
    'Tomato Early blight',
    'Tomato healthy',
    'Tomato Late blight',
    'Tomato Leaf Mold',
    'Tomato Septoria leaf spot',
    'Tomato Spider mites Two spotted spider mite',
    'Tomato Target Spot',
    'Tomato Tomato mosaic virus',
    'Tomato Tomato Yellow Leaf Curl Virus'
]


@app.route('/plant-disease-detection', methods=['POST'])
def plantDiseaseDetection():
    model = tf.keras.models.load_model(
        "../../models/plant_disease_detection.h5")
    imagefile = request.files['image']
    filepath = "tmp/temp.jpg"
    imagefile.save(filepath)
    i = tf.keras.utils.load_img(filepath, target_size=(224, 224))
    i = tf.keras.utils.img_to_array(i)
    i = i.reshape(1, 224, 224, 3)
    p = model.predict(i)
    oi = class_name[p.argmax()]
    score = math.floor(float(p[0].max()) * 100)
    return jsonify({'class': oi, 'confidence': score})


plant_growth_stages = ['Flowering', 'Fruit Development', 'Germination',
                       'Pollination', 'RipeningMaturation', 'Seedling/Establishment', 'Vegetative Growth']


@app.route('/plantgrowthstage', methods=['POST'])
def plantGrowthStage():
    model = tf.keras.models.load_model("../../models/plant_growth_stage.h5")
    imagefile = request.files['image']
    filepath = "tmp/temp.jpg"
    imagefile.save(filepath)
    i = tf.keras.utils.load_img(filepath, target_size=(64, 64))
    i = tf.keras.utils.img_to_array(i)
    i = i.reshape(1, 64, 64, 3)
    p = model.predict(i)
    oi = plant_growth_stages[p.argmax()]
    score = math.floor(float(p[0].max()) * 100)
    return jsonify({'class': oi, 'confidence': score})


@app.route('/croprecommendation', methods=['POST'])
def cropRecommendation():
    with open('../../models/NaiveBayes.pkl', 'rb') as file:
        loaded_model = pickle.load(file)
    prediction = loaded_model.predict(
        [[float(request.form['n']), float(request.form['p']), float(request.form['k']), float(request.form['temperature']), float(request.form['humidity']), float(request.form['ph']), float(request.form['rainfall'])]])

    return jsonify({'class': str(prediction[0])})


@app.route('/cropyieldprediction', methods=['POST'])
def cropYieldPrediction():
    with open('../../models/RF.pkl', 'rb') as file:
        loaded_model = pickle.load(file)
    prediction = loaded_model.predict(
        [[float(request.form['Soil pH']), float(request.form['Temperature']), float(request.form['Precipitation']), float(request.form['Sunlight Exposure']), float(request.form['Fertilizer Usage'])]])

    return jsonify({'class': str(prediction[0])})


fertilizer_names = ['Urea', 'DAP', '14-35-14', '28-28', '17-17-17', '20-20',
                    '10-26-26']


@app.route('/fertilizerrecommendation', methods=['POST'])
def fertilizerRecommendation():
    with open('../../models/svm_pipeline.pkl', 'rb') as file:
        loaded_model = pickle.load(file)

    prediction = loaded_model.predict(
        [[float(request.form['Temparature']), float(request.form['Humidity']), float(request.form['Moisture']), random.randint(1, 11), random.randint(1, 5), float(request.form['Nitrogen']), float(request.form['Potassium']), float(request.form['Phosphorous'])]])

    return jsonify({'class': fertilizer_names[prediction[0]]})


pest = ['aphids', 'armyworm', 'beetle', 'bollworm',
        'grasshopper', 'mites', 'mosquito', 'sawfly', 'stem_borer']


@app.route('/pest-detection', methods=['POST'])
def pestDetection():
    model = tf.keras.models.load_model("../../models/pest_detection.h5")
    imagefile = request.files['image']
    filepath = "tmp/temp.jpg"
    imagefile.save(filepath)
    i = tf.keras.utils.load_img(filepath, target_size=(224, 224))
    i = tf.keras.utils.img_to_array(i)
    i = i.reshape(1, 224, 224, 3)
    p = model.predict(i)
    oi = pest[p.argmax()]
    score = math.floor(float(p[0].max()) * 100)
    return jsonify({'class': oi, 'confidence': score})


@app.route('/process-image', methods=['POST'])
def process_image_route():
    image_data = request.files['image']
    ndvi_image = sp.process_image(image_data)

    # Save the NDVI image to a BytesIO object
    img_io = BytesIO()
    ndvi_image.save(img_io, 'PNG')
    img_io.seek(0)

    # Send the image back to the client
    return send_file(img_io, mimetype='image/png')


@app.route('/soil-moisture-map', methods=['POST'])
def yo():
    image_data = request.files['image']
    ndvi_image = sp.process_soil_moisture(image_data)

    # Save the NDVI image to a BytesIO object
    img_io = BytesIO()
    ndvi_image.save(img_io, 'PNG')
    img_io.seek(0)

    # Send the image back to the client
    return send_file(img_io, mimetype='image/png')


@app.route('/evi', methods=['POST'])
def evi():
    image_data = request.files['image']
    ndvi_image = sp.process_evi_rgb(image_data)

    # Save the NDVI image to a BytesIO object
    img_io = BytesIO()
    ndvi_image.save(img_io, 'PNG')
    img_io.seek(0)

    # Send the image back to the client
    return send_file(img_io, mimetype='image/png')


@app.route('/gli', methods=['POST'])
def gli():
    image_data = request.files['image']
    ndvi_image = sp.process_gli(image_data)

    # Save the NDVI image to a BytesIO object
    img_io = BytesIO()
    ndvi_image.save(img_io, 'PNG')
    img_io.seek(0)

    # Send the image back to the client
    return send_file(img_io, mimetype='image/png')


@app.route('/vari', methods=['POST'])
def vari():
    image_data = request.files['image']
    ndvi_image = sp.process_vari(image_data)

    # Save the NDVI image to a BytesIO object
    img_io = BytesIO()
    ndvi_image.save(img_io, 'PNG')
    img_io.seek(0)

    # Send the image back to the client
    return send_file(img_io, mimetype='image/png')


@app.route('/exg', methods=['POST'])
def exg():
    image_data = request.files['image']
    ndvi_image = sp.process_exg(image_data)

    # Save the NDVI image to a BytesIO object
    img_io = BytesIO()
    ndvi_image.save(img_io, 'PNG')
    img_io.seek(0)

    # Send the image back to the client
    return send_file(img_io, mimetype='image/png')
