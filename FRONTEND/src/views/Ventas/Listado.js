import React, { Component } from 'react';
import axios from '../../AxiosFiles/axios.js';
import { Badge, Card, CardBody, CardHeader, Col, Button, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class Listado extends Component {

  
   // axios.get('colegios/',
     //   {headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
     state = {
    records: [],
    count:''
  }


  componentDidMount() {
    axios.get('registros', {
          headers: {
            "Authorization" : 'Bearer ' + sessionStorage.getItem('jwtToken') 
          }
        }
      )
      .then( res => {
        
        const data = res.data.records;
        let records = this.state.records;
        console.log(data);

        for(let i = 0; i < data.length ; i++){
          console.log(data[i]);
          
          records.push(
            <tr key={data[i]._id}>
                    <td> <a href={'/#/Ventas/Detalle/'+data[i]._id}> {data[i].description}</a></td> 
                    <td>{data[i].price}</td> 
                   
                                              </tr>
          );
        }

        this.setState({ records: records });

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
                  
                <h3>{this.state.count} Registros de ingresos </h3>
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Descripcion</th>
                    <th>Precio</th>
               
                  </tr>
                  </thead>
                  <tbody>
                  { (this.state.records !== null)?this.state.records:(<tr><td></td></tr>) }
                  </tbody>
                </Table>
                
              </CardBody>
            </Card>
       

      </div>

    );
  }
}

export default Listado;