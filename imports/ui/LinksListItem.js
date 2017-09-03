import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class  LinksListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      justCopied: false
    }
  }

  componentDidMount() {
      this.clipboard = new Clipboard(this.refs.copy);

      this.clipboard.on('success', () => {
        this.setState ({ justCopied: true });
        setTimeout(() => this.setState ({ justCopied: false }), 1000);
      }).on('error', () => {
        //alert("It' Dead");
      });
  }

  componentWillUnmount() {
      this.clipboard.destroy();
  }

  renderStats() {
      let { visitedCount, lastVisitedAt } = this.props;
      const visitMessage = this.props.visitedCount === 1 ? 'put' : 'puta';
      let visitedMessage = null;

      if (typeof lastVisitedAt === 'number') {
        visitedMessage = `(posjećeno ${ moment(this.props.lastVisitedAt).fromNow() })`
      }

      return <p className="item_message">Posjetio: { visitedCount } { visitMessage } { visitedMessage }</p>;
  }

  render() {
    let { shortUrl, url, userId, _id, visible } = this.props;
    return(
      <div className="item">
          <h2>{ url }</h2>
          <p className="item_message">{ shortUrl }</p>
          { this.renderStats() }
          <a className="button button--pill button--link" href={ shortUrl } target="_blank">
            Posjeti stranicu
          </a>
          <button className="button button--pill" ref="copy" data-clipboard-text={ shortUrl } >
            { this.state.justCopied ? 'Kopirano' : 'Kopiraj'}
          </button>
          <button className="button button--pill" ref="hide" onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
          }}>
            { visible ? 'Sakri' : 'Pokaži'}
          </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  url:      PropTypes.string.isRequired,
  _id:      PropTypes.string.isRequired,
  visible:  PropTypes.bool.isRequired,
  userId:   PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
