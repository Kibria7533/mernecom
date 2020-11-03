
import React, { Component } from 'react'
import axios from 'axios';
import URL from './Url';

import Invoice from './Invoice'
import Moment from 'react-moment';
export default class Customerorderlist extends Component {
constructor(){
  super()
  this.state={
    orders:[]
  }
}
  componentDidMount(){
    axios.get(`${URL}/getuserorder`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':localStorage.getItem('auth')
      }
    }).then(res=>{
      this.setState({orders:res.data})
      
    })
  }
 
    render() {
     
        return (
            <div className="p-4">
              
  <h3>Order Tracking</h3>
  <table className="table table-bordered track_tbl">
    <thead>
      <tr>
        <th />
        <th>S No</th>
        <th>Order Id</th>
        <th>Status</th>
       
        <th>Date/Time</th>
        <th>Invoices</th>
        <th>Order Details</th>
      </tr>
    </thead>
    <tbody>
      {this.state.orders.map((item,index)=>{
        return(
          <tr className="active" key={index}>
          <td className="track_dot">
            <span className="track_line" />
          </td>
        <td>{index+1}</td>
        <td>#{item.orderid}</td>
        {item.orderstatus==1&&<td><button>pending</button></td>}
        {item.orderstatus==2&&<td><button>accepted</button></td>}
        {item.orderstatus==3&&<td><button>on the way</button></td>}
        {item.orderstatus==4&&<td><button>completed</button></td>}
          
         
        <td><Moment >{item.createdAt}</Moment></td>
          <td><a href={`/invoice/${item.orderid}`}><button>print/save</button></a></td>
          <td><a href={`/customerordertable/${item.orderid}`}><button>check</button></a></td>
        </tr>
        )
      })}
     
     
    
     
     
    </tbody>
  </table>
</div>

        )
    }
}

