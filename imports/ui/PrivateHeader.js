import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

//Prezentacijski component - koristi se kada je potrebno samo prikazati kod, kada netreba ćuvati state
//Statles functional component
const PrivateHeader = (props) => {
  //  const onLogout = () => {
  //      Accounts.logout();
  //  }

  return(
    <div className="header">
      <div className="header__content">
          <h1 className="header__title">{ props.title }</h1>
          <button className="button button--link-text" onClick={() => {
            Accounts.logout();
          }}>Logout!</button>
      </div>
    </div>
  );
} ;

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;

//export default class PrivateHeader extends React.Component {
//  onLogout() {
//      Accounts.logout();
//  }
//  render() {
//    let { title } = this.props
//
//    return(
//      <div>
//        <h1>{ title }</h1>
//        <button onClick={ this.onLogout.bind(this) }>Logout!</button>
//      </div>
//    );
//  }
//}
