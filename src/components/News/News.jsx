import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from './NewsItem'
import Spinner from '../Spinner/Spinner';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }


    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parseData = await data.json()
        props.setProgress(50)
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `News-Now - ${capitalize(props.category)}`
        updateNews()
        // eslint-disable-next-line
    }, [])


    // for buttons
    // const handlePrev = async () => {
    //     setPage(page - 1)
    //     updateNews()
    // }

    // const handleNext = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }
    //

    
    // for infinite scroll
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url)
        let parseData = await data.json()
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
    };
    //

    return (
        <>
            <h1 className='text-center' style={{ margin: '80px 0px 30px' }}>News-Now - Top headlines - <i>{capitalize(props.category)}</i></h1>
            {loading && <Spinner />}
            <InfiniteScroll dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {!loading && articles.map((element) => {
                            return <div key={element.url} className="col-md-4"><NewsItem title={element.title ? element.title.split(' ').slice(0, 6).join(' ') : ""}
                                description={element.description ? element.description.slice(0, 110) : ""}
                                imgurl={element.urlToImage} newsurl={element.url} author={element.author}
                                date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-around">
                    <button disabled={page <= 1} type="button" className="btn btn-dark btn-sm" onClick={handlePrev}>&#8656; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalArticles / props.pageSize)} type="button" className="btn btn-dark btn-sm" onClick={handleNext}>Next &#8658;</button>
                </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News