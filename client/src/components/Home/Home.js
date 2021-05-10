import React from 'react'
import axios from 'axios'

class Home extends React.Component{ 
    constructor(){
        super()
        this.state={
            homepage:{}
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3005/hacker/allHackers')
        .then(response=>{
            console.log(response.data)
            this.setState(()=>({
                homepage:response.data
            }))
        })
        .catch(err=>{
            console.log(err)
        })

    }

    render(){
        return(
            <div>
                <h3>{this.state.homepage.name}</h3>
            </div>
        )
    }
}
export default Home