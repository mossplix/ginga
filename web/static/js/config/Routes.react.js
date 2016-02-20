var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Redirect=Router.Redirect;

var TodoApp = require('../components/TodoApp.react');
var ChatApp = require('../components/ChatApp.react');
var ThreadSection = require('../components/ThreadSection.react');
var ChannelSection = require('../components/channels/ChannelSection.react');

var CallContacts = require('../components/call/CallContacts.react');

var createChannel = require('../components/channels/createChannel.react');

var ContactList = require('../components/contacts/ContactList.react');
var Contacts = require('../components/contacts/Contacts.react');

var Crm = require('../components/crm/CRM.react');
var About = require('../components/general/About.react');

var NotFound = require('../components/general/NotFound.react');
var Search = require('../components/general/Search.react');
var AppDashboard = require('../components/general/AppDashboard.react');

var Home = require('../components/general/Home.react');

var SearchResults = require('../components/general/SearchResults.react');
var Settings = require('../components/general/Settings.react');
var LeadsSection = require('../components/Leads/LeadsSection.react');
var CreateLead = require('../components/Leads/CreateLead.react');
var ProjectApp = require('../components/projects/ProjectApp.react');
var Projects = require('../components/projects/Projects.react');
var ProjectApp = require('../components/projects/ProjectApp.react');
var CallContacts = require('../components/call/CallContacts.react');
var createChannel = require('../components/channels/createChannel.react');

var Routes;
var Routes = (
              <Route handler={AppDashboard} >
                  <Route path="/" name="home" handler={Home} />
                  <Route name="todo" handler={TodoApp} />
                  <Route name="about" handler={About} />
                  <Route name="search" path="/search" handler={Search} />
                  <Route name="contacts" path="/contacts" handler={Contacts} />
                  <Route name="settings" path="/settings" handler={Settings} />
                    <Route name="call" path="/call" handler={CallContacts} />
                      <Route name="create_muc" path="/channels/create" handler={createChannel} />



                  <Route path="/chat" name="chat"  handler={ChatApp} >
                    <Route name="thread" path="/threads/:id" handler={ThreadSection}>
                    </Route>


                    <Route name="channel" path="/channels/:id" handler={ChannelSection}>
                    </Route>
                  </Route>

                  <Route name="projects" path="/projects" handler={ProjectApp}>
                  </Route>
                  <Route name="project_list" path="/projects/all" handler={Projects}>
                  </Route>

              </Route>

);


module.exports=Routes;
