
import React, { Component } from 'react'
import axios from 'axios';
import URL from './Url';


export default class Customerorderlist extends Component {
 async componentDidMount(){
    await  axios.post(`${URL}/ordersave`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      }
    }).then(res=>{
      console.log(res)
      alert('ok')
    })
  }
  
    render() {
      (function (window, document) {
        var loader = function () {
            var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
            script.src = "https://sandbox.sslcommerz.com/embed.min.js?" + Math.random().toString(36).substring(7);
            tag.parentNode.insertBefore(script, tag);
        };
      
        window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
      })(window, document);
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
        <th>Distibutor</th>
        <th>Date/Time</th>
        <th>Invoices</th>
        <th>Order Details</th>
      </tr>
    </thead>
    <tbody>
      <tr className="active">
        <td className="track_dot">
          <span className="track_line" />
        </td>
        <td>01</td>
        <td>#786701</td>
        <td><button>pending</button></td>
        <td>SA Servieces</td>
        <td>31/07/2018 22:24:PM</td>
        <td><button>check//print</button></td>
        <td><a href="/customerordertable"><button>check</button></a></td>
      </tr>
     
    
     
     
    </tbody>
  </table>
</div>

        )
    }
}
