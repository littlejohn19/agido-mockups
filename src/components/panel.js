(function ()
{
    function updateChildren(item)
    {
        var frame = item.find(".frame")[0];
        var headerBorder = item.find(".headerBorder")[0];
        var title = item.find(".title")[0];
        frame.setAttr("width", item.getWidth());
        frame.setAttr("height", item.getHeight());
        //noinspection JSUnresolvedFunction
        var frameStrokeWidth = frame.getStrokeWidth();

        //noinspection JSUnresolvedFunction
        headerBorder.setPoints([frameStrokeWidth, title.getHeight(), frame.getWidth() - frameStrokeWidth, title.getHeight()]);

        title.setAttr("x", frameStrokeWidth);
        title.setAttr("y", 0);
        title.setText(item.getText());
    }

    Kinetic.Panel = function (config)
    {
        this.____init(config);
    };
    Kinetic.Panel.prototype = {
        ____init: function (config)
        {
            Kinetic.Group.call(this, angular.extend({width: 300, height: 200}, config));
            this.className = "Panel";
            this.add(new Kinetic.Rect(AgidoMockups.extend(config,
                    {name: "frame", x: 0, y: 0, draggable: false, fill: '#fff', stroke: '#000', strokeWidth: 1})));
            this.add(new Kinetic.Text(AgidoMockups.extend(config,
                    {name: "title", padding: 5, draggable: false, fill: '#000', stroke: null, fontFamily: 'Comic Sans MS'})));
            this.add(new Kinetic.Line(AgidoMockups.extend(config, {name: "headerBorder", draggable: false, stroke: '#000'})));
            var propertyChangeListener = function (event)
            {
                if (event.newVal != event.oldVal) {
                    updateChildren(this);
                }
            };
            this.on("textChange", propertyChangeListener);
            this.on("widthChange", propertyChangeListener);
            this.on("heightChange", propertyChangeListener);
            updateChildren(this);
        },
        toObject: function ()
        {
            return Kinetic.Node.prototype.toObject.call(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Panel, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Kinetic.Panel, 'text', "Panel");
})();
