import React, { useState, createContext } from 'react'
import logo from '../../assets/logo.png'
import AllNews from '../News/AllNews';
import './Navbar.css'

const categories = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
]

const Category = createContext();

const Navbar = () => {

    const [category, setCategory] = useState('general');
    const [input, setInput] = useState('')
    const [query, setQuery] = useState(input)
    let page = 2;
    const [first, setfirst] = useState('')

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const handleSubmit = () => {
        if (input !== "" )
            setQuery(input)
            console.log(input)
    }

    return (
        <Category.Provider value={category}>
            <nav className="navbar fixed-top navbar-expand-lg bg-info pt-0">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex justify-content-center align-items-center cursor-pointer" value={category} to="/general">
                        <img src={logo} alt="logo" width="40%" className="d-inline-block align-text-top pe-3" />
                        NEWS-TODAY
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="me-auto mb-2 mb-lg-0">
                            <div className="">
                                <select name='filter' className="dropdown-item c_item" onChange={e=>{setfirst (e.target.value); setCategory (e.target.value)}} value={category}>
                                    {
                                        categories.map((category, cate) => {
                                            return <option className="" value={category} key={cate}>{capitalize(category)}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </form>
                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input className="form-control me-2" type="search" id='input' name='input' value={input} placeholder="Search News ..." onChange={e => setInput(e.target.value)} autoComplete='off' />
                            <button className="btn btn-outline-success" type="submit" id='search_btn' name='search_btn'>Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <AllNews  first={first}/>
        </Category.Provider>
    )
}

export default Navbar;
export { Category };