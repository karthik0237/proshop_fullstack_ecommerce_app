import React from 'react'
import { Pagination,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Paginate({ page,totalPages,keyword='',isAdmin=false }) {

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    console.log('keywords:',keyword)

  return ( totalPages > 1 && <div>
        <Pagination>
            {[...Array(totalPages).keys()].map( (x) => (

            <Pagination.Item  as={Link}
            key={x + 1}
            to={ !isAdmin ? 
                `/?keyword=${keyword}&page=${x + 1}` :
               `/admin/productlist/?keyword=${keyword}&page=${x + 1}` } // appling search&pagination for admin productlist
            active= {x + 1 === page}>
                 {x + 1} 
                 </Pagination.Item> 
            
            ))}
        </Pagination>
        </div>
  )
}

export default Paginate
