

var ChatChannelActionCreators = require('../../actions/ChatChannelActionCreators');
var ChatThreadActionCreators = require('../../actions/ChatThreadActionCreators');
var React = require('react');
var cx = require('react/lib/cx');
var MucStore = require('../../stores/MucStore');
var Router = require('react-router');

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

var ReactPropTypes = React.PropTypes;


var ChannelListItem = React.createClass({

    propTypes: {
        channel: ReactPropTypes.object,
        currentMucID: ReactPropTypes.string,
        chat:  ReactPropTypes.object,
        params: ReactPropTypes.object
    },

    contextTypes: {
      router: React.PropTypes.func
    },
    getStateFromStore: function () {
      var f=this.context.router.getCurrentParams();
      var id = this.context.router.getCurrentParams().id;
      if (!id){
        id=this.props.channel.jid;
      }


      return {
        channel: MucStore.get(id),
      };
    },

    getInitialState: function () {
      return this.getStateFromStore();
    },

    componentDidMount: function () {
      MucStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
      MucStore.addChangeListener(this._onChange);
    },

    componentWillReceiveProps: function () {
      MucStore.addChangeListener(this._onChange);
    },

    render: function() {
        var channel = this.props.channel;
        var chat = this.props.chat;
        return (
          <div>



            <Link to="channel"   onClick={this._onClick}  key={channel.jid} params={{id: channel.jid}}>



            <li className={cx({
            'channels has-action-left has-action-right': true,
            'active': channel.jid === this.props.chat.id

    })}


>

                        <div className="list-content">
                            <span className="title">{channel.name}</span>
                            <span className="caption">{channel.unread}</span>
                        </div>




</li>
</Link>

</div>


        );
    },

    _onClick: function() {
        ChatChannelActionCreators.clickChannel(this.props.channel.jid);
    }
    ,
    _onChange: function() {
      this.setState(this.getStateFromStore());
    }

});

module.exports = ChannelListItem;
