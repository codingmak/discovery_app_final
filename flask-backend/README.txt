
#Please read 

***Running from python file:
1) Install: python3
2) pip3 install -r requirements.txt && python3 parser.py


***Running with Docker:
docker build -t [myimage] . && docker run -it [myimage]

Note:

1) Make sure to add double quotes to your json and not single quotes or it will be considered invalid json.
2) If your template does not contain DynamicPresetData, WorkflowMetadata or MovieMetadata be sure to use the "Other" box.
