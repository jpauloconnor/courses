var assert = require('assert'),
  MembershipApplication = require('../membership_application');

describe('Applying for a mission', function() {
  describe('Application successful if...', function() {
    before(function() {
      validApp = new MembershipApplication({
        first: 'John',
        last: 'Doe',
        email: 'johndoe@test.com',
        age: 33,
        height: 70,
        weight: 200
      });
    });

    it('all validators successful', function() {
      assert(validApp.isValid(), 'invalid app!');
    });

    it('first and last name are provided', function() {
      assert(validApp.nameIsValid());
    });

    it('email is 4 or more chars and contains @', function() {
      assert(validApp.emailIsValid());
    });

    it('age is between 15 and 100', function() {
      assert(validApp.ageIsValid());
    });

    it('height is between 60 and 75 inches', function() {
      assert(validApp.heightIsValid());
    });

    it('weight is between 100 and 300')
  });
});
