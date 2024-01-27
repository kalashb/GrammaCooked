from flask import render_template, request, redirect, url_for, flash, jsonify
import base64
from app import app
import openai

# Import any other necessary modules for processing the image

openai.api_key = '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'

@app.route('/chat', methods=['POST'])
def message():
    # Extract the message from the request
    data = request.json
    user_message = data['message']

    # Call the OpenAI API
    try:
        response = openai.Completion.create(
            engine="text-davinci-004",
            prompt=user_message,
            max_tokens=150
        )
        ai_message = response.choices[0].text.strip()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Return the AI's response
    return jsonify({'message': ai_message})


def image_processing(bytes):

##################################################################################################
# In this section, we set the user authentication, user and app ID, model details, and the URL
# of the image we want as an input. Change these strings to run your own example.
#################################################################################################

# Your PAT (Personal Access Token) can be found in the portal under Authentification
    PAT = '1b385ee79c8640d3aec070d933ba835a'
    # Specify the correct user_id/app_id pairings
    # Since you're making inferences outside your app's scope
    USER_ID = 'arahank'
    APP_ID = 'app1'
    # Change these to whatever model and image URL you want to use
    MODEL_ID = 'food-item-recognition'
    MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044'
    #IMAGE_URL = 'https://www.allrecipes.com/thmb/CVDJa_JNexHs6-m3kDj2N9GmWnw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ingredients-Stored-Incorrectly-In-Fridge-2x1-1-9c84891a47694b049e26debb550a8977.png'
    ############################################################################
    # YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ############################################################################

    from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
    from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
    from clarifai_grpc.grpc.api.status import status_code_pb2

    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)

    metadata = (('authorization', 'Key ' + PAT),)

    userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

    # with open(IMAGE_FILE_LOCATION, "rb") as f:
    #     file_bytes = f.read()

    post_model_outputs_response = stub.PostModelOutputs(
    service_pb2.PostModelOutputsRequest(
        user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
        model_id=MODEL_ID,
        version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(
                    image=resources_pb2.Image(
                        base64=bytes
                    )
                )
            )
        ]
    ),
    metadata=metadata
    )

    
    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

    # Since we have one input, one output will exist here
    output = post_model_outputs_response.outputs[0]
    # print(output)

    result = []
    # print("Predicted concepts:")
    for concept in output.data.concepts:
        print("%s %.2f" % (concept.name, concept.value))
        result.append(dict(ingredient=concept.name, value=concept.value))

    # print(type(output.data.concepts))

    return result

    # Uncomment this line to print the full Response JSON
    #print(output)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'ingredient_image' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['ingredient_image']
        
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        
        if file and allowed_file(file.filename):
            # To save the file, you can use file.save()
            # For example: file.save(os.path.join('/path/to/the/uploads', filename))
            # Process the file and generate the recipe
            pass

    return render_template('index.html')

@app.route('/generate', methods=['OPTIONS'])
def generate():
    data = request.get_json()
    imageProcessed = data.get('imageData', '')
    imageProcessed = base64.b64decode(imageProcessed)

    result = image_processing(imageProcessed)
    result.headers.add('Access-Control-Allow-Origin', '*')
    print(result)
    return result
    

# You can use this function to validate allowed file extensions
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/chat')
def chat():
    return render_template('chat.html')