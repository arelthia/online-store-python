import React from 'react'
import { useLocation, Link } from 'react-router-dom';
const Breadcrumbs = () => {
    const location =useLocation();
    let currentLink = '';
    const crumbs = location.pathname.split("/").filter(crumb=> crumb !== '')
                    .map(crumb => {
                        currentLink =+ `/${crumb}`

                        return (
                            <div className="crumb" key={crumb}>
                                <Link to={currentLink}>{crumb}</Link>
                            </div>
                        )
                    });
                    console.log(crumbs)
  if (crumbs.length > 0){
    return (
        <div className='breadcrumbs'>
            <div className="crumb">
                <Link to="/">Home</Link>
            </div>
            {crumbs}
        </div>
      )
  }                  
  
//   return 
}

export default Breadcrumbs