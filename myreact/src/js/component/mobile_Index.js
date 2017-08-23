import React from 'react';
import {Tabs ,Carousel} from 'antd';

/* 自定义组件 */
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
    render() {
        return (
            <div>
                <MobileHeader/>
                {/*  分类导航  */}
                <Tabs >
                    <TabPane tab="头条" key="1">
                        <Carousel autoplay className="m_carouse">
                            <div><img src="./src/images/20170801.jpeg" alt="头条图片"/></div>
                            <div><img src="./src/images/20170802.jpeg" alt="头条图片"/></div>
                            <div><img src="./src/images/20170803.jpeg" alt="头条图片"/></div>
                            <div><img src="./src/images/20170804.jpeg" alt="头条图片"/></div>
                        </Carousel>
                        <MobileList type="top" count="20"/>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList type="shehui" count="20"/>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileList type="guonei" count="20"/>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileList type="guoji" count="20"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileList type="yule" count="20"/>
                    </TabPane>
                </Tabs>

                <MobileFooter/>
            </div>
        );
    };
}

