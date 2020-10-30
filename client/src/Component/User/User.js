import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import Cart from './Cart';
import Cartdelete from './Cartdelete';
import Homeuser from './Homeuser';
import Header from './Header'
import Footer from './Footer'
import Userregister from './Userregister';
import Userlogin from './Userlogin';
import Logout from './Logout';
import Adminlogin from './Adminlogin';
import Forgotpassword from './Forgotpassword';
import Showmessege from './Showmessege';
import Changepassword from './Changepassword';
import Singleproducts from './Singleproducts';
import Axios from 'axios';
import URL from './Url';
import Ordersummery from './Ordersummery';
import Customerordertable from './Customerordertable';
import Customerorderlist from './Customerorderlist';


class User extends Component {
    constructor() {
        super();
        this.state = {
            addtocart: 0,
            cart: [],
            totalprice: 0
        }
    }

    async componentDidMount() {


        // first fetch usercart

        await Axios.get(`${URL}/api/users/profile`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('auth')
            }
        }).then(async (responseok) => {

            let cartItems = [];
            if (localStorage.getItem('auth') && responseok.data[0].cart) {
                if (responseok.data[0].cart.length > 0) {

                    responseok.data[0].cart.forEach(item => {
                        cartItems.push(item.id)
                    });


                }
            }


            await Axios.get(`${URL}/api/product/products_by_id?id=${cartItems}&type=array`)
                .then(response => {
                    //   console.log(responseok.data.cart)



                    //Make CartDetail inside Redux Store 
                    // We need to add quantity data to Product Information that come from Product Collection. 
                    let totalproduct = 0;
                    let price = 0;
                    responseok.data[0].cart.forEach(cartItem => {
                        response.data.forEach((productDetail, i) => {
                            if (cartItem.id === productDetail._id) {
                                response.data[i].quantity = cartItem.quantity;
                                totalproduct += parseInt(cartItem.quantity)
                                price += parseInt(productDetail.price) * parseInt(cartItem.quantity)

                            }
                        })
                    })
                    this.setState({ addtocart: totalproduct, cart: response.data, totalprice: price })

                    console.log(totalproduct)
                }).catch(err => {
                    // this.componentDidMount()
                    this.setState({ addtocart: 0, cart: [], totalprice: 0 })
                })
        })



    }
    addToCarthandler = (_id, type) => {

        if (!localStorage.getItem('auth'))
            return alert('login to cart product')
        Axios.get(`${URL}/api/users/addToCart?productId=${_id}&type=${type}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('auth')
            }
        })
            .then(response => {
                this.componentDidMount()
                console.log(response.data);

            }

            );
    }

    removeFromCart = (_id) => {

        if (!localStorage.getItem('auth'))
            return alert('login to cart product')
        Axios.get(`${URL}/api/users/removeFromCart?productId=${_id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('auth')
            }
        })
            .then(response => {
                this.componentDidMount();
                console.log(response.data);

            }

            );

    }
    render() {

        return (
            <BrowserRouter>
                <div>
                    <Header addtocart={this.state.addtocart} />

                    <div className='container-fluid mainContent'>
                        {/* <Breadcrumbs /> */}
                        <Switch>
                            <Route exact path='/' render={props => <Homeuser addToCarthandler={this.addToCarthandler} />} />
                            <Route exact path='/cart' render={props => <Cart cart={this.state.cart} addToCarthandler={this.addToCarthandler} removeFromCart={this.removeFromCart} total={this.state.totalprice} addtocartupdate={this.addtocartupdate} />} />
                            <Route exact path='/cartdelete' component={Cartdelete} />
                            <Route exact path="/userregister" component={Userregister} />
                            <Route exact path="/userlogin" component={Userlogin} />
                            <Route exact path="/logout" component={Logout} />
                            <Route exact path="/forgotpassword" component={Forgotpassword} />
                            <Route exact path="/showmessege" component={Showmessege} />
                            <Route exact path="/forgotpasswordform" component={Changepassword} />
                            <Route exact path="/singleproduct/:productId" render={props => <Singleproducts {...props} addToCarthandler={this.addToCarthandler} />} />
                            <Route exact path="/ordersummery" render={props=><Ordersummery {...props} cart={this.state.cart}  total={this.state.totalprice} addtocart={this.state.addtocart}/>} />
                            <Route exact path="/customerorderlist" render={props=><Customerorderlist/>}/>
                            <Route exact path="/customerordertable" render={props=><Customerordertable {...props}   total={this.state.totalprice} addtocart={this.state.addtocart}/>}/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default User;