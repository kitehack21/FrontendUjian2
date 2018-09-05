import React, {Component} from 'react'


class TransactionHistoryDetails extends Component{

    render(){
        return(
            <tr>
                <td className="text-left">{this.props.studio}</td>
                <td className="text-left">{this.props.movie}</td>
                <td className="text-left">{this.props.time}</td>
                <td className="text-left">{this.props.seats}</td>
                <td className="text-left">{this.props.payment}</td>
            </tr>
        )
    }
}

export default TransactionHistoryDetails