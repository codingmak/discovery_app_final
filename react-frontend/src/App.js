import React, { Component } from 'react';

import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = { 
        data: '',
        isLoading: false,
        
        value: ' ', 
        value2: ' ',
        dummy_values: false,
       
        };
        


        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.click = this.click.bind(this);

        

    }

      

 click() {
        //what to send over to flask:
   /*     template: $('#template').val(),
            console.log($('#template').val())
            values: $('#values').val(),
            input_type: input_type,

            //boolean
            showwhitespaces: is_checked_showwhitespaces,
            dummyvalues: is_checked_dummyvalues*/
        var headers = {
            'Content-Type': 'application/json',
           
        }


        const request_info = {
            template: this.state.value,
            values: this.state.value2,
            input_type: "json",
         
            dummy_values: this.state.dummy_values,
        }

        this.setState({ isLoading: true });





        axios.post("http://localhost:5000/convert", {request_info}, {headers: headers})
            .then((response) => {
                  this.setState({ data: response.data, isLoading: false });
                     
                   console.log(request_info)
             })
            .catch((err) => {
                  this.setState({ data: err, isLoading: false });
                  
                   console.log(request_info)
             });
    }




  handleChange(event) {
    this.setState({value: event.target.value});
  }


  handleChange2(event) {
     this.setState({value2: event.target.value});
  }


  toggleDummy(event) {
   this.setState({dummy_values: !this.state.dummy_values});
}

  handleSubmit(event) {
    event.preventDefault();
}
    


    


  
  render() {


    return (
      <div className="App">
      
          <p>
          {window.token}



          </p>


        
    <form class="container">
        <div class="row">
            <div class="col-md-5">
                <h1>Template</h1>
              
               <textarea id="template" placeholder=" Hello {{name}}! {% if test -%} How are you?{%- endif %}" onChange={this.handleChange.bind(this)}/>
            </div>
            <div class="col-md-5">
                <h1>Render</h1>
       
                <div id="render"> {this.state.loading || !this.state.data? <div id="render">Press Convert...</div> : <div>{this.state.data.toString().replace(/•/g, " ")}</div>}</div>
      
            </div>
            
        </div>

         <div class="row">
            <div class="col-md-5">
                <h1>Values</h1>
                <textarea id="values" placeholder={" {\"name\": \"John\", \"test\": true }"}  onChange={this.handleChange2.bind(this)}></textarea>
            </div>
          
        <div class="col-md-5">
     
                <div id="settings">
                    
                 
                    <h1> JSON</h1>
                    
                     <label><input type="checkbox" name="dummyvalues"  onClick={this.toggleDummy.bind(this)} /> Use dummy values</label>

                     <div>
                        <input type="button" class="btn btn-success" id="convert" value="Convert" onClick={this.click} disabled={this.state.isLoading}/>
                       
                        <input type="button" class="btn btn-danger" id="clear" value="Clear" />
                    </div>
                </div>
            </div>
  
        </div>
    
    </form>

      </div>
    );
  }
}




