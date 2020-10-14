import {Icon} from '@iconify/react';

const ChartCard = ({results, logo}) =>{
    
    return(
        <>
            { results ? (
            <div className="text-center">
                <h3 className=" mb-2" style={{color:'#6c757d !important',textTransform: 'uppercase',letterSpacing:'.02em',fontSize: '1.2rem',marginTop: '1rem'}}>{results[0].segment_name}</h3> 
             
                <div className="text-center padd-box-text">
                <Icon icon={logo} style={{fontSize: "60px"}}/>
                <h2 className="my-2 mb-3 text-big" id="active-users-count">{new Intl.NumberFormat("en-US").format(results[0].unique_cookies)}</h2>
                </div>
             </div>
            ):(null)

            }
        </>
    );
}

export default ChartCard;

//rojo #FF455F