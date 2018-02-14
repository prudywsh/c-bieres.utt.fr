import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import createReactClass from 'create-react-class'

import { Link } from 'react-router-dom'

import Beer             from '../components/home/Beer';
import BeerList         from '../components/home/BeerList'
import Banner           from '../components/home/Banner'
import Footer           from '../components/home/Footer'
import ShowOldEvents    from '../components/home/ShowOldEvents'

import { monthToString }    from '../helpers/dateHelper';
import registrationHelper   from '../helpers/localStorage/registrationHelper';
import redirectHelper       from '../helpers/localStorage/redirectHelper';

import '../scripts/covervid.js';
import '../scripts/main.js';

const Home = createReactClass({
  getInitialState() {
    return {
      registration: registrationHelper.get(),
      width: window.innerWidth
    }
  },
  componentDidMount() {
    // check if there is an authorization code
    const fullUrl = window.location.href;
    const searchPart = fullUrl.split('?')[1];

    if (searchPart) {
      const parameters = searchPart.split('&');

      const authorization_code = parameters
        .map(p => p.split('='))
        .find(p => p[0] === "authorization_code");

      // if there is an authorization_code, send it to get an access token
      if (authorization_code) {
        let lastAction = redirectHelper.get();
        if (lastAction == "register") {
          this.props.register(authorization_code[1]);
        } else if (lastAction == "unregister") {
          this.props.unregister({authorization_code: authorization_code[1]});
        } else if (lastAction == "login") {
          this.props.sendAuthorizationCode(authorization_code[1]);
        }
      }
    }
    // trigger action for the store to load the event
    this.props.fetchNextEvent()
    // window resize listenner
    window.addEventListener('resize', this.handleWindowSizeChange);
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  },
  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  },
  handleBannerClick() {
    this.props.fetchRedirectLink(this.state.registration ? "unregister" : "register")
  },
  handleAdminClick() {
    if (this.props.isAdmin) {
      // use pushState to remove the authorization_code from url
      window.history.pushState("yolo", "yolo", "/")
      this.props.goDashboard()
    } else {
      this.props.fetchRedirectLink("login");
    }
  },
  render() {
    const diplayColumn = this.state.width <= 900;

    let nextEventDate = null;
    if (this.props.nextEvent) {
      let when = new Date(this.props.nextEvent.when);
      nextEventDate = `${when.getDate()} ${monthToString(when.getMonth())}`;
    }

    return (
      <div>
        <Banner
          event={this.props.nextEvent}
          date={nextEventDate}
          registration={this.state.registration}
          onClick={this.handleBannerClick} />
        {
          nextEventDate &&
          <BeerList beers={this.props.nextEvent.beers} diplayColumn={diplayColumn} />
        }
        <ShowOldEvents onClick={this.props.goOldEvents} />
        <Footer onAdminClick={this.handleAdminClick} />
      </div>
    )
  }
})
export default Home