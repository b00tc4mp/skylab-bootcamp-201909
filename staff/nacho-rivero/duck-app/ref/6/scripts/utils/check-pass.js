debugger
function checkPass(username, password){

    var validUser = false;

     if (username == "Donald" && password == "Duck") { 

        validUser = true;
        
    } else if (username !== 'Donald') {              
    
        error.message = 'Non valid username';

    } else if (password !== 'duck') {

       error.message = 'Non valid password';
    }
    
    return validUser;

   /*  if (form.id.value=="Donald" && form.pass.value=="Duck") { 


    } else if (form.username.value !== 'Donald') {              
    
        error.message = 'Non valid username';

    } else if (form.password.value !== 'duck') {

       error.message = 'Non valid password';
    } */
    
}


