var React = require('react');
var Router = require('react-router');
var AppActionCreators = require('../../actions/AppActionCreators');

var Settings = React.createClass({


  getInitialState: function () {
    return {

    };
  },

  componentDidMount: function() {
    AppActionCreators.appLoaded("home","Settings","Application Settings");

  },

  componentWillMount: function () {

  },

  render: function () {

      return (<div>


        <div class="settings-panel">
							<p class="text-grey">Here's where you can check your settings of Pleasure Admin Panel. If you need an extra information from us, do not hesitate to contact.</p>

							<div class="legend">Privacy Controls</div>
							<ul>
								<li>
									Show my profile on search results
									<div class="switcher switcher-indigo pull-right">
										<input id="settings1" type="checkbox" hidden="hidden" checked="checked"/>
										<label for="settings1"></label>
									</div>
								</li>
								<li>
									Only God can judge me
									<div class="switcher switcher-indigo pull-right">
										<input id="settings2" type="checkbox" hidden="hidden" checked="checked"/>
										<label for="settings2"></label>
									</div>
								</li>
								<li>
									Review tags people add to your own posts
									<div class="switcher switcher-indigo pull-right">
										<input id="settings3" type="checkbox" hidden="hidden"/>
										<label for="settings3"></label>
									</div>
								</li>
							</ul>

							<div class="legend">Notifications</div>
							<ul>
								<li>
									Activity that involves you
									<div class="switcher switcher-indigo pull-right">
										<input id="settings4" type="checkbox" hidden="hidden" checked="checked"/>
										<label for="settings4"></label>
									</div>
								</li>
								<li>
									Birthdays
									<div class="switcher switcher-indigo pull-right">
										<input id="settings5" type="checkbox" hidden="hidden"/>
										<label for="settings5"></label>
									</div>
								</li>
								<li>
									Calendar events
									<div class="switcher switcher-indigo pull-right">
										<input id="settings6" type="checkbox" hidden="hidden"/>
										<label for="settings6"></label>
									</div>
								</li>
							</ul>

							<div class="legend">Newsletter</div>
							<ul>
								<li>
									Friend requests
									<div class="checkboxer checkboxer-indigo pull-right">
										<input type="checkbox" id="checkboxSettings1" value="option1" checked="checked"/>
										<label for="checkboxSettings1"></label>
									</div>
								</li>
								<li>
									People you may know
									<div class="checkboxer checkboxer-indigo pull-right">
										<input type="checkbox" id="checkboxSettings2" value="option1"/>
										<label for="checkboxSettings2"></label>
									</div>
								</li>
							</ul>

						</div>


      </div>);



  }
});

module.exports = Settings;
