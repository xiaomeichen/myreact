import React from 'react';
import {Row,Col} from 'antd';
import {Router, Route, Link, BrowserHistory} from 'react-router';

export default class MobileList extends React.Component {

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
                <section  key={index} className="m_article_container clear">
                    <Link  to={`details/${newsItem.uniquekey}`}>
                        <div className="m_article_image">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                        </div>
                        <div className="m_article_des">
                            <p className="m_title">{newsItem.title}</p>
                            <p>
                                <span className="m_type">{newsItem.realtype}</span>
                                <span className="m_date">{newsItem.date}</span>
                            </p>
                        </div>
                    </Link>
                </section>
            ))
            : '没有加载到任何新闻';

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        )
    }

}