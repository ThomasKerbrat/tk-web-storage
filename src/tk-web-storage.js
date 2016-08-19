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

!(function (window, get_TKWebStorageLibrary) {
  if (window && !window.ws) {
    window.ws = get_TKWebStorageLibrary()
  }
  // TODO: AngularJS
})(this, function get_TKWebStorageLibrary() {

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
   * @param {string} storage The type of storage you want to use. Possible values: "localStorage" (default) and "sessionStorage".
   */
  function TKWebStorageLibrary(storage) {

    this.localStorageAvailable = storageAvailable('localStorage')
    this.sessionStorageAvailable = storageAvailable('sessionStorage')

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
    this.storage = window[this.storageType]

  }

  TKWebStorageLibrary.prototype.get = _getItem
  TKWebStorageLibrary.prototype.getItem = _getItem

  /**
   * @name TKWebStorageLibrary.get
   * @param {string} keyName The name of the key to get the value.
   * @returns {null|string} The value stored under the keyName key, or null if nothing was found.
   */
  function _getItem(keyName) {
    return this.storage.getItem(keyName)
  }

  TKWebStorageLibrary.prototype.set = _setItem
  TKWebStorageLibrary.prototype.setItem = _setItem

  /**
   * @name TKWebStorageLibrary.set
   * @param {string} keyName The name of the key to set the value.
   * @param {string} keyValue The value to set.
   * @returns {null|string} The value stored under the keyName key, or null if nothing was found.
   */
  function _setItem(keyName, keyValue) {
    return this.storage.setItem(keyName, keyValue)
  }

  return TKWebStorageLibrary
})
