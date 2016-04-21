
var queue = require('queue');
let React = require('react');
let mui = require('material-ui');



var dash =  React.createClass({

    componentDidMount: function() {




    },


    render: function () {
        return (
                <div>
            <mui.Slider name="slider2" defaultValue={2} min={0} max={10} step={0.10} />

        <mui.Card initiallyExpanded={true}>
        <mui.CardHeader
        title="CHP Sales"
        subtitle="Subtitle"
        avatar={<mui.Avatar style={{color:'red'}}>A</mui.Avatar>}
showExpandableButton={true}>
</mui.CardHeader>
<mui.CardText>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
</mui.CardText>


</mui.Card>
    </div>
        );
    }



})









module.exports=dash;