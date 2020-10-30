import React, { Component } from 'react'


export default class Customerorderlist extends Component {
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
