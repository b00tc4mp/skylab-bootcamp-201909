describe ("logic - search beers", () => {

    it ('should return an array of results searching by name', done => {
        searchBeers ('beer_name=pilsen', (error, results)=> {
            
            expect (error).toBeUndefined()
            expect (results).toBeDefined()

            expect (results.length).toBeGreaterThan(0)
            expect (results).toBeInstanceOf('Array')
            
            for (let i=0; i<results.length; i++) {
                expect (results[i]).toBeInstanceOf('Object')
                expect (results[i].name).contains('pilsen')
            }
        })
    })
})