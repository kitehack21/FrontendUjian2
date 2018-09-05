import React, {Component} from 'react'
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl.js'
import ScheduleButton from './ScheduleButton'
import Seats from './Seats'
import {resetMovieSelect} from '../actions'
import CarouselMovies from './CarouselMovies'
import {connect} from 'react-redux'


const INITIAL_STATE = {schedule: [], time : "", seats: [], studio: "", price: 0, id: 0, movies: [], 
title1: "", poster1: "", imdb1:"", desc1:"", title2: "", poster2: "", imdb2:"", desc2: "", title3: "", poster3: "",
imdb3:"", desc3:""}

var count = 0;

class HomePage extends Component{
      
    state = {schedule: [], time : "", seats: [], studio: "", price: 0, id: 0, movies: [],
    title1: "", poster1: "", imdb1:"", desc1:"", title2: "", poster2: "", imdb2:"", desc2: "", title3: "", poster3: "",
    imdb3:"", desc3:""}

    componentWillMount(){
        this.getSchedule()
        axios.get(API_URL_1 + "/movies")
        .then(response => {
            this.setState({
                movies: response.data,
                title1: response.data[0].title, 
                poster1: response.data[0].image, 
                imdb1:  response.data[0].imdb, 
                desc1:  response.data[0].description, 
                title2: response.data[2].title, 
                poster2: response.data[1].image, 
                imdb2:  response.data[1].imdb, 
                desc2: response.data[1].description, 
                title3: response.data[2].title, 
                poster3: response.data[2].image,
                imdb3:  response.data[2].imdb, 
                desc3:  response.data[2].description
            })
        }).catch((err) => {
            console.log(err)
        })
        this.props.resetMovieSelect()
        count = 0;
    }

    getSchedule = () => {
        axios.get(API_URL_1 + "/schedule")
        .then(response => {
            this.setState({schedule: response.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    onScheduleClick(param){
        if(this.props.auth.username !== ""){
            this.setState({time: param.time, seats: param.seats, studio: param.studio, price: param.price, id: param.id})
        }
        else{
            alert("Sign in first to begin booking")
            this.props.history.push("/SignIn") 
        }
    }

    onSeatClickTrue(number){
        this.state.seats[number] = true;
        this.setState({})
        console.log(number)
        console.log(this.state.seats[number])
        count++
        console.log(count)
    }

    onSeatClickFalse(number){
        this.state.seats[number] = false;
        this.setState({})
        console.log(number)
        console.log(this.state.seats[number])
        count--
        console.log(count)
    }
    
    onBackClick(){
        this.setState({...INITIAL_STATE})
        this.componentWillMount();
    }

    renderScheduleButton(){
        return (
            this.state.schedule.map(data => 
                <ScheduleButton key={data.id} id={data.id} time={data.time} seats={data.seats} clickSchedule={() => this.onScheduleClick(data)}/>)
        )    
    }

    renderCarousel(){
        return (
            <CarouselMovies/>
        )
    }

    renderSeats(){
        var num = 0
        if(this.state.id === 1){
            return (this.state.seats.map(data => 
                <Seats key = {num} id={this.state.id} booked={data} index={num} seatClickTrue={(number)=>this.onSeatClickTrue(number)} seatClickFalse={(number)=>this.onSeatClickFalse(number)}>
                {num++}
                </Seats>))
        }
        if(this.state.id === 2){
            return (this.state.seats.map(data => 
                <Seats key = {"A"+num} id={this.state.id} booked={data} index={num} seatClickTrue={(number)=>this.onSeatClickTrue(number)} seatClickFalse={(number)=>this.onSeatClickFalse(number)}>
                {num++}
                </Seats>))
        }
        if(this.state.id === 3){
            return (this.state.seats.map(data => 
                <Seats key = {"B"+num} id={this.state.id} booked={data} index={num} seatClickTrue={(number)=>this.onSeatClickTrue(number)} seatClickFalse={(number)=>this.onSeatClickFalse(number)}>
                {num++}
                </Seats>))
        }
        if(this.state.id === 4){
            return (this.state.seats.map(data => 
                <Seats key = {"C"+num} id={this.state.id} booked={data} index={num} seatClickTrue={(number)=>this.onSeatClickTrue(number)} seatClickFalse={(number)=>this.onSeatClickFalse(number)}>
                {num++}
                </Seats>))
        }
        if(this.state.id == 5){
            return (this.state.seats.map(data => 
                <Seats key = {"D"+num} id={this.state.id} booked={data} index={num} seatClickTrue={(number)=>this.onSeatClickTrue(number)} seatClickFalse={(number)=>this.onSeatClickFalse(number)}>
                {num++}
                </Seats>))
        }
        if(this.state.id === 6){
            return (this.state.seats.map(data => 
                <Seats key = {"E"+num} id={this.state.id} booked={data} index={num} seatClickTrue={(number)=>this.onSeatClickTrue(number)} seatClickFalse={(number)=>this.onSeatClickFalse(number)}>
                {num++}
                </Seats>))
        }
    }
    

    renderPayment(){
        return(
            <div className="col-md-5">
            <table className="table table-bordered">
            <tbody>
                <tr>
                    <td className="text-left">Price per ticket:</td>
                    <td className="text-left">Rp. {this.state.price}</td> 
                </tr>
                <tr>
                    <th className="text-left">Total Payment:</th>
                    <td className="text-left">Rp. {this.state.price * count}</td>
                </tr>
            </tbody>
            </table>
                <input type="button" value="Submit Payment" className="btn btn-primary" onClick={()=>this.onPaymentClick()}/>
                <input type="button" value="Back" className="btn btn-danger" onClick={()=>this.onBackClick()}/>
            </div>
        )
    }

    onPaymentClick(){
        if(count !== 0){
            axios.get(API_URL_1 + "/movies/" + this.props.auth.studio)
            .then(response=>{
                axios.post(API_URL_1 + "/transactions",{
                    user: this.props.auth.username,
                    movie: response.data.title,
                    studio: this.state.studio,
                    time: this.state.time,
                    seats: count,
                    payment: this.state.price * count        
                }).then((res) => {
                    console.log(res)            
                })
                .catch((err) => {
                    console.log(err);
                    alert("ERROR!!")
                })
            }).catch((err) => {
                console.log(err);
                alert("ERROR!!")
            })
            
    
            axios.put(API_URL_1 + "/schedule/" + this.state.id,{
                id: this.state.id,
                studio: this.state.studio,
                time : this.state.time,
                price : this.state.price,
                seats: this.state.seats
            }).then((res) => {
                console.log(res)
                this.props.history.push("/TransactionHistory")
                var output = "Transaction Successful!!\nYour total was: Rp." + this.state.price * count
                alert(output)
                this.setState({...INITIAL_STATE})
                this.props.resetMovieSelect()
            })
            .catch((err) => {
                console.log(err);
                alert("ERROR!!")
            })
        }
        else{
            alert("No seat has been selected")
        }   
    }

    renderStudio1(arr){
        var output = []
        for(var i =0; i <2; i++){
            output.push(arr[i])
        }

        return output
    }
    renderStudio2(arr){
        var output = []
        for(var i =2; i <4; i++){
            output.push(arr[i])
        }

        return output
    }
    renderStudio3(arr){
        var output = []
        for(var i =4; i <6; i++){
            output.push(arr[i])
        }

        return output
    }
    renderPage(){
        if(this.props.auth.studio === ""){
           return (
               <section className="content">
                <h1 className="badge btn-info font-bold">NOW PLAYING</h1>
                <div>
                    {this.renderCarousel()}
                </div>
                </section>
        )
        }
        if(this.props.auth.studio === 1){
            return (
                <section className="container box  ">
                    <div className="col-md-4 pull-left">
                        <img src={this.state.poster1} style={{width: 400, height:200}}/>
                        <div className="text-justify">Summary: {this.state.desc1}</div>
                        <div><a href={this.state.imdb1}><input type="button" className="btn btn-warning" value="IMDB" href={this.state.imdb1}/></a></div>
                    </div>
                    <div className="col-md-8">
                        <div className="col-md-7">
                            <div className="col-md-5">Please select a showtime:
                            {this.renderStudio1(this.renderScheduleButton())}
                            </div>
                            <div className="col-md-7">
                            {this.renderSeats()}
                            </div>
                        </div>
                        <div div className="pull-right col-md-5">
                            {this.renderPayment()}  
                        </div>
                    </div>
                </section>
                )
        }
        if(this.props.auth.studio === 2){
            return (
                <section className="container box  ">
                <div className="col-md-4 pull-left">
                    <img src={this.state.poster2} style={{width: 400, height:200}}/>
                    <div className="text-justify">Summary: {this.state.desc2}</div>
                    <div><a href={this.state.imdb2}><input type="button" className="btn btn-warning" value="IMDB" href={this.state.imdb2}/></a></div>
                </div>
                <div className="col-md-8">
                    <div className="col-md-7">
                        <div className="col-md-5">Please select a showtime:
                        {this.renderStudio2(this.renderScheduleButton())}
                        </div>
                        <div className="col-md-7">
                        {this.renderSeats()}
                        </div>
                    </div>
                    <div div className="pull-right col-md-5">
                        {this.renderPayment()}  
                    </div>
                </div>
            </section>
                )
        }
        if(this.props.auth.studio === 3){
            return (
                <section className="container box  ">
                <div className="col-md-4 pull-left">
                    <img src={this.state.poster3} style={{width: 400, height:200}}/>
                    <div className="text-justify">Summary: {this.state.desc3}</div>
                    <div><a href={this.state.imdb3}><input type="button" className="btn btn-warning" value="IMDB" href={this.state.imdb3}/></a></div>
                </div>
                <div className="col-md-8">
                    <div className="col-md-7">
                        <div className="col-md-5">Please select a showtime:
                        {this.renderStudio3(this.renderScheduleButton())}
                        </div>
                        <div className="col-md-7">
                        {this.renderSeats()}
                        </div>
                    </div>
                    <div div className="pull-right col-md-5">
                        {this.renderPayment()}  
                    </div>
                </div>
            </section>
                )
        }
        
    }

    render(){
        console.log(this.props.auth)
        console.log(this.state.movies)
        console.log(this.state.seats)
              
        return(
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    return {auth};
}
export default connect(mapStateToProps, {resetMovieSelect})(HomePage);