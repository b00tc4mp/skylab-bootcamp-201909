function listEpisodes(season, callback) {
    if (typeof season !== 'string') throw new TypeError(season + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', undefined, 'https://www.breakingbadapi.com/api/episodes/', undefined, (result) => {
        if (result.name == 'error') return callback(new Error('Incorrect query'))
        if (result.length === 0) return callback(new Error('No result for this query'))

        // if (result.series === 'Breaking Bad' && result.season.trim() === season) {

        //     const url = 'https://api.themoviedb.org/3/tv/1396/season/' + result[0].season.trim() + '/episode/' + result[0].episode.trim() + '/images?api_key=df85ebd060b729d2c1cd44580c111dea'

        //     call('GET', undefined, url, undefined, result2 => {
        //         if (result.name == 'error') return callback(new Error('Incorrect query'))
        //         if (result.length === 0) return callback(new Error('No result for this query'))

        //         let breaking = []
        //         result.forEach(function (episode) {
        //                 if (episode.series === 'Breaking Bad' && episode.season.trim() === season) {
        //                     breaking.push(episode)
        //                 }
        //             })

        //         if (result2.stills.length > 0) episode.imageUrl = 'https://image.tmdb.org/t/p/original' + result2.stills[0].file_path

        //         callback(undefined, breaking)
        //     })
        // }
        // else {
        //     callback(new Error('No result for this query'))
        // }

        let breaking = []
        result.forEach(function (episode) {
            if (episode.series === 'Breaking Bad' && episode.season.trim() === season) {

                const url = 'https://api.themoviedb.org/3/tv/1396/season/' + episode.season.trim() + '/episode/' + episode.episode.trim() + '/images?api_key=df85ebd060b729d2c1cd44580c111dea'

                call('GET', undefined, url, undefined, result2 => {
                    if (result.name == 'error') return callback(new Error('Incorrect query'))
                    if (result.length === 0) return callback(new Error('No result for this query'))

                    breaking.push(episode)
                    breaking.sort((a, b) => a.episode_id - b.episode_id)

                    if (result2.stills.length > 0) episode.imageUrl = 'https://image.tmdb.org/t/p/original' + result2.stills[0].file_path
                    callback(undefined, breaking)
                })


            }
        })
    })
}