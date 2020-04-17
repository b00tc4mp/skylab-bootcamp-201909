if (!Object.getOwnPropertyDescriptor(Location.prototype, 'hash'))
    // Object.defineProperties(Location.prototype, {
    //     query: {
    //         set(query) {
    //             const { protocol, host, pathname } = this
    //             const url = `${protocol}//${host}${pathname}?q=${query}`
    //             history.pushState({ path: url }, '', url)
    //         },

    //         get() {
    //             const { search } = this
    //             return search && search.includes('q=') ? search.split('q=')[1] : undefined
    //         }
    //     }
    // })
    Object.defineProperty(Location.prototype, 'hash', {
        set(hash) {
            const { protocol, host, pathname } = this
            const url = `${protocol}//${host}${pathname}?q=${hash}`
            history.pushState({ path: url }, '', url)
        },

        get() {
            const { search } = this
            return search && search.includes('q=') ? search.split('q=')[1] : undefined
        }
    })