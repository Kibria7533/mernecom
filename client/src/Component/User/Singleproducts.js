import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import Axios from 'axios'
import URL from './Url';
import Comments from './Comments'
import ReactStars from "react-rating-stars-component";
import Collapsible from 'react-collapsible';
import Avatar from 'react-avatar';
import Moment from 'react-moment';
export default class Singleproducts extends Component {
  constructor (props){
    super(props);
    this.state={
Product:[],
images:[],
sizes:[],
comment:"",
rating:0,
commentshow:true,
detailsshow:false,
comments:[]

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
                  original: `${URL}/${item}`,
                  thumbnail: `${URL}/${item}`
              })
          })
         this.setState({images})
        }

       
        this.setState({Product:response.data[0]})
        this.setState({sizes:response.data[0].selectedsize})
        this.getcomment()
    }).catch(err=>{
      console.log(err)
    })

    
   }
   getcomment=()=>{
    Axios.get(`${URL}/getsingularproductcomment?id=${this.productId}&type=single`)
    .then(result=>{
     this.setState({comments:result.data,comment:"",rating:null});
    }).catch(err=>{
      console.log(err)
    })
   }
  
   ratingChanged = (newRating) => {
    this.setState({rating:newRating})
  };
onchange=(e)=>{
  this.setState({comment:e.target.value})
}
handleSubmit=(e)=>{
e.preventDefault();
Axios.post(`${URL}/savecomment&reviews`,{comment:this.state.comment,rating:this.state.rating,productId:this.productId},{
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'auth':localStorage.getItem('auth')
  }
}).then(res=>{
 this.getcomment()
})
}
    render() {
      const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };
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
          <ReactStars
          value={5}
          isHalf
    count={5}
    onChange={this.ratingChanged}
    size={24}
    activeColor="#ffd700"
    edit={false}
  />
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
            <button className="like btn btn-default" type="button" style={{marginLeft: "14px"}}><span className="fa fa-heart" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-xs-9">
      <ul className="menu-items">
        <li className={this.state.commentshow && "active"} onClick={()=>this.setState({commentshow:!this.state.commentshow,detailsshow:!this.state.detailsshow})}>Comments and review</li>
        <li className={this.state.detailsshow && "active"} onClick={()=>this.setState({commentshow:!this.state.commentshow,detailsshow:!this.state.detailsshow})}>Details Features</li>
        
      </ul>
    {this.state.commentshow &&
     <div className="container">
	
   

<div className="container-fluid">
      <div className="row">
        <div className="panel panel-default widget">
          <div className="panel-heading">
            <span className="glyphicon glyphicon-comment" />
            <h3 className="panel-title">
              Recent Comments</h3>
            <span className="label label-info ml-5 " style={{    "marginTop": "9px"}}>
  {this.state.comments.length}</span>
          </div>
          <div className="panel-body">
            <ul className="list-group">
            {this.state.comments.map((item,index)=>{
      return(
            
              <li className="list-group-item" style={{minWidth:"400px"}}>
                <div className="row">
                 
                  <div className="col-xs-10 col-md-11 ml-1">
                    <div>
                      <a > <ReactStars
              value={item.ratings}
              isHalf
        count={5}
        onChange={this.ratingChanged}
        size={24}
        activeColor="#ffd700"
      /></a>
                      <div className="mic-info">
      By: <a href="#">{item.username}</a> <Moment calendar={calendarStrings} >{item.createdAt}</Moment>
                      </div>
                    </div>
                    <div className="comment-text">
                     {item.comment}
                    </div>
                   
                  </div>
                </div>
              </li>
              
      )
    })}
            </ul>
           
          </div>
        </div>
      </div>
    </div>
    

     
     
      <Collapsible trigger={<button>Comment & Review</button>} style={{backgroundColor:"wheat"}}>
       <div className="d-flex justify-content-start mt-2">
    
    <form onSubmit={this.handleSubmit}>
        <label>
         
          <textarea name="comment" value={this.state.comment} onChange={this.onchange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
             <ReactStars
             value={this.state.rating}
             isHalf
       count={5}
       onChange={this.ratingChanged}
       size={24}
       activeColor="#ffd700"
     /> 
       </div>
          
              
    </Collapsible>
   </div>
   
    } 
     
      
         
          {this.state.detailsshow &&
            <small style={{marginTop:"10px"}}>
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
          }
        
      
     
    </div>		
  </div>
</div>

        )
    }
}
