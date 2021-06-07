
import React from 'react';
class date extends React.Component {

    shouldComponentUpdate(){return false;}
    render(){
    let months = ["Jan","Fed","Mar",'Apr','May',"June",'July','Aug','Sep','Oct','Nov','Dec']
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var date =new Date();    
    return(
        <div className='date'>
            {date.getDate()}
            {days[date.getDay()]}
            
            {months[date.getMonth()]}
            {date.getFullYear()}
        </div>
    );
    }
}

export default date;
