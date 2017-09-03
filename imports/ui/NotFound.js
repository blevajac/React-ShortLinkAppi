import React from 'react';
import { Link } from 'react-router';

//Prezentacijski component - koristi se kada je potrebno samo prikazati kod, kada netreba ćuvati state
//Statles functional component
export default () => {
  return(
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Stranica nije nađena</h1>
        <p>Nažalost, Zec nam je pojeo stranicu!!! (BJEŽITE)</p>
        <Link to="/" className="button button--link">Vratite me natrag!</Link>
      </div>
    </div>
  );
}

//export default class NotFound extends React.Component {
//  render() {
//    return(
//      <div className="not-found">
//        <p>404 Not Found</p>
//      </div>
//    );
//  }
//}
