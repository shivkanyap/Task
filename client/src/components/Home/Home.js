import React from 'react'
import axios from 'axios'

class Home extends React.Component{ 
    constructor(){
        super()
        this.state={
            homepage:[]
        }
    }
    componentDidMount(){
        console.log('in mount')
        axios.get('http://localhost:3005/hacker/allHackers')
        .then(response=>{
            console.log(response.data,' in users hack')
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
                
                {
                    console.log(this.state.homepage)
                   
                //    this.state.homepage.map(item=>{
                //        return <h3>{item.name}</h3>
                //     })
                }
                <h3></h3>
            </div>
        )
    }
}
export default Home