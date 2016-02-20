var React = require('react');
var Router = require('react-router');
var TaskList = React.createClass({


  getInitialState: function () {
    return {

    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({

    });
  },

  componentWillMount: function () {

  },

  render: function () {

      return (<div>
        <div class="content">

        		<div class="page-header full-content bg-red">
        			<div class="row">
        				<div class="col-sm-6">
        					<h1>Lists <small>small description</small></h1>
        				</div>


        				<div class="col-sm-6">
        					<ol class="breadcrumb">
        						<li><a href="ui-elements-lists.html#"><i class="ion-home"></i></a></li>
        						<li><a href="ui-elements-lists.html#">UI Elements</a></li>
        						<li><a href="ui-elements-lists.html#" class="active">Lists</a></li>
        					</ol>
        				</div>


        			</div>


        		</div>

        		<div class="row">
        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>CALENDAR LIST</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-calendar" style="height: 300px; overflow: auto">
        							<li>
        								<div class="date">
        									<span class="number">27</span>
        									<span class="text">Mon</span>
        								</div>

        								<div class="event">
        									<div class="card card-calendar card-green">
        										<div class="event-detail">
        											<div class="primary">Future of Web Design</div>


        											<div class="secondary">Event</div>


        										</div>


        									</div>

        								</div>


        								<div class="event">
        									<div class="card card-calendar card-teal">
        										<div class="event-detail">
        											<div class="primary">Stay at 85m2 Central Apartment, London England</div>


        										</div>


        									</div>

        								</div>


        								<div class="event">
        									<div class="card card-calendar card-blue">
        										<div class="event-detail">
        											<div class="primary">Donald Davidson</div>


        											<div class="secondary">Birthday</div>


        											<div class="related-image">
        												<img src="../../assets/globals/img/faces/12.jpg" alt=""/>
        											</div>


        										</div>


        									</div>

        								</div>


        							</li>
        							<li>
        								<div class="date text-blue">
        									<span class="number">28</span>
        									<span class="text">Tue</span>
        								</div>

        								<div class="event">
        									<div class="card card-calendar card-calendar-image card-black bg-image sample-bg-image4 bg-opaque5">
        										<div class="event-detail">
        											<div class="primary">After party at FOWA</div>


        											<div class="secondary">London, England</div>


        										</div>


        									</div>

        								</div>


        							</li>
        							<li class="week-seperator">
        								<span>April 4-10</span>
        							</li>
        							<li>
        								<div class="date text-red">
        									<span class="number">6</span>
        									<span class="text">Wed</span>
        								</div>

        								<div class="event">
        									<div class="card card-calendar card-brown">
        										<div class="event-detail">
        											<div class="primary">Dinner with colleague friends</div>


        											<div class="secondary">Istanbul, Turkey</div>


        										</div>


        									</div>

        								</div>


        							</li>
        							<li class="month-seperator bg-image sample-bg-image11 bg-opaque7">
        								<span>June</span>
        							</li>
        							<li class="week-seperator">
        								<span>June 7-14</span>
        							</li>
        							<li>
        								<div class="date text-blue-grey">
        									<span class="number">12</span>
        									<span class="text">Thu</span>
        								</div>

        								<div class="event">
        									<div class="card card-calendar card-blue-grey">
        										<div class="event-detail">
        											<div class="primary">Brenda Thompson, Sandra Jimenez</div>


        											<div class="secondary">Birthday</div>


        										</div>


        									</div>

        								</div>


        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>


        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>DAY VIEW</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-calendar list-calendar-fixed">
        							<li>
        								<div class="date">
        									<span class="number">27</span>
        									<span class="text">Mon</span>
        								</div>

        								<div class="event">
        									<div class="card card-calendar card-green">
        										<div class="event-detail">
        											<div class="primary">Future of Web Design</div>


        										</div>


        									</div>

        								</div>


        							</li>
        						</ul>
        						<ul class="list-calendar list-calendar-day-view" style="height: 225px; overflow: auto">
        							<li>
        								<div class="date">
        									<span class="text">00:00</span>
        								</div>

        								<div class="event">

        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">01:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">02:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">03:00</span>
        								</div>

        								<div class="event">
        									<div class="card card-calendar card-teal">
        										<div class="event-detail">
        											<div class="primary">Stay at 85m2 Central Apartment, London England</div>


        										</div>


        									</div>

        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">04:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">05:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">06:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">07:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">08:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">09:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">10:00</span>
        								</div>

        								<div class="event">
        									<div class="card card-calendar card-blue">
        										<div class="event-detail">
        											<div class="primary">Donald Davidson</div>


        											<div class="secondary">Birthday</div>


        											<div class="related-image">
        												<img src="../../assets/globals/img/faces/12.jpg" alt=""/>
        											</div>


        										</div>


        									</div>

        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">11:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">12:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">13:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">14:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">15:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">16:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">17:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">18:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">19:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">20:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">21:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">22:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        							<li>
        								<div class="date">
        									<span class="text">23:00</span>
        								</div>

        								<div class="event">
        								</div>


        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>


        		</div>



        		<div class="row">
        			<div class="col-md-4">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>BASIC LIST</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Pari Subramanium</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Robert Graham</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Julia Parker</span>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>



        			<div class="col-md-4">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>WITH DIVIDER</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Deborah Berry</span>
        									</div>
        								</a>
        							</li>
        							<li class="divider">
        								Divider
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Edward Welch</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Kathy Sims</span>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>



        			<div class="col-md-4">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>DIVIDER WITH BORDER</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material borderless">
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Margaret Ellis</span>
        									</div>
        								</a>
        							</li>
        							<li class="divider with-border">
        								Divider with Border
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Raymond Black</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Rebecca Welch</span>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>


        		</div>



        		<div class="row">
        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>SECOND LINE</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Sarah James</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Brandon Hoffman</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Patricia Hoffman</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>



        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>BORDERLESS</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material borderless">
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Sara Moreno</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Randy Welch</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Tiffany Ross</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>


        		</div>



        		<div class="row">

        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>WITH SUBHEADER</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Christina George</span>
        									</div>
        								</a>
        							</li>
        							<li class="divider subheader">
        								Subheader
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Kevin Sullivan</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Sara Lopez</span>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>



        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>ACTION RIGHT</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Danielle Mitchell</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<i class="ion-android-alert center"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Terry Carter</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<i class="ion-android-alert center"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Jeremy Lawrence</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<i class="ion-android-alert center"></i>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>


        		</div>



        		<div class="row">
        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>DOUBLE ACTION</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Amber Guerrero</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">15 min</span>
        										<i class="ion-android-done bottom"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Lawrence Weaver</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">2 hr</span>
        										<i class="ion-android-done bottom"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Michelle Wade</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">6 hr</span>
        										<i class="ion-android-volume-off bottom"></i>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>



        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>LONG STORY</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left has-action-right has-long-story">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Ruth Barnes</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">15 min</span>
        										<i class="ion-android-done bottom"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right has-long-story">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Mark Estrada</span>
        										<span class="caption">Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">2 hr</span>
        										<i class="ion-android-done bottom"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right has-long-story">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Brenda Warren</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">6 hr</span>
        										<i class="ion-android-volume-off bottom"></i>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>


        				</div>


        			</div>


        		</div>



        		<div class="row">
        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>ICONIC</h4></div>
        					</div>


        					<div class="panel-body without-padding">
        						<ul class="list-material">
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<i class="ion-calendar icon-circle"></i>
        									</div>
        									<div class="list-content">
        										<span class="title">Pari Subramanium</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">15 min</span>
        										<i class="ion-android-done bottom"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<i class="ion-calendar icon"></i>
        									</div>
        									<div class="list-content">
        										<span class="title">Harry Perry</span>
        										<span class="caption">Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">2 hr</span>
        										<i class="ion-android-done bottom"></i>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left has-action-right">
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<i class="ion-calendar icon-circle"></i>
        									</div>
        									<div class="list-content">
        										<span class="title">Pari Subramanium</span>
        										<span class="caption">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.</span>
        									</div>
        									<div class="list-action-right">
        										<span class="top">6 hr</span>
        										<i class="ion-android-volume-off bottom"></i>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>
        				</div>
        			</div>

        			<div class="col-md-6">
        				<div class="panel">
        					<div class="panel-heading">
        						<div class="panel-title"><h4>HOVER ACTIONS</h4></div>
        					</div>
        					<div class="panel-body without-padding">
        						<ul class="list-material has-hidden">
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="hidden"><i class="ion-android-delete"></i></a>
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/1.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Pari Subramanium</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="hidden"><i class="ion-android-delete"></i></a>
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/2.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Jason Bryant</span>
        									</div>
        								</a>
        							</li>
        							<li class="has-action-left">
        								<a href="ui-elements-lists.html#" class="hidden"><i class="ion-android-delete"></i></a>
        								<a href="ui-elements-lists.html#" class="visible">
        									<div class="list-action-left">
        										<img src="../../assets/globals/img/faces/3.jpg" class="face-radius" alt=""/>
        									</div>
        									<div class="list-content">
        										<span class="title">Pari Subramanium</span>
        									</div>
        								</a>
        							</li>
        						</ul>
        					</div>
        				</div>
        			</div>

        		</div>

        		<div class="footer-links margin-top-40">
        			<div class="row no-gutters">
        				<div class="col-xs-6 bg-red">
        					<a href="ui-elements-buttons.html">
        						<span class="state">UI Elements</span>
        						<span>Buttons</span>
        						<span class="icon"><i class="ion-android-arrow-back"></i></span>
        					</a>
        				</div>
        				<div class="col-xs-6 bg-red">
        					<a href="ui-elements-dialogs.html">
        						<span class="state">UI Elements</span>
        						<span>Dialogs</span>
        						<span class="icon"><i class="ion-android-arrow-forward"></i></span>
        					</a>
        				</div>
        			</div>
        		</div>

        	</div>


      </div>);



  }
});

module.exports=TaskList;
