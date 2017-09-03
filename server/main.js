import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'

import './../imports/api/users';
import { Links } from './../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
      const _id = req.url.slice(1);
      const link = Links.findOne({ _id });

      if(link){
        res.statusCode = 302;
        res.setHeader('Location', link.url);
        res.end();
        Meteor.call('links.trackVisit', _id);
      }else {
        next();
      }
  });
});


//WebApp služi za dodavanje Middlewara
    //req => dolazeći requesti (header, traženi url) ; res => naš odgovor na rew (redirekcija, header 503)
    //next => kada je midlware gotov next omogućuje da App dalje radi
//WebApp.connectHandlers.use((req, res, next) => {
  //REQ
  //console.log('Meteor middleware');
  //console.log('req.url: ', req.url, req.method, req.headers, req.query);

  //RES
  //set HTTP status code => res.statusCode = 404;
  //set HTTP header      => res.setHeader('my-coustom-header', 'haha-u-suck');
  //set HTTP body        => res.write('<p>Ovo je moj masakar</p>')
  //end HTTP request     => res.end();
  //next();
//});
