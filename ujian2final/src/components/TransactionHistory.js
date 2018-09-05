import React, {Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import TransactionHistoryDetails from './TransactionHistoryDetails'

class TransactionHistory extends Component{

    state = {transactions: []}

    componentWillMount(){
        axios.get(API_URL_1 + "/transactions", {
            params: {
                user: this.props.auth.username
            }
        }).then(response => {
            this.setState({transactions: response.data})
        })
    }

    renderPageDetails(){
        console.log(this.state)
        return (
            this.state.transactions.map(transaction => 
            <TransactionHistoryDetails movie={transaction.movie} studio = {transaction.studio} time={transaction.time} seats={transaction.seats} payment={transaction.payment}/>)
        )
    }
    render(){
        if(this.props.auth.username !== ""){
            return(
                <div>
                    <section className="container">
                    <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Transaction History</h3>
                    </div>
                    <div className="box-body">
                    <table id="example2" className="table table-bordered table-hover">
                        <thead>
                        <tr>
                        <th>Studio</th>
                        <th>Movie</th>
                        <th>Showtime</th>
                        <th>Seats Purchased</th>
                        <th>Total Payment</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderPageDetails()}
                        </tbody>
                    </table>
                    </div>
                </div>
                </section>
                </div>
            )
        }
        return <Redirect to="/SignIn"/>
       
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    return {auth};
}

export default connect(mapStateToProps, {})(TransactionHistory);