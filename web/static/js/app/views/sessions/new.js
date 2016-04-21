import React, {PropTypes}   from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';

import { setDocumentTitle } from '../../utils';
import Actions              from '../../actions/sessionActions';

class SessionsNew extends React.Component {
  componentDidMount() {
    setDocumentTitle('Sign in');
        document.body.classList.toggle('login', this.props.isDark)
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.refs;
    const { dispatch } = this.props;

    dispatch(Actions.signIn(email.value, password.value));
  }
    componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('login', nextProps.isDark)
  }

  componentWillUnmount() {
    document.body.classList.remove('login')
  }


  _renderError() {
    let { error } = this.props;

    if (!error) return false;

    return (
      <div className="error">
        {error}
      </div>
    );
  }

  render() {
    return (


      <div className='view-container sessions new'>
        <main>
          <header>
            <div className="logo" />
          </header>
          <form id="sign_in_form" onSubmit={::this._handleSubmit}>
            {::this._renderError()}
            <div className="field">
              <input
                ref="email"
                type="Email"
                id="user_email"
                placeholder="Email"
                required="true"
                />
            </div>
            <div className="field">
              <input
                ref="password"
                type="password"
                id="user_password"
                placeholder="Password"
                required="true"
                />
            </div>
            <button type="submit">Sign in</button>
          </form>
          <a  href="/users/new">Create new account</a>
        </main>
      </div>




    );
  }
}

const mapStateToProps = (state) => (
  state.session
);

export default connect(mapStateToProps)(SessionsNew);
