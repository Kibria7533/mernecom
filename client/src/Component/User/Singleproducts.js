import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import Axios from 'axios'
import URL from './Url';

export default class Singleproducts extends Component {
  constructor (props){
    super(props);
    this.state={
Product:[],
images:[],
sizes:[]
  }
  }
  
 

   productId =this.props.match.params.productId
   componentDidMount(){
    
     console.log(this.productId)
    Axios.get(`${URL}/api/product/products_by_id?id=${this.productId}&type=single`)
    .then(response => {
       
        if(response.data[0].Images.length>0 ){
          let images = [];

          response.data[0].Images.map(item => {
              images.push({
                  original: `http://localhost:5000/${item}`,
                  thumbnail: `http://localhost:5000/${item}`
              })
          })
         this.setState({images})
        }

       
        this.setState({Product:response.data[0]})
        this.setState({sizes:response.data[0].selectedsize})
    }).catch(err=>{
      console.log(err)
    })
   }
  
 


    render() {
        return (
            <div className="container-fluid">
  <div className="card">
    <div className="container-fliud">
      <div className="wrapper row">
        <div className="preview col-md-6 lg-6">
        <ImageGallery items={this.state.images} />
        </div>
        {/* {this.state.Product.map((item,index)=>{
            return(
              
            )
          })} */}
        <div className="details col-md-6">
         
        <h3 className="product-title">{this.state.Product.title}</h3>
          <div className="rating">
            <div className="stars">
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
            <span className="review-no">41 reviews</span>
          </div>
        <p className="product-description">{this.state.Product.title}</p>
        <h4 className="price">current price: <span>${this.state.Product.price}</span></h4>
          <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
          <h5 className="sizes">sizes:
          {this.state.sizes.map((it,index)=>{
            return( <span key={index} className="size" data-toggle="tooltip" title="small">{it.name}</span>)
          })

          }
           
            
          </h5>
          <h5 className="colors">colors:
            <span className="color orange not-available" data-toggle="tooltip" title="Not In store" />
            <span className="color green" />
            <span className="color blue" />
          </h5>
          <div className="action">
            <button className="add-to-cart btn btn-default" onClick={()=>this.props.addToCarthandler(this.props.match.params.productId,"add")}  type="button">add to cart</button>
            <button className="like btn btn-default" type="button" style={{marginLeft: "94px"}}><span className="fa fa-heart" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-xs-9">
      <ul className="menu-items">
        <li className="active">Detalle del producto</li>
        <li>Garantía</li>
        <li>Vendedor</li>
        <li>Envío</li>
      </ul>
      <div style={{width: '100%', borderTop: '1px solid silver'}}>
        <p style={{padding: '15px'}}>
          <small>
            Stay connected either on the phone or the Web with the Galaxy S4 I337 from Samsung. With 16 GB of memory and a 4G connection, this phone stores precious photos and video and lets you upload them to a cloud or social network at blinding-fast speed. With a 17-hour operating life from one charge, this phone allows you keep in touch even on the go. 
            With its built-in photo editor, the Galaxy S4 allows you to edit photos with the touch of a finger, eliminating extraneous background items. Usable with most carriers, this smartphone is the perfect companion for work or entertainment.
          </small>
        </p>
        <small>
          <ul>
            <li>Super AMOLED capacitive touchscreen display with 16M colors</li>
            <li>Available on GSM, AT T, T-Mobile and other carriers</li>
            <li>Compatible with GSM 850 / 900 / 1800; HSDPA 850 / 1900 / 2100 LTE; 700 MHz Class 17 / 1700 / 2100 networks</li>
            <li>MicroUSB and USB connectivity</li>
            <li>Interfaces with Wi-Fi 802.11 a/b/g/n/ac, dual band and Bluetooth</li>
            <li>Wi-Fi hotspot to keep other devices online when a connection is not available</li>
            <li>SMS, MMS, email, Push Mail, IM and RSS messaging</li>
            <li>Front-facing camera features autofocus, an LED flash, dual video call capability and a sharp 4128 x 3096 pixel picture</li>
            <li>Features 16 GB memory and 2 GB RAM</li>
            <li>Upgradeable Jelly Bean v4.2.2 to Jelly Bean v4.3 Android OS</li>
            <li>17 hours of talk time, 350 hours standby time on one charge</li>
            <li>Available in white or black</li>
            <li>Model I337</li>
            <li>Package includes phone, charger, battery and user manual</li>
            <li>Phone is 5.38 inches high x 2.75 inches wide x 0.13 inches deep and weighs a mere 4.59 oz </li>
          </ul>  
        </small>
      </div>
    </div>		
  </div>
</div>

        )
    }
}
