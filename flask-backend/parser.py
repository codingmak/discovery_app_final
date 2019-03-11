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

import jmespath
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



def jsonfilter(arg1,arg2):
    
  
 
    output_dict = jmespath.search(arg2,arg1)
    if output_dict is None:
        return "\n\n[!] Please check your json values again....\n"
    else:
        print(type(arg1),arg1,type(arg2),arg2)
        return output_dict
        






@app.route("/")
def home():
    return render_template('index.html', token="" )



@app.route('/convert', methods=['GET', 'POST'])
def convert():

    #DYNAMIC_PRESET_DATA make that as a placeholder
    #This is a filter
    jinja2_env = Environment()
   
   
    jinja2_env.filters['jsonquery'] = jsonfilter



    json_request = request.get_json(force=True)

  
    if request.method == "POST":
   
        sub_dynamic = " "
        sub_workflow = " "
        sub_movie = " "

        if json_request['request_info']['template'] == " ":
            return "[!] Template is Empty"



        if json_request['request_info']['dynamic'] or json_request['request_info']['workflow'] or json_request['request_info']['movie']:
            
            if json_request['request_info']['dynamic']:      
                sub_dynamic = "{\"DYNAMIC_PRESET_DATA\":"
            if json_request['request_info']['workflow']:     
                sub_workflow = "{\"WORKFLOW_METADATA\":"
            if json_request['request_info']['movie']:
                sub_movie = "{\"MOVIE_METADATA\":"

    
        #adding templates

        try:
           
            jinja2_tpl = jinja2_env.from_string(json_request['request_info']['template'])
           


           
           
        except (exceptions.TemplateSyntaxError, exceptions.TemplateError) as e:
        
            return "[!] Syntax error in jinja2 template: {0}".format(e)

      


    
       
        values = {}
        
  
     
        if json_request['request_info']['input_type'] == "json":
                    
            try:


                if 'DYNAMIC_PRESET_DATA' in json_request['request_info']['template']:

                    value = sub_dynamic + json_request['request_info']['dynamic'] + "}"
                    
                   
                 
                    values1 = json.loads(value)
               
                    values.update(values1)

                
              



                    
            except ValueError as e:
                return "[!] You have not put valid json in DYNAMIC_PRESET_DATA box please check again"     
       


            try:

                if 'WORKFLOW_METADATA' in json_request['request_info']['template']:
                    value = sub_workflow + json_request['request_info']['workflow'] + "}"
                   
                    values2 = json.loads(value)
            
                    values.update(values2)



            except ValueError as e:
                return "[!] You have not put valid json in WORKFLOW_METADATA box please check again" 


              

                if 'WORKFLOW_METADATA' not in json_request['request_info']['template']:
                    value = json_request['request_info']['workflow']
                    values2 = json.loads(value)
                    values.update(values2)
          
                
           
             


            try:


                if 'MOVIE_METADATA' in json_request['request_info']['template']:
                    
                    value = sub_movie + json_request['request_info']['movie'] + "}"
                
                    values3 = json.loads(value)
                    
                    values.update(values3)

            except ValueError as e:
                return "[!] You have not put valid json in MOVIE_METADATA box please check again"

      

                if 'MOVIE_METADATA' not in json_request['request_info']['template']:
                    value = json_request['request_info']['movie']
                    values3 = json.loads(value)
                    values.update(values3)


            try:
                
                
                if json_request['request_info']['other'] == "" or "{" not in json_request['request_info']['other']:
                   value = "{\"\":\"\"\}"
                else:  

                    value = json_request['request_info']['other'] 
                  
                    values4 = json.loads(value)
                        
                    values.update(values4)

            except ValueError as e:
                return "[!] You have not put valid json in \"OTHER box\" please check again"

                
         

           
        try:

      
          
            
            rendered_jinja2_tpl = jinja2_tpl.render(values)
   
       
        except (exceptions.TemplateRuntimeError, ValueError, TypeError, KeyError) as e:
            return "[!] Error in your values input field: {0}".format(e)



            


        return rendered_jinja2_tpl
        
       


if __name__ == "__main__":
    # Set up logging
    app.logger.setLevel(logging.__getattribute__(config.LOGGING_LEVEL))
    file_handler = logging.handlers.RotatingFileHandler(filename=config.LOGGING_LOCATION, maxBytes=10*1024*1024, backupCount=5)
    file_handler.setFormatter(logging.Formatter(config.LOGGING_FORMAT))
    file_handler.setLevel(logging.__getattribute__(config.LOGGING_LEVEL))
    app.logger.addHandler(file_handler)

    app.run(host="0.0.0.0")
