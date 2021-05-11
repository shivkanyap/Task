import React from 'react'
import axios from 'axios'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
import Hackerdata from './Hackerdata'
import '../../App.css'

class Home extends React.Component{ 
    constructor(){
        super()
        this.state={
            homepage:[]
        }
    }
    componentDidMount(){
       
        axios.get('http://localhost:3005/hacker/allHackers',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            
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
                        
                   { this.state.homepage && this.state.homepage.map(item=>{
                       return(
                        <tr>

                            <td><Link  to={`/hacker/${item._id}`}>{item.name}</Link></td>
                            <td className=".mian-image-first">{item.photo!=='null'?<img src={`uploads/${item.photo}`}/>:''}</td>
                            
                        </tr>

                       ) 
                         
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