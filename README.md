[![view on npm](https://img.shields.io/npm/v/@uttori/plugin-auth-simple.svg)](https://www.npmjs.com/package/@uttori/plugin-auth-simple)
[![npm module downloads](https://img.shields.io/npm/dt/@uttori/plugin-auth-simple.svg)](https://www.npmjs.com/package/@uttori/plugin-auth-simple)
[![Build Status](https://travis-ci.com/uttori/uttori-plugin-auth-simple.svg?branch=master)](https://travis-ci.com/uttori/uttori-plugin-auth-simple)
[![Coverage Status](https://coveralls.io/repos/github/uttori/uttori-plugin-auth-simple/badge.svg?branch=master)](https://coveralls.io/github/uttori/uttori-plugin-auth-simple?branch=master)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@uttori/plugin-auth-simple?label=Minified%20%2B%20GZip)

# Uttori Plugin - Auth Simple

A plugin to add very simple authentication using [express-session](https://github.com/expressjs/session). A great starting point for any Uttori auth solution.

On `/login` success, as HTML it will redirect to the provided `loginRedirectPath` with a `302` status code.

On `/login` success, as JSON it will return the payload from `validateLogin(request.body)` and set it on the session as `request.session.profile`.

On `/login` error, as HTML it will redirect to the provided `loginPath` with a `401` status code.

On `/login` error, as JSON it will return the payload `{ error: true }` with a `401` status code.

Note: When using with browser based `fetch` or the like, ensure `withCredentials` is set to true.

## Install

```bash
npm install --save uttori-plugin-auth-simple
```

## Config

```js
{
    // Registration Events
    events: {
      bindRoutes: ['bind-routes'],
      validateConfig: ['validate-config'],
    },

    // Login Path
    loginPath: '/login',

    // Login Redirect Path
    loginRedirectPath: '/',

    // Login Route Middleware
    loginMiddleware: [],

    // Logout Path
    logoutPath: '/logout',

    // Logout Redirect Path
    logoutRedirectPath: '/',

    // Logout Route Middleware
    logoutMiddleware: [],

    // Validation function that will recieve the request and returns an object to be used as the session payload.
    // If the session is invalid it should return false.
    validateLogin: (request) => {},
}
```

* * *

## API Reference

## Classes

<dl>
<dt><a href="#AuthSimple">AuthSimple</a></dt>
<dd><p>Uttori Auth (Simple)</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#asyncHandler">asyncHandler()</a> : <code>function</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AuthSimpleConfigEvents">AuthSimpleConfigEvents</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#AuthSimpleConfig">AuthSimpleConfig</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="AuthSimple"></a>

## AuthSimple
Uttori Auth (Simple)

**Kind**: global class  

* [AuthSimple](#AuthSimple)
    * [.configKey](#AuthSimple.configKey) ⇒ <code>string</code>
    * [.defaultConfig()](#AuthSimple.defaultConfig) ⇒ [<code>AuthSimpleConfig</code>](#AuthSimpleConfig)
    * [.validateConfig(config, _context)](#AuthSimple.validateConfig)
    * [.register(context)](#AuthSimple.register)
    * [.bindRoutes(server, context)](#AuthSimple.bindRoutes)
    * [.login(context)](#AuthSimple.login) ⇒ <code>function</code>
    * [.logout(context)](#AuthSimple.logout) ⇒ <code>function</code>

<a name="AuthSimple.configKey"></a>

### AuthSimple.configKey ⇒ <code>string</code>
The configuration key for plugin to look for in the provided configuration.

**Kind**: static property of [<code>AuthSimple</code>](#AuthSimple)  
**Returns**: <code>string</code> - The configuration key.  
**Example** *(AuthSimple.configKey)*  
```js
const config = { ...AuthSimple.defaultConfig(), ...context.config[AuthSimple.configKey] };
```
<a name="AuthSimple.defaultConfig"></a>

### AuthSimple.defaultConfig() ⇒ [<code>AuthSimpleConfig</code>](#AuthSimpleConfig)
The default configuration.

**Kind**: static method of [<code>AuthSimple</code>](#AuthSimple)  
**Returns**: [<code>AuthSimpleConfig</code>](#AuthSimpleConfig) - The configuration.  
**Example** *(AuthSimple.defaultConfig())*  
```js
const config = { ...AuthSimple.defaultConfig(), ...context.config[AuthSimple.configKey] };
```
<a name="AuthSimple.validateConfig"></a>

### AuthSimple.validateConfig(config, _context)
Validates the provided configuration for required entries.

**Kind**: static method of [<code>AuthSimple</code>](#AuthSimple)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | A configuration object. |
| config.configKey | <code>object</code> | A configuration object specifically for this plugin. |
| _context | <code>object</code> | Unused. |

**Example** *(AuthSimple.validateConfig(config, _context))*  
```js
AuthSimple.validateConfig({ ... });
```
<a name="AuthSimple.register"></a>

### AuthSimple.register(context)
Register the plugin with a provided set of events on a provided Hook system.

**Kind**: static method of [<code>AuthSimple</code>](#AuthSimple)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.hooks | <code>object</code> | An event system / hook system to use. |
| context.hooks.on | <code>function</code> | An event registration function. |
| context.config | <code>object</code> | A provided configuration to use. |
| context.config.events | <code>object</code> | An object whose keys correspong to methods, and contents are events to listen for. |

**Example** *(AuthSimple.register(context))*  
```js
const context = {
  hooks: {
    on: (event, callback) => { ... },
  },
  config: {
    [AuthSimple.configKey]: {
      ...,
      events: {
        bindRoutes: ['bind-routes'],
      },
    },
  },
};
AuthSimple.register(context);
```
<a name="AuthSimple.bindRoutes"></a>

### AuthSimple.bindRoutes(server, context)
Add the login & logout routes to the server object.

**Kind**: static method of [<code>AuthSimple</code>](#AuthSimple)  

| Param | Type | Description |
| --- | --- | --- |
| server | <code>object</code> | An Express server instance. |
| server.post | <code>function</code> | Function to register route. |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |

**Example** *(AuthSimple.bindRoutes(server, context))*  
```js
const context = {
  config: {
    [AuthSimple.configKey]: {
      directory: 'uploads',
      route: '/upload',
    },
  },
};
AuthSimple.bindRoutes(server, context);
```
<a name="AuthSimple.login"></a>

### AuthSimple.login(context) ⇒ <code>function</code>
The Express route method to process the login request and provide a response or redirect.

**Kind**: static method of [<code>AuthSimple</code>](#AuthSimple)  
**Returns**: <code>function</code> - - The function to pass to Express.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |

**Example** *(AuthSimple.login(context)(request, response, next))*  
```js
server.post('/login', AuthSimple.login(context));
```
<a name="AuthSimple.logout"></a>

### AuthSimple.logout(context) ⇒ <code>function</code>
The Express route method to process the logout request and clear the session.

**Kind**: static method of [<code>AuthSimple</code>](#AuthSimple)  
**Returns**: <code>function</code> - - The function to pass to Express.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | A Uttori-like context. |
| context.config | <code>object</code> | A provided configuration to use. |

**Example** *(AuthSimple.login(context)(request, response, _next))*  
```js
server.post('/logout', AuthSimple.login(context));
```
<a name="asyncHandler"></a>

## asyncHandler() : <code>function</code>
**Kind**: global function  
<a name="AuthSimpleConfigEvents"></a>

## AuthSimpleConfigEvents : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bindRoutes | <code>Array.&lt;string&gt;</code> | The collection of events to bind to for setting up the login and logout routes. |
| validateConfig | <code>Array.&lt;string&gt;</code> | The collection of events to bind to for validating the configuration. |

<a name="AuthSimpleConfig"></a>

## AuthSimpleConfig : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [events] | [<code>AuthSimpleConfigEvents</code>](#AuthSimpleConfigEvents) |  | Events to bind to. |
| [loginPath] | <code>string</code> | <code>&quot;&#x27;/login&#x27;&quot;</code> | The path to the login endpoint. |
| [loginRedirectPath] | <code>string</code> | <code>&quot;&#x27;/&#x27;&quot;</code> | The path to redirect to after logging in. |
| [loginMiddleware] | <code>Array.&lt;function()&gt;</code> | <code>[]</code> | The middleware to use on the login route. |
| [logoutPath] | <code>string</code> | <code>&quot;&#x27;/logout&#x27;&quot;</code> | The path to the logout endpoint. |
| [logoutRedirectPath] | <code>string</code> | <code>&quot;&#x27;/&#x27;&quot;</code> | The path to redirect to after logging out. |
| [logoutMiddleware] | <code>Array.&lt;function()&gt;</code> | <code>[]</code> | The middleware to use on the logout route. |
| validateLogin | <code>function</code> |  | A function that accepts a Request object and validates a users credentials, if they are invalid it should return false. |


* * *

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
DEBUG=Uttori* npm test
```

## Contributors

* [Matthew Callis](https://github.com/MatthewCallis)

## License

* [MIT](LICENSE)
