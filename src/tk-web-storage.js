/**
 * TK Web Storage Library
 * @version: 0.0.0
 * @author: Thomas Kerbrat - https://github.com/ThomasKerbrat
 * @license: ICS
 * Copyright (C) 2016 Thomas Kerbrat
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
 * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
 * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

(function (window, factory) {
  if (typeof angular === 'object') {
    // TODO: AngularJS provider.
    // angular.module('TKWebStorageLibrary', [])
    //   .provider('TKWebStorage', [function () { }])
  } else {
    window.ws = factory()
  }
} (this, function TKWebStorageLibraryFactory() {

  /**
   * @description Checks the availability of the given storage on the window object and try to use the API to test for zero quota.
   * @param {string} type The name of the storage to test.
   * @return {boolean} Returns if the browser supports and make available the tested storage.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
   */
  function storageAvailable(type) {
    try {
      var storage = window[type]
      var x = '__storage_test__'
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * @class TKWebStorage
   * @param {string} storage The type of storage you want to use. Possible values: "localStorage" (default) and "sessionStorage".
   */
  function TKWebStorage(storage) {

    /**
     * @member {boolean} localStorageAvailable Tells if the `window.localStorage` is supported and available.
     */
    this.localStorageAvailable = storageAvailable('localStorage')

    /**
     * @member {boolean} sessionStorageAvailable Tells if the `window.sessionStorage` is supported and available.
     */
    this.sessionStorageAvailable = storageAvailable('sessionStorage')

    /**
     * @member {string} storageType The storage choosed when instanciating. Default to `'localStorage'`.
     */
    this.storageType = 'localStorage'
    if (storage !== undefined) {
      if (['localStorage', 'sessionStorage'].indexOf(storage) === -1) {
        throw new Error('Constructor only accepts "localStorage" and "sessionStorage" for the storage parameter.')
      } else {
        this.storageType = storage
      }
    }

    if (this.storageType === 'localStorage' && !this.localStorageAvailable) {
      throw new Error('"localStorage" not enabled or available in the current browser.')
    }
    if (this.storageType === 'sessionStorage' && !this.sessionStorageAvailable) {
      throw new Error('"sessionStorage" not enabled or available in the current browser.')
    }

    /**
     * @member {string} storage The underlying storage for the current browser.
     */
    this.storage = window[this.storageType]

  }



  TKWebStorage.prototype.get = _getItem
  TKWebStorage.prototype.getItem = _getItem

  /**
   * @description Get the value for the given key.
   * @name TKWebStorageLibrary.get
   * @param {string} keyName The name of the key to get the value.
   * @returns {null|string} The value stored under the keyName key, or null if nothing was found.
   */
  function _getItem(keyName) {
    return this.storage.getItem(keyName)
  }



  TKWebStorage.prototype.set = _setItem
  TKWebStorage.prototype.setItem = _setItem

  /**
   * @description Set the given value with the given key in the current storage.
   * @name TKWebStorageLibrary.set
   * @param {string} keyName The name of the key to set the value.
   * @param {string} keyValue The value to set.
   * @returns {string} The value stored under the keyName key.
   */
  function _setItem(keyName, keyValue) {
    return this.storage.setItem(keyName, keyValue)
  }



  TKWebStorage.prototype.remove = _removeItem
  TKWebStorage.prototype.removeItem = _removeItem

  /**
   * @description Remove an item for the given key.
   * @name TKWebStorageLibrary.remove
   * @param {string} keyName The name of the key to remove the value.
   * @returns {null|number|string} The value removed for the given key, or null if nothing was found.
   */
  function _removeItem(keyName) {
    var value = this.get(keyName)
    if (value === null) {
      return null
    }

    this.storage.removeItem(keyName)
    return value
  }



  TKWebStorage.prototype.key = _key

  /**
   * @description Get the key name at given index.
   * @name TKWebStorageLibrary.key
   * @param {number} keyIndex The index of the key to retrieve.
   * @returns {null|string} The key at keyIndex key, or null if index is out of bound.
   */
  function _key(keyIndex) {
    return this.storage.key(keyIndex)
  }



  TKWebStorage.prototype.clear = _clear

  /**
   * @description Clear all items in the storage.
   * @name TKWebStorageLibrary.clear
   * @returns {number} The number of item cleared.
   */
  function _clear() {
    var length = this.storage.length
    return this.storage.clear(), length
  }

  return TKWebStorage
}))
