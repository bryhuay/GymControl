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
  Table,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class Buscar extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {

      
     
      last_name:'',
      clients:[],
      
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

		let url = 'clientes/searchByLastName';

		const params = {
			method: 'post',
			url: url,
			data: {string: data.last_name},
			headers: {
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		};

		axios(params)	
		.then( (response) => {
			//handle success
			 const dataa = response.data.clients;
      let clients = this.state.clients;
       if(dataa.length > 0){
        
        console.log("clients");
        console.log(dataa);
       

        for(let i = 0; i < dataa.length ; i++){
          console.log(dataa[i]);
          


          clients.push(
            

              
               <tr  key={Math.random()}>
                    <td>{dataa[i].name} {dataa[i].last_name}</td>
                    
                    <td>
                    	<Col>
                    <Button block color="dark"  onClick={ () => {
                    		const estado = this.state;

				              let url = 'registros/';
				              const today =new Date();
				              const description = 'Entrada Libre de  '+dataa[i].name+' '+dataa[i].last_name;
				              const price = '3';

				              const params = {
				                method: 'post',
				                url: url,
				                data: {description: description, price: price, date:today},
				                headers: {
				                  "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
				                }
				              };

				              axios(params) 
				              .then( (response) => {
				                //handle success
				                
				                alert(dataa[i].name+" "+dataa[i].last_name+" pago su asistencia" );
				                window.location.reload();             

				                
				                console.log(response);
				              })
				              .catch( (response) => {
				                //handle error
				                //alert("Error");
				                console.log(response);
				              });


                    } } >Asistencia - S/ 3.</Button>
                    </Col>
                    </td>
                  
                  </tr>
                       
          );
        }
      }
        this.setState({ clients: clients });
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
                <strong>Buscar </strong> 
              </CardHeader>
              
              <CardBody>
               
                   <Form onSubmit={this.onSubmit}  encType="multipart/form-data" className="form-horizontal">
                   <Row>
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
                  <Col>
                  <Button type="submit"  color="primary" onClick={this.handleSubmit}> Buscar Cliente</Button>
                  </Col>
              
                  </Row>

                   

                 </Form>
                  <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Nombres y Apellidos</th>
                    <th>Pagar Asistencia</th>
                   

                  </tr>
                  </thead>
                  <tbody>
                  { (this.state.clients !== null)?this.state.clients:(<tr><td></td></tr>) }
                  </tbody>
                </Table>
              </CardBody>
             <CardFooter>
                  
              </CardFooter>
             
            </Card>
            
          
          
       
      </div>

    );
  }
}

export default Buscar;
