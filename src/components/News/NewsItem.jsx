import React from 'react'

const NewsItem = (props) => {

    let { title, description, imgurl, newsurl, author, date, source } = props
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-warning" style={{color: 'black'}}>{source}</span>
                </div>
                <img src={!imgurl ? "https://www.northampton.ac.uk/wp-content/uploads/2018/11/default-svp_news.jpg" : imgurl} className="card-img-top" style={{ maxHeight: '200px' }} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author ? 'Uknown' : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem