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

    it('weight is between 100 and 300', function() {
      assert(validApp.weightIsValid());
    });
  });

  describe('Application invalid if...', function() {
    it('email is 4 chars os less', function() {
      var mockApp = new MembershipApplication({
        email: 't@t'
      });
      assert(!mockApp.emailIsValid());
    });

    it('email does not contain @', function() {
      var mockApp = new MembershipApplication({
        email: 'teste:teste.com'
      });
      assert(!mockApp.emailIsValid());
    });

    it('email is omitted', function() {
      var mockApp = new MembershipApplication({});
      assert(!mockApp.emailIsValid());
    });

    it('height is less than 60 inches', function() {
      var mockApp = new MembershipApplication({
        height: 50
      });
      assert(!mockApp.heightIsValid());
    });

    it('height is more than 75 inches', function() {
      var mockApp = new MembershipApplication({
        height: 800
      });
      assert(!mockApp.heightIsValid());
    });

    it('height is omitted', function() {
      var mockApp = new MembershipApplication({});
      assert(!mockApp.heightIsValid());
    });

    it('age is more than 100', function() {
      var mockApp = new MembershipApplication({
        age: 150
      });
      assert(!mockApp.ageIsValid(mockApp));
    });

    it('age is less than 15', function() {
      var mockApp = new MembershipApplication({
        age: 14
      });
      assert(!mockApp.ageIsValid(mockApp));
    });

    it('age is omitted', function() {
      var mockApp = new MembershipApplication({});
      assert(!mockApp.ageIsValid(mockApp));
    });

    it('weight is less than 100', function() {
      var mockApp = new MembershipApplication({
        weight: 10
      });
      assert(!mockApp.weightIsValid(mockApp));
    });

    it('weight is more than 300', function() {
      var mockApp = new MembershipApplication({
        weight: 1000
      });
      assert(!mockApp.weightIsValid(mockApp));
    });

    it('weight is omitted', function() {
      var mockApp = new MembershipApplication({});
      assert(!mockApp.weightIsValid(mockApp));
    });

    it('first is omitted', function() {
      var mockApp = new MembershipApplication({
        last: 'Doe'
      });
      assert(!mockApp.nameIsValid(mockApp));
    });

    it('last is omitted', function() {
      var mockApp = new MembershipApplication({
        first: 'John'
      });
      assert(!mockApp.nameIsValid(mockApp));
    });

    it('is expired ', function() {
      var mockApp = new MembershipApplication({
        validUntil: '09/31/2010'
      });
      assert(mockApp.expired());
    });

  });
});
