import chai from 'chai';
import ValidationError from '../src/ValidationError';

describe('test', function () {
  it('add error object', () => {
    const error = new ValidationError();

    error.add('test', 'エラーのテストです');

    chai.expect(error.get('test')[0]).to.equal('エラーのテストです');
  });

  it('add error object in constructor', () => {
    const error = new ValidationError({
      'test': [ 'エラーのテストです' ]
    });

    chai.expect(error.get('test')[0]).to.equal('エラーのテストです');
  });
});
