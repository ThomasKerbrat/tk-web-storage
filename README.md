# TKWebStorage

TKWebStorage is a wrapper around the [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) API.
I developped it as a personnal library to use in my projects, hence my initials in the name of the library.
It will eventually be published on [npmjs.com](https://www.npmjs.com/) so it can be fetched easilly.

## How to use?

Include the script in your HTML:

``` html
<!doctype html>
<html>
  <head>
    <title>Your App</title>
    <script type="text/javascript" src="path/to/lib.js"></script>
  </head>
  <body>...</body>
</html>
```



# Basic API

When you load the library in your browser, as of 0.0.0, it register the `ws` global variable on the `window` object.
This `ws` variable holds the `TKWebStorage` type and must be instantiated in order to be used.

`TKWebStorage` has the same API as a `Storage` object.
It also exposes a simpler API (function name without the "Item" suffix).

``` javascript
var store = new ws()

store.set('key', 21)   // returns: undefined
store.get('key')       // returns: 21
store.remove('key2')   // returns: 21
store.key(1)           // returns: 'key2'
store.clear()          // returns: 1
```

## Properties

Summary

- [TKWebStorage.localStorageAvailable](#TKWebStorage.localStorageAvailable)
- [TKWebStorage.sessionStorageAvailable](#TKWebStorage.sessionStorageAvailable)
- [TKWebStorage.storageType](#TKWebStorage.storageType)
- [TKWebStorage.storage](#TKWebStorage.storage)

### TKWebStorage.localStorageAvailable
`boolean`
Tells if the `window.localStorage` is supported and available.

### TKWebStorage.sessionStorageAvailable
`boolean`
Tells if the `window.sessionStorage` is supported and available.

### TKWebStorage.storageType
`string`
The storage choosed when instanciating. Default to `'localStorage'`.

### TKWebStorage.storage
[Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
The underlying storage for the current browser.


## Methods

Summary

- [TKWebStorageLibrary.get](#TKWebStorageLibrary.get)
- [TKWebStorageLibrary.set](#TKWebStorageLibrary.set)
- [TKWebStorageLibrary.remove](#TKWebStorageLibrary.remove)
- [TKWebStorageLibrary.key](#TKWebStorageLibrary.key)
- [TKWebStorageLibrary.clear](#TKWebStorageLibrary.clear)

### TKWebStorageLibrary.get
Get the value for the given key.
#### Parameter
1. `keyName`: `string` The name of the key to get the value.
#### Returns
`null|string` The value stored under the keyName key, or null if nothing was found.

### TKWebStorageLibrary.set
Set the given value with the given key in the current storage.
#### Parameters
1. `keyName`: `string` The name of the key to set the value.
2. `keyValue`: `number|string` The value to set.
#### Returns
`number|string` The value stored under the keyName key.

### TKWebStorageLibrary.remove
Remove an item for the given key.
#### Parameter
1. `keyName`: `string` The name of the key to remove the value.
#### Returns
`null|number|string` The value removed for the given key, or null if nothing was found.

### TKWebStorageLibrary.key
Get the key name at given index.
#### Parameter
1. `keyIndex`: `number` The index of the key to retrieve.
#### Returns
`null|string` The key at keyIndex key, or null if index is out of bound.

### TKWebStorageLibrary.clear
Clear all items in the storage.
#### Returns
`string` The number of item cleared.


# What type of storage?

The Web API for Storage exposes two type of storages, a `localStorage` and a `sessionStorage`.
You can configure the type of storage you want with the first parameter of the constructor function.

``` javascript
var session_store = new ws('sessionStorage')

// Default to 'localStorage':
var local_store_1 = new ws('localStorage')
var local_store_2 = new ws()
```

When instantiating the `TKWebStorage` type, the constructor test for the browser support and availability of the choosed storage type.
If a wrong storage name is given, or if the storage is not available because of incognito mode, an `Error` is thrown.
(Subject to change.)

``` javascript
// Throw Error:
var store = new ws('beerStorage')

delete window.localStorage
// Throw Error:
var store = new ws()
```

The browser underlying storage is available under the `storage` property:

``` javascript
var session_store = new ws('sessionStorage')
var is_true = session_store.storage === window.sessionStorage
```



# TODO

1. Namespaces
2. Item Expiration
3. Register in AngularJS 1.X
4. Promise based API (each call return a promise with (err, data) as param, no throw in the source code)
