import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/Navbar';
import Devices from './scenes/Devices';
import DeviceAdd from './scenes/DeviceAdd';
import DeviceEdit from './scenes/DeviceEdit';
import DeviceLog from './scenes/DeviceLog';
import Groups from './scenes/Groups';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <NavBar />
                    </div>

                    <Switch>
                        <Route path="/devices" exact component={Devices} />
                        <Route path="/devices/add" exact component={DeviceAdd} />
                        <Route path="/devices/edit/:id" component={DeviceEdit} />
                        <Route path="/devices/log/:id" component={DeviceLog} />
                        <Route path="/groups" exact component={Groups} />
                        <Redirect from="/" to="/devices" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
