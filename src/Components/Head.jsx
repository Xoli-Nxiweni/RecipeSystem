import React from 'react'
import './Head.css'

export const Head = () => {
  return (
    <div className="head">
        <h1>Tastebyte</h1>
        <div className="Pages">
            <select name="Category">
                <option>Homepage</option>
            </select>
            <select name="Category">
                <option>Recipe Page</option>
            </select>
            <select name="Category">
                <option>Pages</option>
            </select>
            <select name="Category">
                <option>Buy</option>
            </select>
        </div>
    </div>
  )
}
