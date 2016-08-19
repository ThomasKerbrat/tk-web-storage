var assert = chai.assert

describe('window', function () {
  it('should be defined', function () {
    assert.isDefined(window)
  })

  it('should expose localStorage', function () {
    assert.isDefined(localStorage)
  })

  it('should expose sessionStorage', function () {
    assert.isDefined(sessionStorage)
  })
})

describe('The library', function () {
  it('should expose itslef under window.ws.', function () {
    assert.isDefined(window.ws)
  })
})

describe('TKWebStorageLibrary', function () {

  describe('constructor', function () {
    it('should accept "localStorage" or "sessionStorage" in first parameter.', function () {
      assert.doesNotThrow(function () {
        var sut1 = new ws('localStorage')
        var sut2 = new ws('sessionStorage')
      }, Error)
    })

    it('should throw for any other value in first parameter.', function () {
      assert.throw(function () {
        var sut = new ws(0)
      }, Error, /Constructor only accepts "localStorage" and "sessionStorage" for the storage parameter./)
    })

    it('should throw an error if the storage type is not available.', function () {
      assert.throw(function () {
        var window_ls = window.localStorage
        delete window.localStorage

        try {
          var sut = new ws('localStorage')
        } catch (error) {
          throw error
        } finally {
          window.localStorage = window_ls
        }
      }, Error, /"localStorage" not enabled or available in the current browser./)
    })
  })

  describe('property', function () {

    var sut = new ws()

    describe('storageType', function () {
      it('should be defined.', function () {
        assert.isDefined(sut.storageType)
      })

      it('should default to "localStorage".', function () {
        var sut = new ws()
        assert.strictEqual(sut.storageType, 'localStorage')
      })

      it('should accept "sessionStorage".', function () {
        var sut = new ws('sessionStorage')
        assert.strictEqual(sut.storageType, 'sessionStorage')
      })
    })

    describe('localStorage', function () {
      it('should be defined.', function () {
        assert.isDefined(sut.localStorageAvailable)
      })

      it('should be true.', function () {
        assert.strictEqual(sut.localStorageAvailable, true)
      })
    })

    describe('sessionStorage', function () {
      it('should be defined.', function () {
        assert.isDefined(sut.sessionStorageAvailable)
      })

      it('should be true.', function () {
        assert.strictEqual(sut.sessionStorageAvailable, true)
      })
    })
  })

  describe('prototype', function () {

    describe('get', function () {

      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

      it('should be defined and alias getItem.', function () {
        assert.isDefined(sut.get)
        assert.strictEqual(sut.get, sut.getItem)
      })

      it('should return null if a key does not exists.', function () {
        assert.strictEqual(sut.get('a key that does not exists'), null)
      })
    })

    describe('set', function () {

      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

      it('should be defined alias setItem.', function () {
        assert.isDefined(sut.set)
        assert.strictEqual(sut.set, sut.setItem)
      })

      it('should set an item in the localStorage.', function () {
        sut.set('key', 'value')
        assert.strictEqual(window.localStorage.getItem('key'), 'value')
      })

      it('should set a value even if the key is already present', function () {
        window.localStorage.setItem('key', 'value')
        assert.strictEqual(window.localStorage.getItem('key'), 'value')
        sut.set('key', 'value2')
        assert.strictEqual(window.localStorage.getItem('key'), 'value2')
      })
    })

    describe('remove', function () {

      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

      it('should be defined and alias removeItem.', function () {
        assert.isDefined(sut.remove)
        assert.strictEqual(sut.remove, sut.removeItem)
      })

      it('should remove an item.', function () {
        window.localStorage.setItem('key', 'value')
        assert.strictEqual(window.localStorage.getItem('key'), 'value')

        sut.remove('key')
        assert.strictEqual(window.localStorage.getItem('key'), null)
      })

      it('should return the value removed.', function () {
        window.localStorage.setItem('key', 'value')
        assert.strictEqual(window.localStorage.getItem('key'), 'value')

        var removed_value = sut.remove('key')
        assert.strictEqual(removed_value, 'value')
      })

      it('should return null if nothing was to be removed.', function () {
        assert.strictEqual(window.localStorage.getItem('key'), null)

        var removed_value = sut.remove('key')
        assert.strictEqual(removed_value, null)
      })
    })

  })
})
