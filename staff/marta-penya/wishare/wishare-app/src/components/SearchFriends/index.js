import React from 'react'
import './index.sass'

export default function(){
    return <section className="searchf hidden">
    <section className="searchf__header">
        <h1 className="searchf__title">Friends</h1>
        <section className="searchf__buttons">
            <button className="searchf__btn"> Your friends</button>
            <button className="searchf__btn"> Find friends</button>
        </section>
    </section>

    <section className="searchf__search">
        <span className="searchf__searchtitle">Find your friends by username or e-mail adress</span>
        <input className="searchf__searchinput" type="search" id="search" name="q"/>
        <button className="searchf__searchbtn">Search</button>
    </section>

    <ul className="searchf__list">
        <a className="searchf__link">
            <li className="searchf__item">
                <div className="searchf__info">
                    <span className="searchf__name"> Marta </span>
                    <img className="searchf__photo" src="https://fakeimg.pl/60x60/" alt="pending wishes"/>
                    <button className="searchf__add"> Add friend</button>
                </div>
                <div className="searchf__wishes">
                    <ul className="searchf__wisheslist">
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="searchf__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="searchf__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="searchf__wish"/>
                        </li>
                        <li>
                            <img src="https://fakeimg.pl/60x60/" alt="pending wishes" className="searchf__wish"/>
                        </li>
                    </ul>

                </div>
            </li>
        </a>
    </ul>

</section>
}