import React, { Component } from 'react'

export default class Ordersummery extends Component {
    constructor(){
        super();
        this.state={
            firstname:"",
            email:"",
            address:"",
            city:"",
            state:"",
            zip:"",

        }
    }
    onchange=(e)=>{
        this.setState({[e.target.name]:e.target.value});

    }
    render() {
        return (
            <>
                <div className="row roww" style={{
                    "display": "-ms-flexbox",
                    "display": "flex",
                    "-ms-flex-wrap": "wrap",
                    "flexWrap": "wrap",
                    "margin": "0 -16px",
                    "marginTop": "73px"
                }}>
                    <div className="col-75" style={{
                        "-ms-flex": "75%",
                        "flex": "75%", "padding": " 0 16px"
                    }}>
                        <div className="container con" style={{
                            "backgroundColor": " #f2f2f2",
                            "padding": "5px 20px 15px 20px",
                            "border": "1px solid lightgrey",
                            "borderRadius": "3px",
                           
                        }}>
                            <form>
                                <div className="row" style={{
                                    "display": "-ms-flexbox",
                                    "display": "flex",
                                    "-ms-flex-wrap": "wrap",
                                    "flexWrap": "wrap",
                                    "margin": "0 -16px"
                                }}>
                                    <div className="col-50" style={{
                                        "-ms-flex": "50%",
                                        "flex": "50%", "padding": " 0 16px"
                                    }}>
                                        <h3>Billing Address</h3>
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="fname"><i className="fa fa-user" /> Full Name</label >
                                        <input type="text"
                                            style={{
                                                "width": "100%",
                                                "marginBottom": "20px",
                                                "padding": "12px",
                                                "border": "1px solid #ccc",
                                                "borderRadius": "3px"
                                            }}
                                            id="fname" name="firstname" value={this.state.firstname} onChange={this.onchange}placeholder="John M. Doe" />
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="email"><i className="fa fa-envelope" /> Email</label >
                                        <input type="text"
                                            style={{
                                                "width": "100%",
                                                "marginBottom": "20px",
                                                "padding": "12px",
                                                "border": "1px solid #ccc",
                                                "borderRadius": "3px"
                                            }}
                                            id="email" name="email" value={this.state.email} onChange={this.onchange} placeholder="john@example.com" />
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="adr"><i className="fa fa-address-card-o" /> Address</label >
                                        <input type="text"
                                            style={{
                                                "width": "100%",
                                                "marginBottom": "20px",
                                                "padding": "12px",
                                                "border": "1px solid #ccc",
                                                "borderRadius": "3px"
                                            }}
                                            id="adr" name="address" value={this.state.address} onChange={this.onchange} placeholder="542 W. 15th Street" />
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="city"><i className="fa fa-institution" /> City</label >
                                        <input type="text"
                                            style={{
                                                "width": "100%",
                                                "marginBottom": "20px",
                                                "padding": "12px",
                                                "border": "1px solid #ccc",
                                                "borderRadius": "3px"
                                            }}
                                            id="city" name="city" value={this.state.city} onChange={this.onchange} placeholder="New York" />
                                        <div className="row" style={{
                                            "display": "-ms-flexbox",
                                            "display": "flex",
                                            "-ms-flex-wrap": "wrap",
                                            "flexWrap": "wrap",
                                            "margin": "0 -16px"
                                        }}>
                                            <div className="col-50" style={{
                                                "-ms-flex": "50%",
                                                "flex": "50%","padding":" 0 16px"
                                            }}>
                                                <label style={{
                                                    "marginBottom": "10px",
                                                    "display": "block"
                                                }} htmlFor="state">State</label >
                                                <input type="text"
                                                    style={{
                                                        "width": "100%",
                                                        "marginBottom": "20px",
                                                        "padding": "12px",
                                                        "border": "1px solid #ccc",
                                                        "borderRadius": "3px"
                                                    }}
                                                    id="state" name="state" value={this.state.state} onChange={this.onchange} placeholder="NY" />
                                            </div>
                                            <div className="col-50" style={{
                                                "-ms-flex": "50%",
                                                "flex": "50%","padding":" 0 16px"
                                            }}>
                                                <label style={{
                                                    "marginBottom": "10px",
                                                    "display": "block"
                                                }} htmlFor="zip">Zip</label >
                                                <input type="text"
                                                    style={{
                                                        "width": "100%",
                                                        "marginBottom": "20px",
                                                        "padding": "12px",
                                                        "border": "1px solid #ccc",
                                                        "borderRadius": "3px"
                                                    }}
                                                    id="zip" name="zip" value={this.state.zip} onChange={this.onchange} placeholder={10001} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-50" style={{
                                        "-ms-flex": "50%",
                                        "flex": "50%","padding":" 0 16px"
                                    }}>
                                        <h3>Payment</h3>
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="fname">Accepted Cards</label >
                                        <div className="icon-container" style={{
                                            "marginBottom": "20px",
                                            "padding": "7px 0",
                                            "fontSize": "24px"
                                        }}
                                        >
                                            <i className="fa fa-cc-visa" style={{ color: 'navy' }} />
                                            <i className="fa fa-cc-amex" style={{ color: 'blue' }} />
                                            <i className="fa fa-cc-mastercard" style={{ color: 'red' }} />
                                            <i className="fa fa-cc-discover" style={{ color: 'orange' }} />
                                        </div>
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="cname">Name on Card</label >
                                        <input type="text"
                                            style={{
                                                "width": "100%",
                                                "marginBottom": "20px",
                                                "padding": "12px",
                                                "border": "1px solid #ccc",
                                                "borderRadius": "3px"
                                            }}
                                            id="cname" name="cardname" placeholder="John More Doe" />
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="ccnum">Credit card number</label >
                                        <input type="text"
                                            style={{
                                                "width": "100%",
                                                "marginBottom": "20px",
                                                "padding": "12px",
                                                "border": "1px solid #ccc",
                                                "borderRadius": "3px"
                                            }}
                                            id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                                        <label style={{
                                            "marginBottom": "10px",
                                            "display": "block"
                                        }} htmlFor="expmonth">Exp Month</label >
                                        <input type="text"
                                            style={{
                                                "width": "100%",
                                                "marginBottom": "20px",
                                                "padding": "12px",
                                                "border": "1px solid #ccc",
                                                "borderRadius": "3px"
                                            }}
                                            id="expmonth" name="expmonth" placeholder="September" />
                                        <div className="row" style={{
                                            "display": "-ms-flexbox",
                                            "display": "flex",
                                            "-ms-flex-wrap": "wrap",
                                            "flexWrap": "wrap",
                                            "margin": "0 -16px"
                                        }}>
                                            <div className="col-50" style={{
                                                "-ms-flex": "50%",
                                                "flex": "50%","padding":" 0 16px"
                                            }}>
                                                <label style={{
                                                    "marginBottom": "10px",
                                                    "display": "block"
                                                }} htmlFor="expyear">Exp Year</label >
                                                <input type="text"
                                                    style={{
                                                        "width": "100%",
                                                        "marginBottom": "20px",
                                                        "padding": "12px",
                                                        "border": "1px solid #ccc",
                                                        "borderRadius": "3px"
                                                    }}
                                                    id="expyear" name="expyear" placeholder={2018} />
                                            </div>
                                            <div className="col-50" style={{
                                                "-ms-flex": "50%",
                                                "flex": "50%","padding":" 0 16px"
                                            }}>
                                                <label style={{
                                                    "marginBottom": "10px",
                                                    "display": "block"
                                                }} htmlFor="cvv">CVV</label >
                                                <input type="text"
                                                    style={{
                                                        "width": "100%",
                                                        "marginBottom": "20px",
                                                        "padding": "12px",
                                                        "border": "1px solid #ccc",
                                                        "borderRadius": "3px"
                                                    }}
                                                    id="cvv" name="cvv" placeholder={352} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label style={{
                                    "marginBottom": "10px",
                                    "display": "block"
                                }}>
                                    <input type="checkbox" defaultChecked="checked" name="sameadr" /> Shipping address same as billing
        </label >
                             <a href="/customerorderlist">  <input type="button" value="Place Order" className="btn" style={{
                                    "backgroundColor": "#4CAF50",
                                    "color": "white",
                                    "padding": "12px",
                                    "margin": "10px 0",
                                    "border": "none",
                                    "width": "100%",
                                    "borderRadius": "3px",
                                    "cursor": "pointer",
                                    "fontSize": "17px"
                                }}
                                /></a> 
                            </form>
                        </div>
                    </div>
                    <div className="col-25" style={{
                        "-ms-flex": "25%",
                        "flex": "25%","padding":" 0 16px"
                    }}>
                        <div className="container" style={{
                            "backgroundColor": " #f2f2f2",
                            "padding": "5px 20px 15px 20px",
                            "border": "1px solid lightgrey",
                            "borderRadius": "3px",
                           
                        }}>
                            <h4>Cart
        <span className="price" style={{ color: 'black' }} style={{
                                    "float": "right",
                                    "color": "grey"
                                }}
                                >
                                    <i className="fa fa-shopping-cart" />
                            <b>{this.props.addtocart}</b>
                                </span>
                            </h4>
                            {this.props.cart.map((item,index)=>{
                                return(
                                <p><a href="#">{item.title}</a> <span className="price" style={{
                                        "float": "right",
                                        "color": "grey",
                                       
                                    }}
                                >${item.price}</span></p>
                                )
                            })}
                        
                        
                           
                           
                            <hr />
                        <p>Total <span className="price" style={{ color: 'black' }}><b>${this.props.total}</b></span></p>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
