$.writeln($.os);
try {
    $.writeln(app.name + ' ' + app.build);
} catch (e) {
    $.writeln(app.name + ' ' + app.version);
}
$.writeln('Javascript version ' + $.version);
