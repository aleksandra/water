var data = pv.range(20).map(function(d) { return Math.random() + 0.1; });

/* Sizing and scales. */
var w = 400,
    h = 300 ,
    x = pv.Scale.linear(0, 1.2).range(0, w),
    y = pv.Scale.ordinal(pv.range(data.length)).splitBanded(0, h, 4/5);

/* The root panel. */
var vis = new pv.Panel()
    .canvas("display")
    .width(w)
    .height(h)
    .bottom(20)
    .left(50)
    .right(12)
    .top(50);

/* The bars. */
var bar = vis.add(pv.Bar)
    .data(data)
    .top(function() { return y(this.index); })
    .height(y.range().band)
    .left(0)
    .width(x);

/* The value label. */
bar.anchor("right").add(pv.Label)
    .textStyle("white")
    .text(function(d) { return d.toFixed(1); });

/* The variable label. */
bar.anchor("left").add(pv.Label)
    .textMargin(5)
    .textAlign("right")
    .text(function() { return "23BCDEFGHIJK23BCDEFGHIJK".charAt(this.index); });

/* X-axis ticks. */
vis.add(pv.Rule)
    .data(x.ticks(2))
    .left(x)
    .strokeStyle(function(d) { return d ? "rgba(255,255,255,.3)" : "#000";})
    .add(pv.Rule)
    .bottom(0)
    .height(5)
    .strokeStyle("#000")
    .anchor("bottom").add(pv.Label)
    .text(x.tickFormat);

vis.render();