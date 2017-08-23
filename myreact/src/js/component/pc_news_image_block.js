import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, BrowserHistory} from 'react-router';

export default class PCNewsImageBlock extends React.Component {

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
        /* 样式定义  */
        const styleImage = {
            width: this.props.imageWidth,
            height: '90px'
        };
        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        };

        const news = this.state.news;
        const newsList = news.length
            ? news.map((newsItem, index) => (
                <div key={index} class="imageNewsBlock">
                    <Link to={`details/${newsItem.uniquekey}`}>
                        <div class="custom-image">
                            <img src={newsItem.thumbnail_pic_s} alt="新闻图片" style={styleImage}/>
                        </div>
                        <div class="custom-card">
                            <h3 style={styleH3}>{newsItem.title}</h3>
                            <p>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>

            ))
            : '没有加载到任何新闻';

        return (
            <div className="new-block-container">
                <Card title={this.props.cardTitle} style={{width: this.props.cardWidth}}>
                    <div class="imageList">
                        {newsList}
                    </div>
                </Card>
            </div>
        )
    }

}