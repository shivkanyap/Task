import React from 'react'
import axios from 'axios'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
import Hackerdata from './Hackerdata'

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
                    <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        
                            
                            <th>NAME</th>
                            <th>Photo</th>
                            
                        
                        </tr>
                    </thead>
                    <tbody>
                        
                   { this.state.homepage.map(item=>{
                       return(
                        <tr>
                            
                           
                            <td><Link  to={`/hacker/${item._id}`}>{item.name}</Link></td>
                            <td>{item.photo!=='null'?<img src={`uploads/${item.photo}`}/>:''}</td>
                            
                         
                    </tr>

                       ) 
                       
                                // <td>22</td>
                    }) }  
                    </tbody>
                   
                    </table>
                }
                <Route path="/hacker/:id" component={ Hackerdata }/>
            </div>
        )
    }
}
export default Home