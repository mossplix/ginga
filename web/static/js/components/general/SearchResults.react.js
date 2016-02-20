var React = require('react');
var Router = require('react-router');
var SearchResults = React.createClass({


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

      return (<div><div class="content">

					<div class="page-header full-content">
						<div class="row">
							<div class="col-sm-6">
								<h1>Search Results <small>short description</small></h1>
							</div>
							<div class="col-sm-6">
								<ol class="breadcrumb">
									<li><a href="pages-search-results.html#"><i class="ion-home"></i></a></li>
									<li><a href="pages-search-results.html#">Pages</a></li>
									<li><a href="pages-search-results.html#" class="active">Search Results</a></li>
								</ol>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-md-12">
							<div class="panel">
								<div class="panel-heading">
									<div class="panel-title">
										<h4>SEARCH RESULTS</h4>
									</div>
									<ul class="nav nav-tabs with-panel portlet-handle-cancel">
										<li class="active"><a href="pages-search-results.html#search-file" data-toggle="tab">File</a></li>
										<li><a href="pages-search-results.html#search-news" data-toggle="tab">News</a></li>
										<li><a href="pages-search-results.html#search-users" data-toggle="tab">Users</a></li>
									</ul>
								</div>
								<div class="panel-body">

									<div class="tab-content with-panel">
										<div id="search-file" class="tab-pane active">
											<div class="search-results search-file">
												<ul class="search-list list-hover">
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-pdf-o pdf"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">Checklist Before Submitting.pdf</a></h6>
															<p class="source"><a href="pages-search-results.html#">/Users/Teamfox/Documents/Envato/Themeforest/Checklist Before Submitting.pdf</a></p>
															<ul class="list-inline">
																<li>10.1MB</li>
																<li><i class="fa fa-calendar-o"></i> 08.17.2014</li>
																<li><i class="fa fa-eye"></i> 402</li>
																<li><i class="fa fa-cloud-download"></i> 3</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-excel-o excel"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">Teamfox-annual-report.xls</a></h6>
															<p class="source"><a href="pages-search-results.html#">http://www.teamfox.co/files/Teamfox-annual-report.xls</a></p>
															<ul class="list-inline">
																<li>4.3MB</li>
																<li><i class="fa fa-calendar-o"></i> 07.17.2014</li>
																<li><i class="fa fa-eye"></i> 2585</li>
																<li><i class="fa fa-cloud-download"></i> 93</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-word-o word"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">License Aggrement.docx</a></h6>
															<p class="source"><a href="pages-search-results.html#">/Users/Teamfox/Documents/Envato/Themeforest/License Aggrement.docx</a></p>
															<ul class="list-inline">
																<li>2.9MB</li>
																<li><i class="fa fa-calendar-o"></i> 08.18.2014</li>
																<li><i class="fa fa-eye"></i> 398</li>
																<li><i class="fa fa-cloud-download"></i> 85</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-powerpoint-o powerpoint"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">Presantation of new <span class="highlight">theme</span>s.pptx</a></h6>
															<p class="source"><a href="pages-search-results.html#">/Users/Teamfox/Documents/Envato/Themeforest/Presantation of new themes.pptx</a></p>
															<ul class="list-inline">
																<li>5.6MB</li>
																<li><i class="fa fa-calendar-o"></i> 08.18.2014</li>
																<li><i class="fa fa-eye"></i> 255</li>
																<li><i class="fa fa-cloud-download"></i> 34</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-audio-o audio"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#"><span class="highlight">Theme</span> Song.wav</a></h6>
															<p class="source"><a href="pages-search-results.html#">/Users/Teamfox/Documents/Teamfox/Theme Song.wav</a></p>
															<ul class="list-inline">
																<li>2.7MB</li>
																<li><i class="fa fa-calendar-o"></i> 08.19.2014</li>
																<li><i class="fa fa-eye"></i> 30</li>
																<li><i class="fa fa-cloud-download"></i> 25</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa fa-file-archive-o"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">Pleasure-Dashboard.zip</a></h6>
															<p class="source"><a href="pages-search-results.html#">http://www.teamfox.co/files/Pleasure-Dashboard.zip</a></p>
															<ul class="list-inline">
																<li>3.5MB</li>
																<li><i class="fa fa-calendar-o"></i> 08.20.2014</li>
																<li><i class="fa fa-eye"></i> 24054</li>
																<li><i class="fa fa-cloud-download"></i> 15995</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-image-o image"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">Teamfox-Logo.jpg</a></h6>
															<p class="source"><a href="pages-search-results.html#">http://www.teamfox.co/images/teamfox-Logo.jpg</a></p>
															<ul class="list-inline">
																<li>108KB</li>
																<li><i class="fa fa-calendar-o"></i> 08.21.2014</li>
																<li><i class="fa fa-eye"></i> 4540</li>
																<li><i class="fa fa-cloud-download"></i> 739</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-text-o text"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">LICENSE.txt</a></h6>
															<p class="source"><a href="pages-search-results.html#">http://www.teamfox.co/LICENSE.txt</a></p>
															<ul class="list-inline">
																<li>5KB</li>
																<li><i class="fa fa-calendar-o"></i> 08.22.2014</li>
																<li><i class="fa fa-eye"></i> 40</li>
																<li><i class="fa fa-cloud-download"></i> 2</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-o file"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">.htaccess</a></h6>
															<p class="source"><a href="pages-search-results.html#">http://www.teamfox.co/.htaccess</a></p>
															<ul class="list-inline">
																<li>5KB</li>
																<li><i class="fa fa-calendar-o"></i> 08.23.2014</li>
																<li><i class="fa fa-eye"></i> 10</li>
																<li><i class="fa fa-cloud-download"></i> 0</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-video-o video"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">Last Summer with best friend.mp4</a></h6>
															<p class="source"><a href="pages-search-results.html#">http://www.different-theme-domain.com/video/Last Summer with best friend.mp4</a></p>
															<ul class="list-inline">
																<li>1.2GB</li>
																<li><i class="fa fa-calendar-o"></i> 08.24.2014</li>
																<li><i class="fa fa-eye"></i> 19</li>
																<li><i class="fa fa-cloud-download"></i> 4</li>
															</ul>
														</div>
													</li>
													<li>
														<div class="file-icon"><a href="pages-search-results.html#"><i class="fa fa-file-code-o code"></i></a></div>
														<div class="search-result">
															<h6><a href="pages-search-results.html#">main.min.js</a></h6>
															<p class="source"><a href="pages-search-results.html#">http://www.teamfox.co/assets/js/main.min.js</a></p>
															<ul class="list-inline">
																<li>88KB</li>
																<li><i class="fa fa-calendar-o"></i> 08.25.2014</li>
																<li><i class="fa fa-eye"></i> 193</li>
																<li><i class="fa fa-cloud-download"></i> 30</li>
															</ul>
														</div>
													</li>
												</ul>
											</div>
										</div>

										<div id="search-news" class="tab-pane">
											<div class="search-results">
												<div class="row">
													<div class="col-md-6">

														<div class="card card-news">
															<div class="card-heading">
																<div class="card-full-bg card-bgimage sample-bg-image5"></div>
																<a href="pages-search-results.html#" class="author"><img src="../../assets/globals/img/faces/1.jpg" alt=""/></a>
																<h3 class="card-title"><i class="heading-icon fa fa-life-ring"></i> Theme Industry <small>1h ago</small></h3>
															</div>

															<div class="card-body">
																<h4>New themes are ready to publish</h4>
																<p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer...</p>
															</div>

															<div class="card-footer">
																<ul class="action">
																	<li><a href="pages-search-results.html#"><i class="fa fa-star"></i></a></li>
																	<li><a href="pages-search-results.html#"><i class="fa fa-comment"></i></a></li>
																</ul>
															</div>
														</div>

													</div>
													<div class="col-md-6">

														<div class="card card-news">
															<div class="card-heading">
																<div class="card-full-bg card-bgimage sample-bg-image6"></div>
																<a href="pages-search-results.html#" class="author"><img src="../../assets/globals/img/faces/15.jpg" alt=""/></a>
																<h3 class="card-title"><i class="heading-icon fa fa-life-ring"></i> Not so much time <small>4h ago</small></h3>
															</div>

															<div class="card-body">
																<h4>Have a break</h4>
																<p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer...</p>
															</div>

															<div class="card-footer">
																<ul class="action">
																	<li><a href="pages-search-results.html#"><i class="fa fa-star"></i></a></li>
																	<li><a href="pages-search-results.html#"><i class="fa fa-comment"></i></a></li>
																</ul>
															</div>
														</div>

													</div>

													<div class="col-md-6">

														<div class="card card-news">
															<div class="card-heading">
																<div class="card-full-bg card-bgimage sample-bg-image8"></div>
																<a href="pages-search-results.html#" class="author"><img src="../../assets/globals/img/faces/21.jpg" alt=""/></a>
																<h3 class="card-title"><i class="heading-icon fa fa-life-ring"></i> Travel Plan <small>1d ago</small></h3>
															</div>

															<div class="card-body">
																<h4>What if I change my mind?</h4>
																<p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer...</p>
															</div>

															<div class="card-footer">
																<ul class="action">
																	<li><a href="pages-search-results.html#"><i class="fa fa-star"></i></a></li>
																	<li><a href="pages-search-results.html#"><i class="fa fa-comment"></i></a></li>
																</ul>
															</div>
														</div>

													</div>

													<div class="col-md-6">

														<div class="card card-news">
															<div class="card-heading">
																<div class="card-full-bg card-bgimage sample-bg-image13"></div>
																<a href="pages-search-results.html#" class="author"><img src="../../assets/globals/img/faces/13.jpg" alt=""/></a>
																<h3 class="card-title"><i class="heading-icon fa fa-life-ring"></i> Writing Documentation <small>1w ago</small></h3>
															</div>

															<div class="card-body">
																<h4>The most important part</h4>
																<p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer...</p>
															</div>

															<div class="card-footer">
																<ul class="action">
																	<li><a href="pages-search-results.html#"><i class="fa fa-star"></i></a></li>
																	<li><a href="pages-search-results.html#"><i class="fa fa-comment"></i></a></li>
																</ul>
															</div>
														</div>

													</div>

												</div>
											</div>
										</div>

										<div id="search-users" class="tab-pane">
											<div class="row">

												<div class="col-md-4">
													<div class="card card-user">
														<div class="card-heading heading-center text-color-white">
															<img src="../../assets/globals/img/faces/5.jpg" alt="" class="user-image"/>
															<h3 class="card-title"><a href="pages-search-results.html#">Mariana Barboza</a></h3>
															<div class="subhead">Lead Marketing Manager</div>
														</div>

														<div class="card-body">
															<p>I'm Mariana, a Lead Marketing Manager from Brazil &amp; currently working on <a href="pages-search-results.html#">Sety</a>, <a href="pages-search-results.html#">T-Project</a> and <a href="pages-search-results.html#">TeamFox</a>.</p>
															<ul class="social-links">
																<li><a href="pages-search-results.html#"><i class="fa fa-github"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-twitter"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-linkedin"></i></a></li>
															</ul>
														</div>

														<div class="card-footer">
															<button class="btn btn-xs btn-default pull-left btn-ripple">Add as a Friend</button>
															<a href="pages-search-results.html#" class="pull-right"><small>8 friends in common</small></a>
														</div>
													</div>
												</div>

												<div class="col-md-4">
													<div class="card card-user turquoise">
														<div class="card-heading heading-center text-color-white">
															<img src="../../assets/globals/img/faces/7.jpg" alt="" class="user-image"/>
															<h3 class="card-title"><a href="pages-search-results.html#">Beverly Turner</a></h3>
															<div class="subhead">Chief Brand Associate</div>
														</div>

														<div class="card-body">
															<p>I'm Beverly Turner, a Chief Brand Associate from Brazil &amp; currently working on <a href="pages-search-results.html#">Sety</a>, <a href="pages-search-results.html#">T-Project</a> and <a href="pages-search-results.html#">TeamFox</a>.</p>
															<ul class="social-links">
																<li><a href="pages-search-results.html#"><i class="fa fa-github"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-twitter"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-linkedin"></i></a></li>
															</ul>
														</div>

														<div class="card-footer">
															<button class="btn btn-xs btn-default pull-left btn-ripple">Add as a Friend</button>
															<a href="pages-search-results.html#" class="pull-right"><small>8 friends in common</small></a>
														</div>
													</div>
												</div>

												<div class="col-md-4">
													<div class="card card-user amethyst">
														<div class="card-heading heading-center text-color-white">
															<img src="../../assets/globals/img/faces/10.jpg" alt="" class="user-image"/>
															<h3 class="card-title"><a href="pages-search-results.html#">Teresa Kelly</a></h3>
															<div class="subhead">Regional Solutions Supervisor</div>
														</div>

														<div class="card-body">
															<p>I'm Teresa, a Regional Solutions Supervisor from Brazil &amp; currently working on <a href="pages-search-results.html#">Sety</a>, <a href="pages-search-results.html#">T-Project</a> and <a href="pages-search-results.html#">TeamFox</a>.</p>
															<ul class="social-links">
																<li><a href="pages-search-results.html#"><i class="fa fa-github"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-twitter"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-linkedin"></i></a></li>
															</ul>
														</div>
														<div class="card-footer">
															<button class="btn btn-xs btn-default pull-left btn-ripple">Add as a Friend</button>
															<a href="pages-search-results.html#" class="pull-right"><small>8 friends in common</small></a>
														</div>
													</div>
												</div>

												<div class="col-md-4">
													<div class="card card-user wet-asphalt">
														<div class="card-heading heading-center text-color-white">
															<img src="../../assets/globals/img/faces/12.jpg" alt="" class="user-image"/>
															<h3 class="card-title"><a href="pages-search-results.html#">Jennifer Martinez</a></h3>
															<div class="subhead">Dynamic Response Assistant</div>
														</div>

														<div class="card-body">
															<p>I'm Jennifer, a Dynamic Response Assistant from Brazil &amp; currently working on <a href="pages-search-results.html#">Sety</a>, <a href="pages-search-results.html#">T-Project</a> and <a href="pages-search-results.html#">TeamFox</a>.</p>
															<ul class="social-links">
																<li><a href="pages-search-results.html#"><i class="fa fa-github"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-twitter"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-linkedin"></i></a></li>
															</ul>
														</div>

														<div class="card-footer">
															<button class="btn btn-xs btn-default pull-left btn-ripple">Add as a Friend</button>
															<a href="pages-search-results.html#" class="pull-right"><small>8 friends in common</small></a>
														</div>
													</div>
												</div>

												<div class="col-md-4">
													<div class="card card-user carrot">
														<div class="card-heading heading-center text-color-white">
															<img src="../../assets/globals/img/faces/14.jpg" alt="" class="user-image"/>
															<h3 class="card-title"><a href="pages-search-results.html#">Andrea Rivera</a></h3>
															<div class="subhead">Internal Quality Planner</div>
														</div>

														<div class="card-body">
															<p>I'm Andrea, an Internal Quality Planner from Brazil &amp; currently working on <a href="pages-search-results.html#">Sety</a>, <a href="pages-search-results.html#">T-Project</a> and <a href="pages-search-results.html#">TeamFox</a>.</p>
															<ul class="social-links">
																<li><a href="pages-search-results.html#"><i class="fa fa-github"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-twitter"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-linkedin"></i></a></li>
															</ul>
														</div>

														<div class="card-footer">
															<button class="btn btn-xs btn-default pull-left btn-ripple">Add as a Friend</button>
															<a href="pages-search-results.html#" class="pull-right"><small>8 friends in common</small></a>
														</div>
													</div>
												</div>

												<div class="col-md-4">
													<div class="card card-user pomegranate">
														<div class="card-heading heading-center text-color-white">
															<img src="../../assets/globals/img/faces/16.jpg" alt="" class="user-image"/>
															<h3 class="card-title"><a href="pages-search-results.html#">Marilyn Gomez</a></h3>
															<div class="subhead">Product Usability Specialist</div>
														</div>

														<div class="card-body">
															<p>I'm Marilyn, a Product Usability Specialist from Brazil &amp; currently working on <a href="pages-search-results.html#">Sety</a>, <a href="pages-search-results.html#">T-Project</a> and <a href="pages-search-results.html#">TeamFox</a>.</p>
															<ul class="social-links">
																<li><a href="pages-search-results.html#"><i class="fa fa-github"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-twitter"></i></a></li>
																<li><a href="pages-search-results.html#"><i class="fa fa-linkedin"></i></a></li>
															</ul>
														</div>

														<div class="card-footer">
															<button class="btn btn-xs btn-default pull-left btn-ripple">Add as a Friend</button>
															<a href="pages-search-results.html#" class="pull-right"><small>8 friends in common</small></a>
														</div>
													</div>
												</div>

											</div>
										</div>

									</div>

								</div>
							</div>
						</div>
					</div>

					<div class="footer-links margin-top-40">
						<div class="row no-gutters">
							<div class="col-xs-6 bg-indigo">
								<a href="pages-pricing.html">
									<span class="state">Pages</span>
									<span>Pricing Tables</span>
									<span class="icon"><i class="ion-android-arrow-back"></i></span>
								</a>
							</div>
							<div class="col-xs-6 bg-indigo">
								<a href="pages-timeline.html">
									<span class="state">Pages</span>
									<span>Timeline</span>
									<span class="icon"><i class="ion-android-arrow-forward"></i></span>
								</a>
							</div>
						</div>
					</div>

				</div>
</div>);



  }
});

module.exports=SearchResults;
