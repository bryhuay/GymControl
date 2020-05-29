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
      name:'',
      last_name:'',
     
      start:'',
      end:'',
      state:'',
      
      modal: false



    
    };
    
    this.getmember = this.getmember.bind(this);
  }
  componentWillMount(){

    this.getmember();
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
getmember = () =>{



    const data = this.state;

    let url = 'miembros/find?memberId='+data.id;

    const params = {
      method: 'get',
      url: url,

      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    };

    axios(params) 
    .then( (response) => {
      
    const data = response.data.member;

   
      this.setState({
      name:data.name,
      last_name:data.last_name, 
      start:data.start,
      end:data.end,
      state:data.state     
     
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
                <h3>{this.state.name} {this.state.last_name}</h3>
               </Col>
               <Col>
                <div align="right">
                <Row>
                  {(this.state.state === 'VENCIDO')?( 
                      <Col>
                    <Button block color="dark"  href={'/#/Membresias/Renovar/'+this.state.id} >Renovar</Button>
                    </Col>
                    ):(
                       <Col>
                    <h5></h5>
                    </Col>
                    )}
                		<Col>
                		<Button block color="warning"  href={'/#/Membresias/Editar/'+this.state.id}>Editar</Button>
                		</Col>
                		<Col>
                		<Button block color="danger" onClick={this.toggle} >Eliminar</Button>
                     <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Confirmacion</ModalHeader>
                  <ModalBody>
                    <center>
                        ¿Seguro que desea eliminar al miembro {this.state.name} {this.state.last_name}  ?
                        <br/>
                        <br/>
                        <br/>
                    
                    <Button color="danger"  onClick={() => {


                                    let url = 'miembros/delete';
                                    

                                    const params = {
                                      method: 'post',
                                      url: url,
                                      data: {
                                        memberId: this.state.id ,
                                        
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
                                                 }} href="#/Membresias">Eliminar Usuario </Button>
                                       
                    
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
                     		<td><strong>Fecha de inicio</strong></td>
                     		<td>{this.state.start}</td> 
                      </tr>
                      <tr>
                        <td><strong>Estado</strong></td>
                        <td>{this.state.state}</td> 
                      </tr>
                      
                      

                    </tbody>
                  </Table>
                 </Col>
                 
              	<Col lg={6}>
                  <Table responsive striped hover>
                    <tbody>
                      
                      <tr>
                     		<td><strong>Fecha de fin</strong></td>
                     		<td>{this.state.end}</td>
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
