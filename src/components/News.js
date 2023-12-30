import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    componentDidMount() {
        console.log("componentDidMount")
        this.getData();
    }
    async getData() {
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8005f64c005e49b8aa341f96c13726d2&page=${page}&pageSize=${this.props.pageSize}`;
      const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8005f64c005e49b8aa341f96c13726d2&page=${this.state.page}&pageSize=20`;
        const data = await fetch(url);
        const result = await data.json();
        // console.log(result.articles);
        // this.setState(result)
        this.setState({ articles: result.articles, totalResults: result.totalResults });
        // console.log(this.state.articles)
    }

    handlePrevClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8005f64c005e49b8aa341f96c13726d2&page=${this.state.page - 1}&pageSize=20`;
        const data = await fetch(url);
        const result = await data.json();
        this.setState({
            articles: result.articles,
            page: this.state.page - 1
        });
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8005f64c005e49b8aa341f96c13726d2&page=${this.state.page + 1}&pageSize=20`;
            const data = await fetch(url);
            const result = await data.json();
            this.setState({
                articles: result.articles,
                page: this.state.page + 1
            });
        }
    }

    render() {
        return (
            <div className='container my-4'>
                <h2 className='text-center'>Top Headlines</h2>
                <div className='row'>
                    {this.state.articles.map((news) => 
                         <div key={news.url} className='col-md-4'>
                            <NewsItem newsUrl={news.url} title={news.tite ?? news.title.slice(0, 15)} description={news.description && news.description.slice(0, 88)} imageUrl={!news.urlToImage ? 'https://media.assettype.com/bloombergquint%2F2023-11%2Fa24657ee-ce40-409f-9fa4-613c28626c61%2Fbreakslow_iGEivm_lkdQ_unsplash.jpg?w=1200&auto=format%2Ccompress&ogImage=true' : news.urlToImage} />
                            {/* <NewsItem newsUrl={news.url} title={news.title} description={news.description} imageUrl={news.urlToImage} /> */}
                        </div>
                    )}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
