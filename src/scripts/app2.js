'use strict';

var React = require('react');
var Morearty = require('morearty');

var Context = Morearty.createContext({
    initialState: {
        someVar: 'Second app is working too!'
    }
});

var App = require('./app2/App');

var Bootstrap = Context.bootstrap(App);

React.render(<Bootstrap/>, document.getElementById('app2'));
