import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import zhCN from 'antd/es/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
// import * as serviceWorker from './serviceWorker';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import {mainRoutes} from './routes'
ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Router>
            <Switch>
                <Route path="/admin" render={(routerProps)=>{
                    // Todo:权限，需要登录才能访问/admin
                    return <App {...routerProps}/>
                }}/>
                {
                    mainRoutes.map(route => {
                        return <Route key={route.pathName} path={route.pathName} component={route.component} exact={route.exact}/>
                    })
                }
                <Redirect to="/admin" from="/"exact/>
                <Redirect to="/404"/>
            </Switch>
        </Router>
    </LocaleProvider>
    , 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
