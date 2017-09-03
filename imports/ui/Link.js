import React from 'react';

//components
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilter from './LinkListFilter';

//Prezentacijski component - koristi se kada je potrebno samo prikazati kod, kada netreba ćuvati state
//Statles functional component
export default () => {
  return(
    <div>
      <PrivateHeader title="Vaši linkovi iz Linkova"/>
      <div className="page-content">
        <LinkListFilter />
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
}

//export default class Link extends React.Component {
//  render() {
//    return(
//      <div>
//        <PrivateHeader title="Vaši linkovi iz Linkova"/>
//        <LinksList />
//        <AddLink />
//      </div>
//    );
//  }
//}
