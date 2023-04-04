import React, { useEffect, useState, useContext } from 'react'
import { Category } from '../Navbar/Navbar'
import Spinner from '../Spinner/Spinner'
import { PaginationControl } from 'react-bootstrap-pagination-control';



const AllNews = ({first}) => {

    const apiKey = process.env.REACT_APP_NEWS_API;

    const category = useContext(Category);

    const [page, setPage] = useState(1)
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)
    
    
    

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const NewsImg = "https://www.northampton.ac.uk/wp-content/uploads/2018/11/default-svp_news.jpg"

    const timeConversion = (date) => {
        const publishedAt = new Date(date);
        return `${publishedAt.toDateString()} ${publishedAt.toLocaleTimeString()}`;
    }

    const handlePage = (page) => {
        setPage(page)
    }

    const updateNews = async () => {
        try {
            let url1 = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=10`
            setLoading(true)
            let data = await fetch(url1)
            let parseData = await data.json()
            setNewsData(parseData.articles)
            setTotalResults(parseData.totalResults)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    // const queryNews = async () => {
    //     let url2 = `https://newsapi.org/v2/everything?q=${props.query}&sortBy=popularity&apiKey=${apiKey}`
    //     let req = new Request(url2)
    //     let data = await fetch(req)
    //     let newsData = await data.json()
    //     console.log(newsData)
    // }


    useEffect(() => {
        document.title = `News-Today - ${capitalize(category)}`

        updateNews()
        if (first){
            setPage(1)
        }
        // queryNews()
        // eslint-disable-next-line
    }, [category, page])

    return (
        <>
            <h1 className='text-center' style={{ margin: '90px 0px 15px' }}>News-Today - Top headlines - <i>{capitalize(category)}</i></h1>
            {loading && <Spinner />}
            <div className="container my-5" id="news_box">
                <div className="row m-0" style={{ gap: '15px' }}>
                    {!loading && newsData.map((news_info) => {
                        return (
                            <div className="card" key={news_info.url}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                        <img src={!news_info.urlToImage ? NewsImg : news_info.urlToImage} className="img-fluid rounded-start" style={{maxHeight: '280px'}} alt='News-Img' />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body h-15">
                                            <h5 className="card-title">{news_info.title}</h5>
                                            <p className="card-text">{news_info.description}</p>
                                            <div className='extra d-inline'>
                                                <p className="card-text m-0"><i><small className="text-muted"><b>Source-</b> {(news_info.source.name) === null ? 'Not Known' : news_info.source.name}</small></i></p>
                                                <p className="card-text"><i><small className="text-muted"><b>Publish At:</b> {timeConversion(`${news_info.publishedAt}`)}</small></i></p>
                                                <a href={news_info.url} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary position-absolute" style={{ bottom: '10px', right: '10px' }}>Go To Source</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <PaginationControl page={page} changePage={handlePage} total={totalResults} limit={10} ellipsis={1} />

        </>
    )
}

export default AllNews