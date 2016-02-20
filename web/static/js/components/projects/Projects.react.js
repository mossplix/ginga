var React = require('react');
var Router = require('react-router');
var AppActionCreators = require('../../actions/AppActionCreators');
var Projects = React.createClass

({


  getInitialState: function () {
    return {

    };
  },
  componentDidMount: function() {
    AppActionCreators.appLoaded("projects","Project Management","");

  },

  componentWillMount: function () {

  },

  render: function () {

      return (<div><div className

="row">
						<div className

="col-md-3">
							<div className

="card card-deep-purple card-image bg-image sample-bg-image4">

								<div className

="context">
									<span className

="text-title">Card</span>
								</div>

							</div>


						</div>



						<div className

="col-md-3">
							<div className

="card card-image card-light-blue bg-image bg-opaque8 sample-bg-image6">

								<div className

="context has-action-left has-action-right">

									<div className

="tile-action">
										<i className

="ion-gear-b"></i>
									</div>

									<div className

="tile-content">
										<span className

="text-title">Two line</span>
										<span className

="text-subtitle">Support text</span>
									</div>

									<div className

="tile-action right">
										<i className

="ion-search"></i>
									</div>

								</div>

							</div>


						</div>



						<div className

="col-md-3">
							<div className

="card tile card-image card-black bg-image bg-opaque8 sample-bg-image7">

								<div className

="context has-action-left has-action-right">

									<div className

="tile-action">
										<i className

="ion-gear-b"></i>
									</div>

									<div className

="tile-content">
										<span className

="text-title">Tiles</span>
										<span className

="text-subtitle">Cards turns into tiles</span>
									</div>

									<div className

="tile-action right">
										<i className

="ion-search"></i>
									</div>

								</div>

							</div>


						</div>



						<div className

="col-md-3">
							<div className

="card card-black card-image bg-image bg-opaque6 sample-bg-image8">

								<div className

="card-action">
									<a href="javascript:;" data-toggle="fake-reload"></a>
								</div>

								<div className

="context">
									<span className

="text-title">Action Buttons</span>
								</div>

							</div>


						</div>



					</div>
</div>);



  }
});

module.exports=Projects;
