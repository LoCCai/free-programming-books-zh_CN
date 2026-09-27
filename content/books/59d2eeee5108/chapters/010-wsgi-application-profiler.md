This module provides a simple WSGI profiler middleware for finding bottlenecks in web application. It uses the profile or cProfile module to do the profiling and writes the stats to the stream provided (defaults to stderr).

Example usage:

from werkzeug.contrib.profiler import ProfilerMiddleware
app \= ProfilerMiddleware(app)

_class_ werkzeug.contrib.profiler.MergeStream(_\*streams_)[¶](#werkzeug.contrib.profiler.MergeStream "永久链接至目标")

An object that redirects write calls to multiple streams. Use this to log to both sys.stdout and a file:

f \= open('profiler.log', 'w')
stream \= MergeStream(sys.stdout, f)
profiler \= ProfilerMiddleware(app, stream)

_class_ werkzeug.contrib.profiler.ProfilerMiddleware(_app_, _stream=None_, _sort\_by=('time'_, _'calls')_, _restrictions=()_, _profile\_dir=None_)[¶](#werkzeug.contrib.profiler.ProfilerMiddleware "永久链接至目标")

Simple profiler middleware. Wraps a WSGI application and profiles a request. This intentionally buffers the response so that timings are more exact.

By giving the profile\_dir argument, pstat.Stats files are saved to that directory, one file per request. Without it, a summary is printed to stream instead.

For the exact meaning of sort\_by and restrictions consult the profile documentation.

0.9 新版功能: Added support for restrictions and profile\_dir.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>app</strong> – the WSGI application to profile.</li><li><strong>stream</strong> – the stream for the profiled stats. defaults to stderr.</li><li><strong>sort_by</strong> – a tuple of columns to sort the result by.</li><li><strong>restrictions</strong> – a tuple of profiling strictions, not used if dumping to <cite>profile_dir</cite>.</li><li><strong>profile_dir</strong> – directory name to save pstat files</li></ul></td></tr></tbody></table>

werkzeug.contrib.profiler.make\_action(_app\_factory_, _hostname='localhost'_, _port=5000_, _threaded=False_, _processes=1_, _stream=None_, _sort\_by=('time'_, _'calls')_, _restrictions=()_)[¶](#werkzeug.contrib.profiler.make_action "永久链接至目标")

Return a new callback for werkzeug.script that starts a local server with the profiler enabled.

from werkzeug.contrib import profiler
action\_profile \= profiler.make\_action(make\_app)
