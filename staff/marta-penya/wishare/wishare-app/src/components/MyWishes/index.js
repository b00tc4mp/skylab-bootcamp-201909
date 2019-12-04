import React from 'react'
import './index.sass'

export default function({ onCreateWish }){
    return <section className="mywishes hidden">
    <section className="mywishes__header">
        <h1 className="mywishes__title">My Wishes</h1>
        <section className="mywishes__buttons">
            <button className="mywishes__btn"> My Wishes </button>
            <button className="mywishes__btn" onClick={event => { event.preventDefault(); onCreateWish() }}> Add a Wish </button>
        </section>
    </section>
    <section className="mywishes__wishes">
        <ul className="mywishes__list">
            <li className="mywishes__wish">
                <div className="mywishes__detail">
                    <img className="mywishes__wimage" src="https://fakeimg.pl/60x60/"/>
                    <span className="mywishes__price">Price</span>
                </div>
                <div className="mywishes__info">
                    <span className="mywishes__wname"> Title </span>
                    <p className="mywishes__wdescription">description plou i fa sol les bruixes es pentinen plou i
                        fa sol nanan asd loren</p>
                    <a className="mywishes__link"> Online Store </a>
                </div>
                <div className="mywishes__buttonscontainer">
                    <button className="mywishes__button">Edit</button>
                    <button className="mywishes__button">Remove</button>
                    <button className="mywishes__button">Given</button>
                </div>
            </li>
            <li className="mywishes__wish">
                <div className="mywishes__detail">
                    <img className="mywishes__wimage" src="https://fakeimg.pl/60x60/"/>
                    <span className="mywishes__price">Price</span>
                </div>
                <div className="mywishes__info">
                    <span className="mywishes__wname"> Title </span>
                    <p className="mywishes__wdescription">description plou i fa sol les bruixes es pentinen plou i
                        fa sol nanan asd loren</p>
                    <a className="mywishes__link"> Online Store </a>
                </div>
                <div className="mywishes__buttonscontainer">
                    <button className="mywishes__button">Edit</button>
                    <button className="mywishes__button">Remove</button>
                    <button className="mywishes__button">Given</button>
                </div>
            </li>
            <li className="mywishes__wish">
                <div className="mywishes__detail">
                    <img className="mywishes__wimage" src="https://fakeimg.pl/60x60/"/>
                    <span className="mywishes__price">Price</span>
                </div>
                <div className="mywishes__info">
                    <span className="mywishes__wname"> Title </span>
                    <p className="mywishes__wdescription">description plou i fa sol les bruixes es pentinen plou i
                        fa sol nanan asd loren</p>
                    <a className="mywishes__link"> Online Store </a>
                </div>
                <div className="mywishes__buttonscontainer">
                    <button className="mywishes__button">Edit</button>
                    <button className="mywishes__button">Remove</button>
                    <button className="mywishes__button">Given</button>
                </div>
            </li>
            <li className="mywishes__wish">
                <div className="mywishes__detail">
                    <img className="mywishes__wimage" src="https://fakeimg.pl/60x60/"/>
                    <span className="mywishes__price">Price</span>
                </div>
                <div className="mywishes__info">
                    <span className="mywishes__wname"> Title </span>
                    <p className="mywishes__wdescription">description plou i fa sol les bruixes es pentinen plou i
                        fa sol nanan asd loren</p>
                    <a className="mywishes__link"> Online Store </a>
                </div>
                <div className="mywishes__buttonscontainer">
                    <button className="mywishes__button">Edit</button>
                    <button className="mywishes__button">Remove</button>
                    <button className="mywishes__button">Given</button>
                </div>
            </li>
        </ul>
    </section>
</section>
}