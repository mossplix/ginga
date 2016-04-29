import React from 'react';
import { Link } from 'react-router';

import {IntlProvider} from 'react-intl';

export default class MainLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
              <IntlProvider locale="en">
      <div>
        {this.props.children}
      </div>
          </IntlProvider>
    );
  }
}
