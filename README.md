# Promise polyfill for [Wakanda](http://wakanda.org)

The `WPromise` "custom widget" Polyfill some of the main frontend Wakanda Asynchronous APIs to a Promisified version


## How to Install

You can install a custom widget by using the [Add-ons Extension](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4263.html "Add-ons Extension"). 

For more information, refer to the [Installing a Custom Widget](http://doc.wakanda.org/WakandaStudio/help/Title/en/page3869.html#1056003 "Installing a Custom Widget") manual.

## How to Use

Drag & drop the `WPromise` custom widget on your Wakanda Page. It will automatically Promisify the supported Wakanda Framework APIs.

### RPC example

Let say you have an `hello` RPC CommonJS module on your Wakanda Server that exports a `helloWorld()` method. From the frontend, `WPromise` will let you call it this way:

```javascript
    hello.helloWorld().then(function success(result) {
    	alert(result);
    })    
```

### Datasource example

Let say you have an `employee` datasource on your page. `WPromise` will let you make a query this way:

```javascript
    WAF.sources.employee.query('salary > 50000').then(function success(event) {
    	alert(event.result.length);
    })    
```

### Properties

This widget has the following properties:

* __Active__: Globally activate/disactivate the Promise polyfills
* __Rpc__: Makes the Wakanda Rpc methods results usable as Promises
* __Dataprovider__: Makes the WakandaDB frontend Data Provider API Promises compliant
* __Datasource__: Makes the WakandaDB frontend DataSource API Promises compliant
* __Tests Output__: A container widget ID in which Unit tests results will be published
* __Autorun Tests__: Automatically run the unit tests (if the "Tests Output" container ID is valid)


## References

### Wakanda APIs

* [RPC API](http://doc.wakanda.org/home2.fr.html#/Using-JSON-RPC-Services/Calling-Methods-from-the-Client-Side.300-306631.en.html)
* [Dataprovider API](http://doc.wakanda.org/home2.fr.html#/Dataprovider/Introduction.200-608064.en.html)
* [Datasource API](http://doc.wakanda.org/home2.fr.html#/Datasource/Introduction/What-is-a-Datasource.300-607007.en.html)

#### Standard

* [ECMAScript 2015 Promises](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-constructor)

#### Tutorials

* [Embrassing Promises](http://javascriptplayground.com/blog/2015/02/promises/)
* [HTML5 Rocks: Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* [Dr Axel Rauschmayer Blog: Promises](http://www.2ality.com/2014/10/es6-promises-api.html)



## Todo

Few things that could be enhanced in this project

* larger documentation
* larger unit tests coverage
* Wakanda [Component Widget API](http://doc.wakanda.org/home2.en.html#/Wakanda-Widgets-Instance-API/Component.201-854895.en.html) (load/remove) Promisification
* Wakanda [File Upload Widget API](http://doc.wakanda.org/home2.en.html#/Wakanda-Widgets-Instance-API/File-Upload.201-945110.en.html) Promisification
* Wakanda [Directory API](http://doc.wakanda.org/home2.fr.html#/Directory/Directory-Class.201-814668.en.html) Promisification


## About Wakanda Custom Widgets

For more information about creating a custom widget, refer to the [Widgets v2 Creating a Widget](http://doc.wakanda.org/Wakanda/help/Title/en/page3849.html "Widgets v2 Creating a Widget") manual.


## License

Copyright 2015 Alexandre Morgaut

This widget is available under the [Mozilla Public License v2.0](https://www.mozilla.org/MPL/2.0/)

It allows usage of this widget with either:

* a modified *BSD* license (a bit *MIT* oriented),
* the GNU General Public License, Version 2.0 (*GPLv2*), 
* the GNU Lesser General Public License, Version 2.1 (*LGPLv2.1*), 
* the GNU Affero General Public License, Version 3.0 (*AGPLv3*), 
* or any later versions of those licenses

More informations about the ["Mozilla Public License" on Wikipedia](http://en.wikipedia.org/wiki/Mozilla_Public_License)
