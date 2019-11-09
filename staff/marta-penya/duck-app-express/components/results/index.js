module.exports =function({items, onItemRender}){

    return `<ul className="item-list"> 
        ${items.map(item => onItemRender(item)).join('')} 
    </ul>`    
}

