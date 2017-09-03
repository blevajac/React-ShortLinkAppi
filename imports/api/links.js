import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';  //npm za pregled valjanosti unosa podataka => Validacija
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

//publikacija za praćenje unosa podataka korisnika
if (Meteor.isServer) {
  Meteor.publish('links', function() {
    //string naziv može biti bilo što ('links') no mora biti isto koje će se dalje prosljediti na Meteor.subscribe('links')
    //prikazuje koje podatke specifian klijent može vidjeti
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  //konvekcija nazivanja meteor metoda => resurce.akcija
  'links.insert'(url) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      //validacija
      new SimpleSchema({
        url: {
          type: String,
          label: 'Vaš link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({ url });

      Links.insert({
        _id: shortid.generate(),
        url,
        userId: this.userId,
        visible: true,
        visitedCount: 0,
        lastVisitedAt: null
      });
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min:1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });
    //.validate({ _id: _id, visible: visible });

    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    });
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min:1
      }
    }).validate({ _id });

    Links.update({ _id }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
});
