import React from 'react'
import './index.sass'

export default function(){
    return <section className="editwish hidden">
    <section className="editwish__header">
        <h1 className="editwish__title">My Wishes</h1>
        <section className="editwish__buttons">
            <button className="editwish__btn"> My Wishes </button>
            <button className="editwish__btn"> Add a Wish </button>
        </section>
    </section>
    <section className="editwish__content">
        <form className="editwish__form">
            <label>Title</label>
            <input className="editwish__field" type="text" name="name" placeholder="name"/>
            <label>Image</label>
            <input type="file" name="pic" accept="image/*"/>
            <label>Price</label>
            <input className="editwish__field" type="text" name="price" placeholder="price"/>
            <label>Link</label>
            <input className="editwish__field" type="text" name="link" placeholder="online shop"/>
            <label>Description</label>
            <textarea rows="4" cols="50" className="editwish__description"></textarea>
            <button className="editwish__submit">Save</button>
        </form>
    </section>
</section>
}