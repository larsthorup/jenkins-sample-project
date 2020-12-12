import chai from 'chai';
const { expect } = chai;

describe('math', function () {
  describe('sqrt', function () {
    it('should work for integers', function () {
      expect(Math.sqrt(16)).to.equal(4);
    });
    it('should work for almost-integers', function () {
      expect(Math.sqrt(15.99999999999)).to.equal(3.99999999999);
    });
  });
});