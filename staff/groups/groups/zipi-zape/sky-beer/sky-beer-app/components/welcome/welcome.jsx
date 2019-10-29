function Welcome (randomBeers) {

    return <>
        <section className="main__welcome welcome">
            <RandomBeers randomBeers={randomBeers}/>
            <Ranking />
        </section>
    </>
}