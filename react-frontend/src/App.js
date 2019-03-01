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
        flag: ' ',
        value1: ' ', 
        value2: ' ',
        value3: ' ',
        value4: ' ',
        value5: ' ',
        dummy_values: false,

        };
        //for reset
        this.baseState = this.state 



        this.handleSubmit = this.handleSubmit.bind(this);
        this.click = this.click.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        
        
    }

  resetForm = () => {
    this.setState(this.baseState)
  }     



 click() {
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
            template: this.state.value1,
            //reg
            regular: this.state.value2 ,
            //dyn
            dynamic: this.state.value3,
            workflow: this.state.value4,
            movie: this.state.value5,

            input_type: "json",
            //depends on what is selected will send either DYNAMIC, WORKFLOW or MOVIE
            flag: this.state.flag,
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



  handleRadioChange(src) {
    this.setState({flag: src});
     console.log(`You chose${src} `);
  }


  handleChange1(event) {
    this.setState({value1: event.target.value});
  }


  handleChange2(event) {
     this.setState({value2: event.target.value});
  }
 handleChange3(event) {
     this.setState({value3: event.target.value});
  }

 handleChange4(event) {
     this.setState({value4: event.target.value});
  }

 handleChange5(event) {
     this.setState({value5: event.target.value});
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
            <h2>Template</h2>
            <textarea id="template" value={this.state.value1} placeholder=" Hello {{name}}! {% if test -%} How are you?{%- endif %}" onChange={this.handleChange1.bind(this)}/>
            
         </div>

         <div class="col-md-5">
         <h2>Render</h2>
         <div id="render"> {this.state.loading || !this.state.data ? < div id="render"></div> : <div>{this.state.data.toString().replace(/•/g, " ")}</div>}
         </div>

         <div class="col-md-2">
           <input type="button" class="btn btn-success" id="convert" value="Convert" onClick={this.click} disabled={this.state.isLoading}/>
           <input type="button" class="btn btn-danger" id="clear" value="Clear" onClick={this.resetForm}/>
         </div>
      </div>


</div>
  <div class="row">
   <div class="col-md-5">
      <h2>Regular</h2>
      <textarea id="values" value={this.state.value2} placeholder={"{\"name\": \"John\", \"test\": true }"}  onChange={this.handleChange2.bind(this)}></textarea>
   </div>
   <div class="col-md-5">
      <h2>DYNAMIC_PRESET_DATA</h2>
      <textarea id="values" value={this.state.value3} placeholder={" \"DYNAMIC_PRESET_DATA\" : {\"name\": \"John\", \"test\": true }"}  onChange={this.handleChange3.bind(this)}></textarea>
   </div>
   <div class="col-md-5">
      <h2>WORKFLOW_METADATA</h2>
      <textarea id="values" value={this.state.value4}  placeholder={" \"WORKFLOW_METADATA\" : {\"name\": \"John\", \"test\": true }"}  onChange={this.handleChange4.bind(this)}></textarea>
   </div>
   <div class="col-md-5">
      <h2>MOVIE_METADATA</h2>
      <textarea id="values" value={this.state.value5} placeholder={" \"MOVIE_METADATA\" : {\"name\": \"John\", \"test\": true }"}  onChange={this.handleChange5.bind(this)}></textarea>
   </div>
</div>
</form>
</div>
    );
  }
}

