import React from 'react';
import {Card } from 'antd';
import {Router, Route, Link, BrowserHistory} from 'react-router';

export default class PCNewsBlock extends React.Component {

    constructor() {
        super();
        this.state = {news: ''};
    }

    /*  组件加载前请求数据  */
    componentWillMount() {
        let myFetchOption = {
            method: "get"
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({news: json})
            })
    }

    render() {
        const news = this.state.news;
        const newsList = news.length
            ? news.map((newsItem,index)=>(
                <li key={index}>
                    <Link target="_blank" to={`details/${newsItem.uniquekey}`}>
                        {newsItem.title}
                        <span class="news-author">{newsItem.author_name}</span>
                    </Link>
                </li>
            ))
            : '没有加载到任何新闻';

        return (
            <div className="new-block-container">
                <Card bordered={false}>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }

}