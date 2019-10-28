function Feedback({ message }) {
    return <section className="feedback">
        <img src="https://i.giphy.com/media/5vUN5E5et4MSjEoSbi/200.gif" className="feedback__img"/>
        <p className="feedback__message">{message}</p>
    </section>
}