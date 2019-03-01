from __future__ import absolute_import, print_function

from flask import Flask, render_template, request
from jinja2 import Environment, meta, exceptions
from random import choice
from inspect import getmembers, isfunction
from cgi import escape
import logging
import logging.handlers
import config

import json
import yaml

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


#Need a way to filter | tojson or jsonquery
# def get_custom_filters():
#     import filters
#     custom_filters = {}
#     for m in getmembers(filters):
#         if m[0].startswith('filter_') and isfunction(m[1]):
#             filter_name = m[0][7:]
#             custom_filters[filter_name] = m[1]

#     return custom_filters

def jsonfilter(*args):
    return args



@app.route("/")
def home():
    return render_template('index.html', token="App is running" )



@app.route('/convert', methods=['GET', 'POST'])
def convert():

    #DYNAMIC_PRESET_DATA make that as a placeholder
    
    jinja2_env = Environment()
    #jinja2_env.filters['jsonquery'] = jsonfilter("3")
   
    jinja2_env.filters['jsonquery'] = jsonfilter
    # #Load custom filters
    # custom_filters = get_custom_filters()
    # app.logger.debug('Add the following customer filters to Jinja environment: %s' % ', '.join(custom_filters.keys()))
    # jinja2_env.filters.update(custom_filters)



    json_request = request.get_json(force=True)

    # print(json_request)

    # print(request.form['template'])
    if request.method == "POST":
    # Load the template
        # print(json_request['request_info']['template'])

 
        #depending on flag that is set concat DYNAMIC_PRESET_DATA WORKFLOW_METADATA or MOVIE METADAta
        #Box that is for nomral templates and no Preset data tags?
        # #If there is no {{DYNAMIC_PRESET_DATA}} {{WORKFLOW_METADATA}} {{MOVIE_METADATA}}  in template it will hit an error.
        # try:
            
        #     if "DYNAMIC_PRESET_DATA" in json_request['request_info']['template']:           
        #         add_metadata = "{ \"DYNAMIC_PRESET_DATA\":"
        #     elif "WORKFLOW_METADATA" in json_request['request_info']['template']:
        #         add_metadata = "{ \"WORKFLOW_METADATA\":"
        #     elif "MOVIE_METADATA" in json_request['request_info']['template']:
        #         add_metadata = "{ \"MOVIE_METADATA\":"
        #     #Normal template?
    
        #     else:
        #         return "You are either using the wrong settings or there is an issue with your template... Please Check"
        # except KeyError:
        #     print("No Metadata exist")

        if json_request['request_info']['dynamic'] or json_request['request_info']['workflow'] or json_request['request_info']['movie']:
            
            if json_request['request_info']['dynamic']:
                sub_dynamic = "{ \"DYNAMIC_PRESET_DATA\":"
            if json_request['request_info']['workflow']:
                sub_workflow = "{ \"WORKFLOW_METADATA\":"
            if json_request['request_info']['movie']:
                sub_movie = "{ \"MOVIE_METADATA\":"
  
          
    
        #adding templates

        try:
          
            jinja2_tpl = jinja2_env.from_string(json_request['request_info']['template'])
           


           
           
        except (exceptions.TemplateSyntaxError, exceptions.TemplateError) as e:
        
            return "Syntax error in jinja2 template: {0}".format(e)

      
    
       
        values = {}
        
  
       
     
        if json_request['request_info']['input_type'] == "json":
                    
            try:

                #print("Here is metadata" + str(add_metadata))
                # try:
                #     if json_request['request_info']['flag'] == 'D' or json_request['request_info']['flag'] == 'W' or json_request['request_info']['flag'] == 'M': 
                #         values = str(add_metadata) + json_request['request_info']['values'] + "}"
                #         #concatentating the metadata here?
                #     else:
                #         values = json_request['request_info']['values']
                # except ValueError as e:
                #     return "You are either using the wrong settings or there is an issue with your template... Please Check"
                    
                   # values = json.loads(add_metadata+values)
                values = json_request['request_info']['regular']
                values = json.loads(values)
                print("Values:" + str(values))
            
            except ValueError as e:
                return " You have not put valid json in any boxes please check again" 
                #return "Value error in JSON: {0}".format(e)


        # If ve have empty var array or other errors we need to catch it and show
        try:
           
            rendered_jinja2_tpl = jinja2_tpl.render(values)
       
       
        except (exceptions.TemplateRuntimeError, ValueError, TypeError) as e:
            return "Error in your values input field: {0}".format(e)



            

        return rendered_jinja2_tpl
        
       


if __name__ == "__main__":
    # Set up logging
    app.logger.setLevel(logging.__getattribute__(config.LOGGING_LEVEL))
    file_handler = logging.handlers.RotatingFileHandler(filename=config.LOGGING_LOCATION, maxBytes=10*1024*1024, backupCount=5)
    file_handler.setFormatter(logging.Formatter(config.LOGGING_FORMAT))
    file_handler.setLevel(logging.__getattribute__(config.LOGGING_LEVEL))
    app.logger.addHandler(file_handler)

    app.run()