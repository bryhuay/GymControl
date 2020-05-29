import React, { Component } from 'react';
import axios from '../../AxiosFiles/axios.js';
import { Badge, Card, CardBody, CardHeader, Modal, ModalBody, ModalFooter, ModalHeader,Col, Button, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
class Detalle extends Component {



 constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {

      
      id:props.match.params.id,
      description:'',
      price:'',
      date:'',
           
      modal: false



    
    };
    
    this.getrecord = this.getrecord.bind(this);
  }
  componentWillMount(){

    this.getrecord();
  }
toggle() {
    this.setState({ collapse: !this.state.collapse });
    this.setState({
      modal: !this.state.modal,
    });
  }
  

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
getrecord = () =>{



    const data = this.state;

    let url = 'registros/find?recordId='+data.id;

    const params = {
      method: 'get',
      url: url,

      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    };

    axios(params) 
    .then( (response) => {
      
    const data = response.data.record;

   
      this.setState({
      description:data.description,
      price:data.price,
      date: data.date 
     
         });

    

      
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
      
       <Card>
              <CardHeader>
               <Row>
               <Col>
                <h3>Venta</h3>
               </Col>
               <Col>
                <div align="right">
                <Row>
                
                		<Col>
                		<Button block color="warning"  href={'/#/Ventas/Editar/'+this.state.id}>Editar</Button>
                		</Col>
                		<Col>
                		<Button block color="danger" onClick={this.toggle} >Eliminar</Button>
                     <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Confirmacion</ModalHeader>
                  <ModalBody>
                    <center>
                        ¿Seguro que desea eliminar esta venta  ?
                        <br/>
                        <br/>
                        <br/>
                    
                    <Button color="danger"  onClick={() => {


                                    let url = 'registros/delete';
                                    

                                    const params = {
                                      method: 'post',
                                      url: url,
                                      data: {
                                        recordId: this.state.id ,
                                        
                                      },                                
                                      headers: {
                                        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
                                      }
                                    };

                                    axios(params) 
                                    .then( (response) => {                                     
                                      console.log("Error");
                                      console.log(response);
                                    })
                                    .catch( (response) => {
                                     
                                      console.log(response);
                                    });
                                                 }} href="#/Ventas">Eliminar Venta </Button>
                                       
                    
                    </center>
                  </ModalBody>
                  
                </Modal>

                		</Col>
                </Row>		
                </div>
                </Col>
              </Row>
              </CardHeader>
              <CardBody>
              <Row>
              <Col lg={6}>
                
                <Table responsive striped hover>
                    <tbody>
                      
                      <tr>
                     		<td><strong>Descripcion</strong></td>
                     		<td>{this.state.description}</td> 
                      </tr>
                       <tr>
                        <td><strong>Fecha</strong></td>
                        <td>{this.state.date}</td> 
                      </tr>
                      
                      
                      

                    </tbody>
                  </Table>
                 </Col>
                 
              	<Col lg={6}>
                  <Table responsive striped hover>
                    <tbody>
                      
                      <tr>
                     		<td><strong>Precio</strong></td>
                     		<td>{this.state.price}</td>
                     </tr>
                    
                     

                    </tbody>
                  </Table>
                </Col>
                </Row>

              </CardBody>
            </Card>
           
       

      </div>

    );
  }
}

export default Detalle;
