from flask import Flask, request
import json
app = Flask(__name__)
@app.route('/submit', methods=['POST'])
def submit_form():
    form_data = request.get_json()
     # Store the form data in a file or database
    # Example: storing in a file
    with open('form_data.txt', 'a') as file:
        file.write(json.dumps(form_data) + '\n')
    return 'Form submitted successfully'
if __name__ == '__main__':
    app.run()