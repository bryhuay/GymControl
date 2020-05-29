import React, { Component } from 'react';
import axios from '../../AxiosFiles/axios.js';
import { Badge, Card, CardBody, CardHeader, Col, Button, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class Listado extends Component {

  
   // axios.get('colegios/',
     //   {headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
     state = {
    clients: [],
    count:''
  }


  componentDidMount() {
    axios.get('clientes', {
          headers: {
            "Authorization" : 'Bearer ' + sessionStorage.getItem('jwtToken') 
          }
        }
      )
      .then( res => {
        
        const data = res.data.clients;
        let clients = this.state.clients;
        console.log(data);

        for(let i = 0; i < data.length ; i++){
          console.log(data[i]);
          
          clients.push(
            <tr key={data[i]._id}>
                    <td>{data[i].name} {data[i].last_name}</td> 
                    
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                     <Button block color="danger" onClick={() => {


                                    let url = 'clientes/delete';
                                    

                                    const params = {
                                      method: 'post',
                                      url: url,
                                      data: {
                                        clientId: data[i]._id ,
                                        
                                      },
                                      headers: {
                                        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
                                      }
                                    };

                                    axios(params) 
                                    .then( (response) => {
                                      //handle success
                                     window.location.reload();   

                                      
                                      console.log(response);
                                    })
                                    .catch( (response) => {
                                     
                                      console.log(response);
                                    });
                                                 }} >Eliminar</Button>
                                                 </Col>
                                                 </Row>
                                                </td>
                                              </tr>
          );
        }

        this.setState({ clients: clients , count: res.data.count });

      })
      .catch( res => {
       // console.log("esta jodido");
        console.log(res);
      })
  }





  render() {

   //let contenedor = this.state.vistas;



    return (
      <div className="animated fadeIn">
       <Card>
              <CardHeader>
                  
                <h3>{this.state.count} Clientes </h3>
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Inicial</th>
                    <th>Primaria</th>
                    <th>Secundaria</th>
                    <th>Foto</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  { (this.state.schools !== null)?this.state.schools:(<tr><td></td></tr>) }
                  </tbody>
                </Table>
                
              </CardBody>
            </Card>
       

      </div>

    );
  }
}

export default Listado;