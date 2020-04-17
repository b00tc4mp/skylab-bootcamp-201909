describe('logic - get weather', () => {

    it('should succeed on giving weather', done => {
        getWeather(undefined, undefined, (error, result) => {
            if (result.error) return done(new Error(result.error))

            expect(error).toBeUndefined()
            expect(result).toBeDefined()
            expect(result.icon).toBeDefined()
            expect(result.summary).toBeDefined()
            done()
        })
    })

})