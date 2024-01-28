from flask import render_template, request, redirect, url_for, flash, jsonify
import base64
from app import app
from openai import OpenAI
from dotenv import load_dotenv
import os
import cohere

# Import any other necessary modules for processing the image


client = OpenAI(api_key='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')

load_dotenv()

@app.route('/chat2', methods=['POST'])
def message2():
    data = request.get_json()
    user_message = data.get('message', '')

    list_ingredients = ['eggs','milk','sugar','salt']
    location = 'India'
   
    time_period = ''

    str_ingre = ", ".join(x for x in list_ingredients)

    co = cohere.Client('1N08QPmkHODlsZ7zmEHc4BPSSsE4dxpgJfaWGBMT')

    promp= 'Generate a list of four recipes which would be nostalgic for someone from '+location+' in 2000s using the following list of ingredients '+str_ingre+'. '

    instructions = 'Make sure all dish names are formatted as <Bullet Number>. <Dish Name> - <Description>. Do not put the dish name in bold.'

    response = co.generate(prompt=promp+instructions)

    restext = response.generations[0]

    result = ""

    for y in ['1.','2.','3.','4.']:
        rec = restext.find(y)
        hypen = restext.find('-', rec, rec+40)
        print (restext[rec:hypen])
        result += restext[rec:hypen]

    print("-------------result")
    print(result)

    result += "Which recipe would you like to make? "


    print("final ------")
    print(result)

    return dict(botMessage = result)


@app.route('/chat3', methods=['POST'])
def message3():
    data = request.get_json()
    chat_history = data.get('chat_history', '')
    user_message = data.get('message', '')

    message = ""

    if (len(chat_history) == 2):
        message = 'Give me a nostalgic version of a recipe for '+user_message+". Include a detailed list of ingredients, approximate cooking time, cooking instructions and serving size"
    else:
        message = user_message

    co = cohere.Client('1N08QPmkHODlsZ7zmEHc4BPSSsE4dxpgJfaWGBMT')

   
    response2 = co.chat(
    chat_history= chat_history,
    message=message,
    connectors=[{"id": "web-search"}]
    )

    print(response2.text)

    return dict(botMessage = response2.text + "\n What else would you like to ask?")
 

@app.route('/chat', methods=['POST'])
def message():
    # Extract the message from the request
    data = request.json
    user_message = data['message']
    print(user_message)
    # Call the OpenAI API
    try:
        response = client.completions.create(
                    model="gpt-3.5-turbo-instruct",
                    prompt="Say this is a test",
                    max_tokens=7,
                    temperature=0
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
    print(output)

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

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    imageProcessed = data.get('imageData', '')
    imageProcessed = base64.b64decode(imageProcessed)

    result = image_processing(imageProcessed)
    
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