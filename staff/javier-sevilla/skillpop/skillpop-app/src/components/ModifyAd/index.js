import React from 'react'
import './index.sass'

export default function ({ ad: { id, title, price, description }, onUpdateAd }) {
    return <section className='modifyAd'>
        <h2 className="modifyAd__title">Modify AD</h2>
        <form className="modifyAd__form" onSubmit={function (event) {
            event.preventDefault()

            const { file: { files : [image]}, title: { value: title }, price: { value: price }, description: { value: description } } = event.target

            onUpdateAd(image, id, title, description, price)
            }}>
            <label>Title</label>
            <input type="text" className="modifyAd__titlead" name="title" placeholder={title}/>
            <label>Price</label>
            <input type="number" className="modifyAd__price" name="price" placeholder={price}/>
            <label>Description</label>
            <textarea name="description" className="modifyAd__field" cols="28" rows="15"
                placeholder={description}></textarea>
            <h2 className="modifyAd__title2">Add Image</h2>
            <input type="file" name="file" accept="image/*"/>
            <button className="modifyAd__button">Submit</button>
        </form>
    </section>
}