var React = require('react');
var Router = require('react-router');
var CallSection = React.createClass({
import { connect } from 'react-redux'

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

      return (<div><div className="page-header full-content bg-blue">
        <div className="row">
          <div className="col-sm-6">
            <h1>Video Cards <small>short description</small></h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb">
              <li><a href="cards-video.html#"><i className="ion-home"></i></a></li>
              <li><a href="cards-video.html#">Cards</a></li>
              <li><a href="cards-video.html#" className="active">Video Cards</a></li>
            </ol>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card card-video card-player-blue">

            <div className="card-heading">
              <video id="videojs1" className="video-js video-js-responsive vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="../../assets/globals/img/picjumbo/10.jpg" data-width="640" data-height="264">
                <source src="http://video-js.zencoder.com/oceans-clip.mp4" type="video/mp4">
                <source src="http://video-js.zencoder.com/oceans-clip.webm" type="video/webm">
                <source src="http://video-js.zencoder.com/oceans-clip.ogv" type="video/ogg">
                <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
              </video>
            </div>

            <div className="card-body">
              <h4>Responsive &amp; color variation</h4>
              <p>Songs that make you feel. Dynamic. Emotional. No electronic songs.</p>
            </div>

          </div>
        </div>

        <div className="col-md-6">
          <div className="card card-video card-player-red">

            <div className="card-heading">
              <video id="videojs2" className="video-js video-js-responsive vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="../../assets/globals/img/picjumbo/16.jpg">
                <source src="http://video-js.zencoder.com/oceans-clip.mp4" type="video/mp4">
                <source src="http://video-js.zencoder.com/oceans-clip.webm" type="video/webm">
                <source src="http://video-js.zencoder.com/oceans-clip.ogv" type="video/ogg">
                <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
              </video>
            </div>

            <div className="card-body">
              <h4>Responsive &amp; color variation</h4>
              <p>Songs that make you feel. Dynamic. Emotional. No electronic songs.</p>
            </div>

          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card card-video card-video-modal card-player-purple">
            <div className="bg-image sample-bg-image7"></div>

            <div className="card-body">
              <a href="cards-video.html#" className="play-button-container" data-toggle="modal" data-target="#videojs-modal-1">
                <div className="play-button"></div>
              </a>
            </div>


            <div className="modal fade video-js-modal" id="videojs-modal-1" tabindex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <video id="videojs3" className="video-js video-js-responsive vjs-default-skin vjs-big-play-centered" controls preload="none" poster="../../assets/globals/img/picjumbo/13.jpg">
                      <source src="http://video-js.zencoder.com/oceans-clip.mp4" type="video/mp4">
                      <source src="http://video-js.zencoder.com/oceans-clip.webm" type="video/webm">
                      <source src="http://video-js.zencoder.com/oceans-clip.ogv" type="video/ogg">
                      <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                    </video>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="col-md-4">
          <div className="card card-video card-video-modal card-player-yellow">
            <div className="bg-image sample-bg-image11"></div>

            <div className="card-body">
              <a href="cards-video.html#" className="play-button-container" data-toggle="modal" data-target="#videojs-modal-2">
                <div className="play-button"></div>
              </a>
            </div>

            <div className="card-information">
              In modal window, video starts automatically
            </div>

            <div className="modal fade video-js-modal" id="videojs-modal-2" tabindex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <video id="videojs4" className="video-js video-js-responsive vjs-default-skin vjs-big-play-centered" controls preload="none" poster="../../assets/globals/img/picjumbo/2.jpg" data-modal-autoplay="true">
                      <source src="http://video-js.zencoder.com/oceans-clip.mp4" type="video/mp4">
                      <source src="http://video-js.zencoder.com/oceans-clip.webm" type="video/webm">
                      <source src="http://video-js.zencoder.com/oceans-clip.ogv" type="video/ogg">
                      <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                    </video>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="col-md-4">
          <div className="card card-video card-video-modal card-player-teal">
            <div className="bg-image sample-bg-image5"></div>

            <div className="card-body">
              <a href="cards-video.html#" className="play-button-container" data-toggle="modal" data-target="#videojs-modal-3">
                <div className="play-button"></div>
              </a>
            </div>
            <div className="modal fade video-js-modal" id="videojs-modal-3" tabindex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <video id="videojs5" className="video-js video-js-responsive vjs-default-skin vjs-big-play-centered" controls preload="none" poster="../../assets/globals/img/picjumbo/5.jpg">
                      <source src="http://video-js.zencoder.com/oceans-clip.mp4" type="video/mp4">
                      <source src="http://video-js.zencoder.com/oceans-clip.webm" type="video/webm">
                      <source src="http://video-js.zencoder.com/oceans-clip.ogv" type="video/ogg">
                      <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                    </video>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="row full-video card-player-light-blue no-gutters">
        <div className="col-md-8">
          <video id="playlist" className="video-js vjs-default-skin vjs-big-play-centered" controls data-setup="" ></video>
        </div>

        <div className="col-md-4">
          <div className="playlist-heading">Web Development Tutorials</div>

          <ul className="video-playlist" style="max-height: 480px; overflow-y: auto;">
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card card-video card-player-orange">

            <div className="card-heading">

              <video id="youtube" className="video-js video-js-responsive vjs-default-skin vjs-big-play-centered" controls preload="none" data-width="640" data-height="360" data-setup='{ "techOrder": ["youtube"], "src": "http://www.youtube.com/watch?v=Q8TXgCzxEnw" }'></video>

            </div>

            <div className="card-body">
              <h4>Youtube Video Support</h4>
              <p>YouTube playback technology for the Video.js player.</p>
            </div>

          </div>
        </div>

        <div className="col-md-6">
          <div className="card card-video">

            <div className="card-heading">
              <video id="videojs6" className="video-js video-js-responsive vjs-sublime-skin" controls preload="auto" poster="../../assets/globals/img/picjumbo/16.jpg">
                <source src="http://video-js.zencoder.com/oceans-clip.mp4" type="video/mp4">
                <source src="http://video-js.zencoder.com/oceans-clip.webm" type="video/webm">
                <source src="http://video-js.zencoder.com/oceans-clip.ogv" type="video/ogg">
              </video>
            </div>

            <div className="card-body">
              <h4>Theme Support</h4>
            </div>

          </div>
        </div>
      </div>
</div>);



  }
});

export default CallSection;
