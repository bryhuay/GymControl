import React, { Component } from 'react';
import axios from '../../AxiosFiles/axios.js';
import { Redirect } from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class Registrar extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {

      
      id:props.match.params.id,
      description:'',
      price:'',
      date:'',
      

      collapse: true,
      fadeIn: true,
      timeout: 300
    };
    this.handleAttribute = this.handleAttribute.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRecord = this.getRecord.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  componentWillMount(){
  this.getRecord();
}
  handleAttribute(e){
    var attr = e.target.value;
    var attrName = e.target.id;
    this.setState({ [attrName]: attr });
  }
 getRecord = () => {


    const data = this.state;

    let url = 'registros/find?recordId='+ data.id;

    const params = {
      method: 'get',
      url: url,
      
   
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    };

    axios(params) 
    .then( (response) => {

          
      
      this.setState({
        description: response.data.record.description,
        price:response.data.record.price,
        date: response.data.record.date
        
        

      });
 
      console.log(response);
       
    })
    .catch( (response) => {
      //handle error
      alert("Error");
      console.log(response);
    });
  }


 
handleSubmit = (e) => {		

	e.preventDefault();	

		const data = this.state;

		let url = 'registros/update';
    

		const params = {
			method: 'post',
			url: url,
			data: {recordId:data.id ,description: data.description, price: data.price, date:data.date},
			headers: {
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		};

		axios(params)	
		.then( (response) => {
			//handle success
			let redirect = <Redirect to="/Ventas" />;
			this.setState({
				redirect: redirect
			});

			alert("Se edito correctamente la venta");
			console.log(response);
		})
		.catch( (response) => {
			//handle error
			alert("Error");
			console.log(response);
		});
	}

  render() {
    return (
      <div className="animated fadeIn">
        
        {this.state.redirect}
         
            <Card>
              <CardHeader>
                <strong>Venta</strong> 
              </CardHeader>
              
              <CardBody>
               
                   <Form onSubmit={this.onSubmit}  encType="multipart/form-data" className="form-horizontal">
                   <Row>
                   <Col>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Descripcion</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"  name="description" id="description" onChange={this.handleAttribute} value={this.state.description}/>
                      
                    </Col>
                  </FormGroup>
                  </Col>
                  <Col>
                  	<FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Total</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number"  name="price" id="price" onChange={this.handleAttribute} value={this.state.price}/>
                      
                    </Col>
                  </FormGroup>
                  </Col>
                  </Row>

                   
                   

                 </Form>
              </CardBody>
             <CardFooter>
                   <center>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"  ></i> Registrar venta</Button>
              
                </center>
              </CardFooter>
             
            </Card>
            
          
          
       
      </div>

    );
  }
}

export default Registrar;
