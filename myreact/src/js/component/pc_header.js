import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon, Form, Input, Button, Modal, Tabs, message} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            hasLogin: false,
            userName: 'Anna',
            userId: 0,
            modalVisible: false,
            action: 'login'
        };
    }

    /*  模态框显示、隐藏事件  */
    setModalVisible(value) {
        this.setState({modalVisible: value})
    }

    /*  导航条点击时高亮显示 */
    handleClick(e) {
        if (e.key == 'logOut' || e.key == 'login') {
            this.setState({current: e.key});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key});
        }
    }

    /*   表单提交事件  */
    handleSubmit(e) {
        e.preventDefault();
        let myFetchOptions = {
            method: "get"
        };
        let formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username=" + formData.userName + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json)
            .then(json => {
                console.log(json);
                this.setState({userName: json.NickUserName, userId: json.UserId})
            });
        message.success('请求成功');
        this.setModalVisible(false);
    }

    /*  API传参类型  */
    callback(key){
        if(key=='login'){
            this.setState({action:'login'})
        }else{
            this.setState({action:'register'})
        }
    }

    render() {

        /*  获取表单数据 */
        // let {getFieldDecorator} = this.props.form;
        let {getFieldProps} = this.props.form;

        /* 不同登录状态展示内容  */
        const userShow = this.state.hasLogin
            ? <Menu.Item key="logOut" class="user-info">
                {this.state.userName}&nbsp;
                个人中心 &nbsp;
                退出 &nbsp;
            </Menu.Item>
            :
            <Menu.Item key="login" class="user-info">
                <Icon type="appstore"/> 登录/注册
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    {/*LOGO部分*/}
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="./src/images/if_Fox_News.png" alt="LOGO"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    {/*水平导航条*/}
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]}
                              onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="top">
                                <Icon type="appstore"/> 头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/> 社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/> 国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/> 国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/> 娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/> 体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/> 科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/> 时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

                        {/* 登录、退出模态框  */}
                        <Modal title='用户中心' visible={this.state.modalVisible} onOK={() => this.setModalVisible(false)}
                               onCancel={() => this.setModalVisible(false)}>
                            <Tabs type="card" onChange={this.callback.bind(this)}>
                                <TabPane tab="登录" key="login">
                                    <Form onSubmit={this.handleSubmit.bind(this)} layout='horizontal'>
                                        <FormItem >
                                            <Input type='text' placeholder="请输入用户名"  {...getFieldProps('userName')}/>
                                        </FormItem>
                                        <FormItem >
                                            <Input type='password'
                                                   placeholder="请输入密码"  {...getFieldProps('password')}/>
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="register">
                                    <Form onSubmit={this.handleSubmit.bind(this)} layout='horizontal'>
                                        <FormItem >
                                            <Input type='text' placeholder="请输入用户名"  {...getFieldProps('r_userName')}/>
                                        </FormItem>
                                        <FormItem >
                                            <Input type='password'
                                                   placeholder="请输入密码"  {...getFieldProps('r_password')}/>
                                        </FormItem>
                                        <FormItem >
                                            <Input type='password'
                                                   placeholder="请再次输入密码" {...getFieldProps('r_confirmPassword')}/>
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader);