import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import {API_URL_1 } from '../supports/api-url/apiurl'


class ScheduleButton extends Component{
    render(){
        return(
            <div>
            <Button onClick={this.props.clickSchedule}>{this.props.time}</Button>
            </div>
        )
    }
}

export default ScheduleButton