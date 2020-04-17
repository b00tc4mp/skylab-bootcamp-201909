function Results({ items, onItemRender, error }) {
    return <div className="main__results _hidden">
                <ul className="results">
                    {items.map(item => onItemRender(item))}
                </ul>
                {error && <Feedback message={error} />}

            </div>
}