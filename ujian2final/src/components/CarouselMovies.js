import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {API_URL_1} from '../supports/api-url/apiurl.js'
import { Carousel } from 'react-responsive-carousel';
import {onMovieSelect} from '../actions'
// import image1 from '../images/6624960f0062bd8b8845037c6776277c.jpg'
// import image2 from '../images/HDOS_Bilbo_INTL.jpg'
// import image3 from '../images/doctor-strange-1.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'


class CarouselMovies extends Component{

    state = { movies: [], title1: "", poster1: "", title2: "", poster2: "", title3: "", poster3: ""}
    componentWillMount(){
        axios.get(API_URL_1 + "/movies")
        .then(response => {
            this.setState({
                movies: response.data,
                title1: response.data[0].title,
                poster1: response.data[0].image,
                title2: response.data[1].title,
                poster2: response.data[1].image,
                title3: response.data[2].title,
                poster3: response.data[2].image
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    movieSelect(input){
        this.props.onMovieSelect(input);
    }

    render(){
        console.log(this.state.movies)
        return(
            <div>
                <Carousel  showThumbs = {false} useKeyboardArrows={true} infiniteLoop={true} autoplay={true} className="container kucing" >
                <div onClick={()=> this.movieSelect(1)}>
                    <img src = {this.state.poster1} />
                    <p className="legend">{this.state.title1}</p>
                </div>
                <div onClick={()=> this.movieSelect(2)}>
                    <img src = {this.state.poster2}/>
                    <p className="legend">{this.state.title2}</p>
                </div>
                <div onClick={()=> this.movieSelect(3)}>
                    <img src = {this.state.poster3}/>
                    <p className="legend">{this.state.title3}</p>
                </div>
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    return {auth};
}
export default connect(mapStateToProps, {onMovieSelect})(CarouselMovies);