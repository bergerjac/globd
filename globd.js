var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var glob = require('glob');
var log = require('npmlog');
<<<<<<< HEAD

//log.level = 'verbose'; //! accept cli arg
=======
var helpers = require('./lib/helpers.js');
var globd = require('./plugins/globd/index.js');
var argParser = require('minimist');
var util = require('util');

var opts = {
    default: {
        'log-level': 'info', // silly, verbose, *info, http, warn, error
        'port': '8080'
    }
};
var argv = argParser(process.argv.slice(2), opts);
log.level = argv['log-level'];
<<<<<<< HEAD
>>>>>>> e17ab7f... accept log-level command line arg;
=======
var port = argv['port'];

log.verbose(JSON.stringify(argv, null, 4));
>>>>>>> de694d3... accept port number arg;

function asyncTryCatch(tryFunction, catchFunction, keepAliveOnHandled)
{
    process.on('uncaughtException', function(ex)
    {// hook onto uncaughtException -> execute catch
        var handled = catchFunction(ex);
        if (!handled)
        {// NOT handled -> throw
            throw ex;
        }
        else if (handled && !keepAliveOnHandled)
        {// handled but NOT staying alive -> exit
            process.exit(1);
        }
    });
    tryFunction(); // try the function
}

log.verbose("", __dirname + '/plugins/glob/public');

app.use(express.static(__dirname + '/plugins/glob/public'));

function getGlobResult(pattern)
{
    var files = null, error = null;
    try
    {
        files = glob.sync(pattern/*, options*/);
    }
    catch (ex)
    {
        if (ex.message === "must provide pattern")
        {// catch empty case (glob.js, Line 132
            files = [];
        }
        else
        {
            log.error("", ex.message);
            error = ex;
            throw ex;
        }
    }

    if (files)
    {
        files.forEach(function(file) {log.verbose(pattern, file);});// log each file
    }
    return  {
        error: error,
        pattern: pattern,
        files: files
    };
}

<<<<<<< HEAD
io.on('connection', function(socket)
{// client connected (via localhost:8080)
    function getLocalTime()
    {
        return new Date().toLocaleTimeString();
    }

    log.verbose("", getLocalTime() + ': connected');
    socket.on('disconnect', function()
    {// client disconnected (browser session ended)
        log.verbose("", getLocalTime() + ': DISconnected');
=======
function listenOnPort()
{
    http.listen(port, function()
    {
        log.info(util.format('listening on \'localhost:%j\'', port));
>>>>>>> de694d3... accept port number arg;
    });

    socket.on('glob', function(globPatterns)
    {// event from client
        log.verbose("", globPatterns);

        var result = [];

        if (globPatterns instanceof  Array)
        {
            log.verbose("", "'glob' object is Array");
            result = globPatterns.map(
                function(pattern, index, array)
                {
                    log.verbose("", pattern);
                    return getGlobResult(pattern);
                }
            );

        }
        else
        {
            log.error("", "'glob' object sent to server must be an Array. actual value: " + globPatterns);
        }

        // result = array of { globResult }

        var event = 'glob.result:' + globPatterns;
        io.sockets.emit(event, result);
    });

});

asyncTryCatch(
<<<<<<< HEAD
    function()
    {
        http.listen(8080, function()
        {
            log.info("listening on localhost:8080");
        });
    },
=======
    listenOnPort,
>>>>>>> de694d3... accept port number arg;
    function(ex)
    {
        if (ex.message.indexOf('listen EADDRINUSE') > -1)
        {// (node v0.10.28) http://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback
            log.error(util.format('port %j is already bound. kill the other process first.', port));
            return true;
        }
        else
        {
            throw ex;
        }
    }
);

log.info("this line is executed");
