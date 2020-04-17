function Feedback({ message }) {
    return <section className="error">
        <div className="error__gif-container">
            <iframe src="https://giphy.com/embed/3o6ZsXFlVD1yHgxusE" className="giphy-embed" allowFullScreen></iframe>
        </div>
        <p className="error__message">{message}</p>
    </section>
}

