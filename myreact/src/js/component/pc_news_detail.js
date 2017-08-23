import React from 'react';
import {Row, Col} from 'antd';
import PCNewsImageBlock from './pc_news_image_block';

/*  自定义组件 */
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCNewsDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        }
    }

    componentDidMount() {
        let myFetchOption = {
            method: 'get'
        };

        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + this.props.params.uniquekey, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem:json})
            })
    }

    /*  从API获取的数据赋值给页面 */
    createArticle() {
        return {__html: this.state.newsItem.pagecontent}
    }

    render() {
        return (
            <div>
                <PCHeader/>
                <div>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={12} class="p_detail_container">
                            <div class="p_detail_article" dangerouslySetInnerHTML={this.createArticle()}>
                            </div>
                        </Col>
                        <Col span={8}>
                            <PCNewsImageBlock cardTitle="娱乐头条" type="yule" count="20" imageWidth="120px" cardWidth="100%"/>
                        </Col>
                        <Col span={2}></Col>
                    </Row>

                </div>
                <PCFooter/>
            </div>
        )
    }
}