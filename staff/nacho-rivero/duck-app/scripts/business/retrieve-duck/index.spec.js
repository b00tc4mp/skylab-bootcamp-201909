describe('retrieve duck', function(){

    it ('duck extraction taking too long', function(done){
        setTimeout(function(){
            done();}, 9000);
       
        })
    }); 
 
    it ('suposed not to retrieve empty',function(){
        var callback = jasmine.createSpy('callback');

        expect(callback).not.toHaveBeenCalledWith(jasmine.objectContaining({
            title: " "
        }));
    })