import React from 'react'
import {Bar} from 'react-chartjs-2'

export default function Chart(props) {

    const barData =  {
        yearData: {
            labels:[2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
            datasets:[{
                label:'No. of Articles Published',
                labelColor:'#000',
                data: props.chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(0, 201, 90, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(255, 215, 0, 0.2)'
                ],
                borderColor: '#000',
                borderWidth: 2

                
            }]
        }
   }
        
        if(props.status){

            return (
                <div className="Chart">
                <Bar
                data={barData.yearData}
                width={100}
                height={50}
                options={{ 
                    title:{
                        display: true,
                        text:'No. of Articles Published Every Year on this Topic',
                        fontSize: 25
                    },
                    legend:{
                        display:true,
                        position:'top',
                        align:'end',
                        labels:{
                            fontColor:"#000",
                            fontSize: 16,
                            backgroundColor:'#000'
                        }
                    }
                }}
              />
                </div>
            )
        }else{
            return(<div></div>)
        }
        
    }
