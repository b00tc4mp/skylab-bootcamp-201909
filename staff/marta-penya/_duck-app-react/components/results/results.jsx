function Results({duckslist, onClickItem, onGoFav}){


   const list =  duckslist.map((duck,i) => 
       
       <ResultItem key={i.toString()} onGoDetail={onClickItem} item={duck} onFav={onGoFav} /> 
   ) 
  
    return <ul className="item-list"> {list}  
    </ul>
    
}

