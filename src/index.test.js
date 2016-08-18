var assert = chai.assert

describe('Web Storage', function () {
  it('should expose localStorage', function () {
    assert.isDefined(localStorage)
  })

  it('should expose the lib under window.ws', function () {
    assert.isDefined(ws)
  })

  describe('API', function () {
    it('should expose test', function () {
      assert.isDefined(ws.test)
      assert.strictEqual(ws.test, 'abc123')
    })
  })
})
