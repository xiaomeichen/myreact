import React from 'react';
import {Row, Col, Carousel ,Tabs}from 'antd';

/* 自定义组件  */
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';

const TabPane=Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
    render() {
        return (
            <div class="index-container">
                <Row>
                    <Col span={2}></Col>
                     {/*  轮播图  */}
                    <Col span={6} class="carousel-container">
                        <Carousel autoplay>
                            <div><img src="./src/images/20170801.jpeg" alt="头条图片"/></div>
                            <div><img src="./src/images/20170802.jpeg" alt="头条图片"/></div>
                            <div><img src="./src/images/20170803.jpeg" alt="头条图片"/></div>
                            <div><img src="./src/images/20170804.jpeg" alt="头条图片"/></div>
                            <div><img src="./src/images/20170805.jpeg" alt="头条图片"/></div>
                        </Carousel>
                        <PCNewsImageBlock cardTitle="国际头条" type="guoji" count="6" imageWidth="120px" cardWidth="100%"/>
                    </Col>
                    {/*   新闻列表  */}
                    <Col span={8}>
                        <Tabs class="news-tabs">
                            <TabPane tab="热点" key="1">
                                <PCNewsBlock type="shehui" count="30" bordered="false" />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={6}>

                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <PCNewsImageBlock cardTitle="娱乐头条" type="yule" count="11" imageWidth="120px" cardWidth="100%"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}