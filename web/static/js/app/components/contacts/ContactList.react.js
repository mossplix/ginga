var React = require('react');
var Router = require('react-router');

var ContactList = React.createClass

({


  getInitialState: function () {
    return {

    };
  },


  componentWillMount: function () {

  },

  render: function () {

      return (<div><div className

="row">
      			<div className

="col-md-6">
      				<div className

="card card-event card-clickable">

      					<div className

="card-heading bg-image sample-bg-image13">
      					</div>

      					<div className

="card-body">
      						<div className

="calendar">
      							<div className

="month">November</div>
      							<div className

="date">27</div>
      						</div>
      						<h4>Click Floating Button</h4>
      						<p>A Social Networking group with an International mix of Young Professionals interested in meeting other like minded people for friendship / networking / partying at exclusive Members Clubs, Lounges &amp; Bars. Recommended age range is 21+.</p>
      					</div>

      					<div className

="clickable-button">
      						<div className

="layer bg-red"></div>
      						<a className

="btn btn-floating btn-red initial-position floating-open btn-ripple"><i className

="ion-android-more-horizontal"></i></a>
      					</div>

      					<div className

="layered-content bg-red">
      						<div className

="overflow-content">
      							<h4>Young Professionals London</h4>
      							<p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.</p>
      							<p>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.</p>
      							<p>Completely synergize resource sucking relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.</p>
      						</div>
      						<div className

="clickable-close-button">
      							<a className

="btn btn-floating initial-position floating-close btn-ripple"><i className

="ion-android-close"></i></a>
      						</div>
      					</div>

      				</div>
      			</div>

      			<div className

="col-md-6">
      				<div className

="card card-event card-clickable card-clickable-from-left">

      					<div className

="card-heading bg-image sample-bg-image15">
      					</div>

      					<div className

="card-body">
      						<div className

="calendar">
      							<div className

="month">November</div>
      							<div className

="date">27</div>
      						</div>
      						<h4>Animate From Left</h4>
      						<p>A Social Networking group with an International mix of Young Professionals interested in meeting other like minded people for friendship / networking / partying at exclusive Members Clubs, Lounges &amp; Bars. Recommended age range is 21+.</p>
      					</div>

      					<div className

="clickable-button">
      						<div className

="layer bg-teal"></div>
      						<a className

="btn btn-floating btn-teal initial-position floating-open btn-ripple"><i className

="ion-android-more-horizontal"></i></a>
      					</div>

      					<div className

="layered-content bg-teal">
      						<div className

="overflow-content">
      							<h4>Young Professionals London</h4>
      							<p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.</p>
      							<p>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.</p>
      							<p>Completely synergize resource sucking relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.</p>
      						</div>
      						<div className

="clickable-close-button">
      							<a className

="btn btn-floating initial-position floating-close btn-ripple"><i className

="ion-android-close"></i></a>
      						</div>
      					</div>

      				</div>
      			</div>
      		</div>
</div>);



  }
});

module.exports=ContactList;
