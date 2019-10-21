function retrieveDuck(id, callback) {

    if(typeof id !== 'id'){
        callback(new Error ('Argument is not a valid id'));
        return;
    }

    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, callback);
}