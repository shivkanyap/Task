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
        const {id}=this.props.match.params.id
        console.log(id,'in hack id')
        axios.get(`http://localhost:3005/hacker/${id}`)
        .then(res=>{
            console.log(res.data,"particular id data")
            this.setState(()=>({
                hackerinfo:res.data
            }))
        })
    }
    render(){
        return(
            <div>
                {console.log(this.state.hackerinfo,'info')}
                <h3>hello</h3>
            </div>
        )
    }
}
export default Hackerdata