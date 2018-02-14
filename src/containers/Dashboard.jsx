import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Switch, Route, Link } from 'react-router-dom';

import Event        from '../components/dashboard/event/Event';
import UpdateEvent  from '../components/dashboard/event/UpdateEvent';
import ShowEvent    from '../components/dashboard/event/ShowEvent';
import Admin        from '../components/dashboard/admin/Admin';
import Sidebar      from '../components/dashboard/Sidebar';
import SidebarItem  from '../components/dashboard/SidebarItem';

import authHelper   from '../helpers/localStorage/authHelper';

import '../styles/css/dashboard.css';

const mapDispatchToProps = dispatch => {
  return {
    goHome: () => dispatch(push('/'))
  }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this._logout = this._logout.bind(this);
    }

    _logout() {
        authHelper.clean()
        this.props.goHome()
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="">HomePage</a>
                    <button className="navbar-toggler d-lg-none"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarsExampleDefault">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav mr-auto"></ul>
                    <button onClick={this._logout} className="btn btn-dark" type="button">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
                        Logout
                    </button>
                </nav>

                <div className="container-fluid">
                    <div className="row">

                        <Sidebar location={this.props.location} />

                        <main className="col-sm-9 ml-sm-auto col-md-10 pt-3 dashboard-main" role="main">
                            <Switch>
                                <Route path='/dashboard/event/:id/update' component={UpdateEvent}/>
                                <Route path='/dashboard/event/:id' component={ShowEvent}/>
                                <Route path='/dashboard/event' component={Event}/>
                                <Route path='/dashboard/admin' component={Admin}/>
                            </Switch>
                        </main>

                    </div>
                </div>

            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(Dashboard)
