var React = require('react');
var Morearty = require('morearty');

var App = React.createClass({

    mixins: [Morearty.Mixin],

    render: function () {
        return (
            <div>
                <h1>First app</h1>
                {this.getDefaultBinding().get('someVar')}
            </div>
        );
    }
});

module.exports = App;
