import React from 'react'


export default function ViewArticle(props) {


    if(props.status){
        const articles = props.render

        const article = articles.map((article)=>{

            const theDate = new Date( Date.parse(article.pub_date));

            let input = article.abstract
                if(input.length>75){
                 input = input.substring(0,75)+'...'
                }
             
             let url = article.web_url
                if(url.length>30){
                url = url.substring(0,30)+'...'
                }

                    return (<tr key={article._id}>
                        <td className="two wide">{theDate.toLocaleDateString()}</td>
                        <td className="four wide">{article.headline.main}</td>
                        <td className="four wide">{input}</td>
                        <td className="four wide"><a rel="noopener noreferrer" href={article.web_url} target='_blank'>{url}</a></td>
                        <td className="two wide">{article.source}</td>
                        </tr>)
                })

  
 

        return (
            <div className="container">
            <div className='ui violet ribbon label'>
                <h4>Page:  <span className={`ui basic white inverted ${props.loading} mini button`}>{props.pageNumber}</span></h4>
            </div>
            <table className="ui celled striped table">
            <thead>
                <tr>
                <th>Published Date</th>
                <th>Headline</th>
                <th>Summary</th>
                <th>URL</th>
                <th>Source</th>
                </tr>
            </thead>
            <tbody>
                    {article}
            </tbody>
            </table>
            
          
            <div>
            <button className="ui labeled icon inverted secondary button" onClick={props.prevPageNumber}>
                <i className="left arrow icon"></i>
                Prev
            </button>
            <button className="ui right labeled icon inverted secondary button" onClick={props.nextPageNumber}>
                <i className="right arrow icon"></i>
                Next
             </button>
            </div>
            
            <hr/>
            </div>
        )
    }else{
        return(<div className="start">
                    <h1>Search for breaking news from across the world, across the times.</h1>
                    <img src="https://img.icons8.com/nolan/512/news.png" alt='newspaper icon'/>
                    
            </div>)
    }
   
}
