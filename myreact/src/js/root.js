/* React 相关依赖包 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

/* 插件: Ant Design 样式  */
import 'antd/dist/antd.css';
/* 插件: PC端、手机端屏幕自适应 */
import MediaQuery from 'react-responsive';

/* 自定义组件 */
import PCIndex from './component/pc_Index';
import MobileIndex from './component/mobile_Index';
import PCNewsDetail from './component/pc_news_detail';

export default class Root extends React.Component {
	render() {
		return (
			<div>
				{/* 屏幕宽度大于1224px 时加载 PCIndex*/}
				<MediaQuery query="(min-device-width:1224px)">
					<Router history={hashHistory}>
						<Route  path='/' component={PCIndex}></Route>
						<Route  path='/details/:uniquekey' component={PCNewsDetail}></Route>
					</Router>
					{/*<PCIndex/>*/}
				</MediaQuery>
				{/* 屏幕宽度小于1224px 时加载 MobileIndex*/}
				<MediaQuery query="(max-device-width:1224px)">
					<MobileIndex/>
				</MediaQuery>
			</div>
		);
	};
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
