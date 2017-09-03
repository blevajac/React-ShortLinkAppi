import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';  //npm za pregled valjanosti unosa podataka => Validacija
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  //validacija
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });


  return true;
});
