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

      
      name:'',
      last_name:'',
      start: '',
      end: '',
      state: '',
      description:'',
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
    this.handleAttribute = this.handleAttribute.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handleAttribute(e){
    var attr = e.target.value;
    var attrName = e.target.id;
    this.setState({ [attrName]: attr });
  }

 
handleSubmit = (e) => {		

	e.preventDefault();	

		const data = this.state;

		let url = 'miembros/';

		const params = {
			method: 'post',
			url: url,
			data: {name: data.name ,last_name: data.last_name, start: data.start, end: data.end, state: data.state},
			headers: {
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		};

		axios(params)	
		.then( (response) => {
			//handle success
      const estado = this.state;

    let url = 'registros/';
    const today =new Date();
    const description = 'Matricula - Membresia de '+estado.name+' '+estado.last_name;

    const params = {
      method: 'post',
      url: url,
      data: {description: description, price: estado.price, date:today},
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    };

    axios(params) 
    .then( (response) => {
      //handle success
      

      
      console.log(response);
    })
    .catch( (response) => {
      //handle error
      //alert("Error");
      console.log(response);
    });





			let redirect = <Redirect to="/Membresias" />;
			this.setState({
				redirect: redirect
			});

			alert("Se registro correctamente la membresia");
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
                <strong>Nueva Membresia</strong> 
              </CardHeader>
              
              <CardBody>
               
                   <Form onSubmit={this.onSubmit}  encType="multipart/form-data" className="form-horizontal">
                   <Row>
                   <Col>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Nombre</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"  name="name" id="name" onChange={this.handleAttribute} value={this.state.name}/>
                      
                    </Col>
                  </FormGroup>
                  </Col>
                  <Col>
                  	<FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Apellidos</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text"  name="last_name" id="last_name" onChange={this.handleAttribute} value={this.state.last_name}/>
                      
                    </Col>
                  </FormGroup>
                  </Col>
                  </Row>

                   <Row>
                   <Col>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Inicio</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date"  name="start" id="start" onChange={this.handleAttribute} value={this.state.start}/>
                      
                    </Col>
                  </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Fin</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date"  name="end" id="end" onChange={this.handleAttribute} value={this.state.end}/>
                      
                    </Col>
                  </FormGroup>
                  </Col>

                  </Row>

                   <Row>
                   <Col>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Estado</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="state" id="state" bsSize="lg" onChange={this.handleAttribute} value={this.state.state}>
                        <option >Opciones..</option>
                        <option value="ACTIVO">Activo</option>
                        <option value="VENCIDO">Vencido</option>
                        
                        

                        
                      </Input>
                      
                    </Col>
                  </FormGroup>
                  </Col>
                 <Col>
                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Soles</Label>
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
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"  ></i> Registrar Cliente</Button>
              
                </center>
              </CardFooter>
             
            </Card>
            
          
          
       
      </div>

    );
  }
}

export default Registrar;
