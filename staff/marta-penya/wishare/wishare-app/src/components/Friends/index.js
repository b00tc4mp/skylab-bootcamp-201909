import React from 'react'
import './index.sass'

export default function(){
    return <section className="friends">
    <section className="friends__header">
        <h1 className="friends__title">Friends</h1>
        <section className="friends__buttons">
            <button className="friends__btn"> Your friends</button>
            <button className="friends__btn"> Find friends</button>
        </section>
    </section>

    <ul className="friends__list">
        <a className="friends__link">
            <li className="friends__item">
                <div className="friends__info">
                    <span className="friends__name"> Marta </span>
                    <img className="friends__photo" src="https://fakeimg.pl/60x60/" alt="pending wishes"/>
                    <button className="friends__delete"> Delete friend</button>
                </div>
                <div className="friends__wishes">
                    <ul className="friends__wisheslist">
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                    </ul>

                </div>
            </li>
        </a>
        <a className="friends__link">
            <li className="friends__item">
                <div className="friends__info">
                    <span className="friends__name"> Marta </span>
                    <img className="friends__photo" src="https://fakeimg.pl/60x60/" alt="pending wishes"/>
                    <button className="friends__delete"> Delete friend</button>
                </div>
                <div className="friends__wishes">
                    <ul className="friends__wisheslist">
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                    </ul>

                </div>
            </li>
        </a>
        <a className="friends__link">
            <li className="friends__item">
                <div className="friends__info">
                    <span className="friends__name"> Marta </span>
                    <img className="friends__photo" src="https://fakeimg.pl/60x60/" alt="pending wishes"/>
                    <button className="friends__delete"> Delete friend</button>
                </div>
                <div className="friends__wishes">
                    <ul className="friends__wisheslist">
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="friends__wish"/>
                        </li>
                    </ul>

                </div>
            </li>
        </a>
    </ul>

</section>
}