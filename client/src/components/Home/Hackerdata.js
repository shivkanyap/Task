import React from 'react'
import axios from 'axios'

class Hackerdata extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hackerinfo:{}

        }
       
    }
    
    componentDidMount(){
        const id=this.props.match.params.id
        
        axios.get(`http://localhost:3005/hacker/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(res=>{
            console.log(res.data,"particular id data")
            this.setState(()=>({
                hackerinfo:res.data
            }))
        })
        
    }
    render(){
        const {hackerinfo}=this.state
        return(
            <div>
               
                <h3>Name : {hackerinfo.name}</h3>
                <h4>Location : {hackerinfo.location}</h4>
                <h4>Followers :{hackerinfo.followers} </h4>
                <h4>Following :{hackerinfo.following}</h4>
                
            </div>
        )
            
        
    }
}
export default Hackerdata