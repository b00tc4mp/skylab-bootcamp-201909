function videoUrl (key){
    while (key.length<4){
        key='0'+key
    }
    return key
}