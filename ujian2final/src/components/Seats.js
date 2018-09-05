import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class Seats extends Component{
    state = {toggle: false, booked: false}

    componentWillMount(){
        this.setState({booked:this.props.booked})
    }

    onToggleOn(){
        this.setState({toggle:true})
        this.props.seatClickTrue(this.props.index)
    }
    onToggleOff = () => {
        this.setState({toggle:false})
        this.props.seatClickFalse(this.props.index)
    }

    renderButton(){
        if(this.state.booked){
                if(this.props.index < 10){
                    return(
                    <Button className="btn-warning col-md-1 text-left" disabled>{"A"+(this.props.index + 1)}</Button>
                    )
                }
                else if(this.props.index >= 10 && this.props.index < 20){
                    return(
                        <Button className="btn-warning col-md-1 text-left" disabled>{"B"+(this.props.index -9)}</Button>
                        )
                }
        }
        else{
            if(this.state.toggle){
                if(this.props.index < 10){
                    return(
                    <Button className="btn-danger col-md-1 text-left" active onClick={() => this.onToggleOff()}>{"A"+(this.props.index+1)}</Button>
                    )
                }
                else if(this.props.index >= 10 && this.props.index < 20){
                    return(
                        <Button className="btn-danger col-md-1 text-left" active onClick={() => this.onToggleOff()}>{"B"+(this.props.index-9)}</Button>
                        )
                }

                
            }else{
                if(this.props.index < 10){
                    return(
                        <Button className="btn-success col-md-1 text-left" onClick={() => this.onToggleOn()}>{"A"+(this.props.index+1)}</Button>
                    )
                }else if(this.props.index >= 10 && this.props.index < 20){
                    return(
                        <Button className="btn-success col-md-1 text-left" onClick={() => this.onToggleOn()}>{"B"+(this.props.index-9)}</Button>
                        )
                }
            }
            
        }
    }
    render(){
        return(
                this.renderButton()
        )
    }
}

export default Seats
