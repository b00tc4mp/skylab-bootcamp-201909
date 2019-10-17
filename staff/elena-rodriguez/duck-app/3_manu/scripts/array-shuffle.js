//método para hacer el shuffle(coger items random..)

//en caso de que shuffle no esté definido...
if (typeof Array.prototype.shuffle === 'undefined')
    //lo definimos. 
        Array.prototype.shuffle = function () {
        var result = [];
        //this hace referencia al array
        for (var i = 0; i < this.length; i++) result[i] = this[i];
        //metemos los items del array en el nuevo array result de forma random.
        for (var i = 0; i < result.length; i++) {
            
            var random = Math.floor(Math.random() * result.length);
           
            var value = result[i];
            
            result[i] = result[random];

            result[random] = value;
        }

        return result;
    };