import React from 'react'
import {Component} from 'react';
import axios from "axios"
import ReactDOM from 'react-dom';


export default class PdfFile extends Component{
    constructor(props) {
        super(props);
        // const apiendpoint = this.props.location.pathname;
        this.state = {
            bookName:'',
            author:'',
            genre:'',
            bookUri: '',
            imageUri:'',
            description:''
        }
    }
    //https://drive.google.com/uc?export=view&id=1k39obE9zdCtsVy6gFkm4TPWfJtOApfg1
    //https://drive.google.com/file/d/1k39obE9zdCtsVy6gFkm4TPWfJtOApfg1/view?usp=sharing
    componentDidMount(){
        console.log("INSIDE PDF PAGE")
        console.log(this.props.location.pathname)
        const path = this.props.location.pathname
        const uniqueId = path.split("/")[2]
        // console.log(id)
        // const uniqueId = this.props.id;
        console.log(this.props.id)
        
        let apiSearchEndpoint = 'http://localhost:8050/api/v1/books/';
        apiSearchEndpoint+=uniqueId;
        axios.get(apiSearchEndpoint)
            .then(response =>response.data)
            .then((data)=>{
                console.log("here")
                console.log(data)    
                this.setState({
                    
                    bookName:data.name,
                    author:data.author,
                    genre:data.genre,
                    imageUri:data.bookImage,
                    bookUri:data.format.pdf.url,
                    description:data.description
                    });  
                    console.log(data)     
            })
           
                
    }

    componentWillUnmount(){
        var name = document.getElementsByClassName("pdf-book-view")
        console.log("check for name here")
        console.log(name.contentWindow)
                var currentPageNum
                // if ( name.contentDocument ) {
                //     currentPageNum= name.contentDocument.getElementById('pageNumber').value;
                //     console.log("inside")
                // }

                console.log("the page number is")
                var doc = this.getDOMNode().contentDocument;
                console.log(doc);
                console.log("up")

                // var name = React.findDOMNode(this.refs.cpDev1).value;
              
    }

    render(){
        return (
            <div>
                
                <h2 className = "book-name">{this.state.bookName}</h2>
                <h3 className = "author-name">{this.state.author}</h3>
                <h6 className = "audio-book-genre">{this.state.genre}</h6>
                <iframe  src={this.state.bookUri} class="pdf-book-view"  value = "hi" ref = "iframe"></iframe>
                <div>
                    <h5 className="book-recommendation-heading">Description</h5>
                    <p className = "audio-description">
                        {this.state.description}
                    </p>
                </div>
                <div>
                    <hr className ="audio-page-hr"/>
                </div>
                <h6 className="book-recommendation-heading">YOU MAY ALSO LIKE:</h6>
                <div className="recommendation-div">

                </div>
            
            </div>
        );
    }

}
