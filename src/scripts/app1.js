'use strict';

var React = require('react');
var Morearty = require('morearty');

var Context = Morearty.createContext({
    initialState: {
        someVar: 'The first app is working!'
    }
});

var App = require('./app1/App');

var Bootstrap = Context.bootstrap(App);

React.render(<Bootstrap/>, document.getElementById('app1'));
