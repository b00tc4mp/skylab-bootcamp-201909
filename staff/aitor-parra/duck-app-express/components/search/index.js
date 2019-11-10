const Feedback = require('../feedback')
const Results = require('../results')
const ResultItem = require('../result-item')


module.exports = function ({path, query, name, logout, error, results, favPath, detailPath}) {
    return `<section class="view search">
        <h1 class="search__title">Search</h1>
        <h2 class="search__user">${name}</h2><form method="POST" action="${logout}"><button class="search__logout">Logout</button></form>
        <form class="search__form" method="POST" action="${path}">
            <span class="search__icon">🐣</span>
            <input class="search__criteria" type="text" name="q" placeholder="criteria" ${query? `value=${query}` : '' }>
            <button class="search__submit">🔍</button>
        </form>

        ${error ? Feedback({ message: error}) : ''}
        ${results ? Results({ item: results, onItemRender: duck => ResultItem({ item: duck, favPath, detailPath }) }) : ''}

    </section>

`}

