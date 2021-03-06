var assert = chai.assert

describe('window', function () {
  it('should be defined.', function () {
    assert.isDefined(window)
  })

  it('should expose localStorage.', function () {
    assert.isDefined(localStorage)
  })

  it('should expose sessionStorage.', function () {
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

    describe('storageType', function () {
      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

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

    describe('storage', function () {
      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

      it('should be defined.', function () {
        assert.isDefined(sut.storage)
      })

      it('should default to "localStorage".', function () {
        var sut = new ws()
        assert.strictEqual(sut.storage, window.localStorage)
      })

      it('should accept "sessionStorage".', function () {
        var sut = new ws('sessionStorage')
        assert.strictEqual(sut.storage, window.sessionStorage)
      })
    })

    describe('localStorageAvailable', function () {
      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

      it('should be defined.', function () {
        assert.isDefined(sut.localStorageAvailable)
      })

      it('should be true.', function () {
        assert.strictEqual(sut.localStorageAvailable, true)
      })
    })

    describe('sessionStorageAvailable', function () {
      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

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

      it('should return value for key', function () {
        window.localStorage.setItem('key', 'value')
        var result = sut.get('key')
        assert.strictEqual(result, 'value')
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

      it('should set an item.', function () {
        sut.set('key', 'value')
        assert.strictEqual(window.localStorage.getItem('key'), 'value')
      })

      it('should update an item.', function () {
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

    describe('key', function () {
      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

      it('should be defined.', function () {
        assert.isDefined(sut.key)
      })

      it('should get all the keys in the storage.', function () {
        // Arrange
        var keyValues = [
          { key: 'key1', value: 'value1' },
          { key: 'key2', value: 'value2' },
          { key: 'key3', value: 'value3' },
        ]

        window.localStorage.setItem(keyValues[0].key, keyValues[0].value)
        window.localStorage.setItem(keyValues[1].key, keyValues[1].value)
        window.localStorage.setItem(keyValues[2].key, keyValues[2].value)

        // Act
        for (var index = 0; index < window.localStorage.length; index++) {
          var element = sut.key(index)
          for (var index2 = keyValues.length - 1; index2 >= 0; index2--) {
            if (keyValues[index2] && keyValues[index2].key === element) {
              keyValues.splice(index2, 1)
            }
          }
        }

        // Assert
        assert.strictEqual(keyValues.length, 0)
      })

      it('should return null if index is out of bound.', function () {
        // Remember the clean in the beforeEach.
        assert.strictEqual(sut.key(-1), null)
        assert.strictEqual(sut.key(Infinity), null)
        assert.strictEqual(sut.key(-Infinity), null)
      })
    })

    describe('clear', function () {
      var sut

      beforeEach('clear all entries', function () {
        sut = new ws()
        window.localStorage.clear()
      })

      it('should be defined.', function () {
        assert.isDefined(sut.clear)
      })

      it('should clear all items.', function () {
        // Arrange
        var keyValues = [
          { key: 'key1', value: 'value1' },
          { key: 'key2', value: 'value2' },
          { key: 'key3', value: 'value3' },
        ]

        window.localStorage.setItem(keyValues[0].key, keyValues[0].value)
        window.localStorage.setItem(keyValues[1].key, keyValues[1].value)
        window.localStorage.setItem(keyValues[2].key, keyValues[2].value)

        assert.strictEqual(sut.storage.length, 3)

        // Act
        sut.clear()

        // Assert
        assert.strictEqual(sut.storage.length, 0)
      })

      it('should return the number of item cleared.', function () {
        // Arrange
        var keyValues = [
          { key: 'key1', value: 'value1' },
          { key: 'key2', value: 'value2' },
          { key: 'key3', value: 'value3' },
        ]

        window.localStorage.setItem(keyValues[0].key, keyValues[0].value)
        window.localStorage.setItem(keyValues[1].key, keyValues[1].value)
        window.localStorage.setItem(keyValues[2].key, keyValues[2].value)

        assert.strictEqual(sut.storage.length, 3)

        // Act
        var result = sut.clear()

        // Assert
        assert.strictEqual(result, 3)
      })
    })

  })

})
