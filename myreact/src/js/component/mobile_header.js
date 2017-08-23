import React from 'react';
import {Icon, Form, Input, Button, Modal, Tabs, message} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {

    constructor() {
        super();
        this.state = {
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
    callback(key) {
        if (key == 'login') {
            this.setState({action: 'login'})
        } else {
            this.setState({action: 'register'})
        }
    }

    login(){
        this.setModalVisible(true);
    }

    render() {
        /*  获取表单数据 */
        let {getFieldProps} = this.props.form;
        const userShow=this.state.hasLogin?
            <Icon type="inbox" class="login-icon" />
            :
            <Icon type="setting" onClick={this.login.bind(this)} class="login-icon"/>;

        return (
            <div id="mobileHeader">
                <header>
                    <img src="./src/images/if_Fox_News.png" alt="LOGO"/>
                    <span>ReactNews</span>
                    {userShow}
                </header>

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
            </div>
        );
    };
}
export default MobileHeader = Form.create({})(MobileHeader);
