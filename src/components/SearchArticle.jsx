import React, { Component } from 'react'
import axios from 'axios'
import {Grid} from 'semantic-ui-react'
import ViewArticle from './ViewArticle'
import Chart from './Chart'



export default class SearchArticle extends Component {

    constructor() {
        super()
    
        this.state = {
            data: [] ,
            queryString: '',
            status: false,
            pageNumber: 0,
            loading:"",
            yearWiseArticlesPublished:[]


        
        }
    }

    //Search Field Change
   handleQueryStringChange = (event) =>{
            
            
            this.setState({
                queryString: event.target.value
            })
            
   }

   //Get Data for Next Page
   changeNextPageNumber = ()=>{
       const page = this.state.pageNumber +1

       this.setState({
           pageNumber: page,
           loading:"loading"
       },()=>{
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.queryString.toLowerCase()}&begin_date=20110101&end_date=20200410&sort=newest&page=${this.state.pageNumber}&api-key=xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei`)
        .then( res => this.setState({data: res.data.response.docs,status: true,loading:"" }))
       })

       
   }

//Get Data for Previous Page
   changePrevPageNumber = ()=>{
       if(this.state.pageNumber>0){
           const page = this.state.pageNumber -1
           this.setState({
               pageNumber: page,
               loading:"loading"
           },()=>{
            axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.queryString.toLowerCase()}&begin_date=20110101&end_date=20200410&sort=newest&page=${this.state.pageNumber}&api-key=xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei`)
            .then( res => this.setState({data: res.data.response.docs,status: true,loading:"" }))
           })
       }


   }

   //Receive Data For First Time
   getData = (event)=>{
        
        this.setState({
            loading:"loading",
            status:false
        },()=>{
            if(this.state.queryString!==""){
                let yearData = []
             axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.queryString.toLowerCase()}&begin_date=20110101&end_date=20200410&sort=newest&page=${this.state.pageNumber}&api-key=xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei`)
             .then( res => this.setState({data: res.data.response.docs,status: true, pageNumber:0 }))
             
             axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.queryString.toLowerCase()}&facet=true&facet_fields=pub_year&begin_date=20110101&end_date=20200410&p&api-key=xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei`)
             .then(res => {
                 let articles = res.data.response.facets.pub_year.terms
                 for(let i=2011;i<=2020;i++){
                 articles.forEach(element => {
                     let term = parseInt(element.term,10)
                         if(term === i){
                             yearData.push(element.count)
                             return true
                         }
                         })
                     }
                 }).finally(()=>{
                     this.setState({
                         yearWiseArticlesPublished: yearData,
                         loading:""
                     })
                 })
                 
     
            }
        })

        if(this.state.queryString===''){
            alert('Please enter the Article to be searched')
            this.setState({
                loading:''
            })
        }
     
       event.preventDefault();
   }
    

    render() {
        return (
            <div>
                    <Grid celled='internally'>
                    <Grid.Row>
                    
                    <Grid.Column width={3}>
                        <h3>THE NEW YORK TIMES</h3>
                        <hr/>
                        <h4>Dashboard</h4>
                        <h4>Analytics</h4>
                        <h4>Messages</h4>
                        <h4>Calender</h4>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <form onSubmit={this.getData}>
                            <div className="ui action input">
                                <input type="text" placeholder="Search Article" name='queryString' 
                                value={this.state.queryString} onChange={this.handleQueryStringChange} />

                                <button className="ui green inverted button" type='submit'>Search</button>
                            </div>
                        </form>
                        <hr/>
                        <ViewArticle render={this.state.data} 
                        nextPageNumber={this.changeNextPageNumber}
                        pageNumber={this.state.pageNumber} 
                        prevPageNumber={this.changePrevPageNumber}
                        loading={this.state.loading} 
                        status={this.state.status}/>
                        <Chart chartData={this.state.yearWiseArticlesPublished} status={this.state.status}/>
                        
                        
                        
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
            </div>
        )
    }
}
