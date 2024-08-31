:- consult('./inference_engine/learning_path.pl').

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).

% Define the HTTP endpoint
:- http_handler('/unlocked_modules', handle_unlocked_modules, []).

% Start the HTTP server
start_server(Port) :-
    http_server(http_dispatch, [port(Port)]).

% Handle the /unlocked_modules endpoint
handle_unlocked_modules(_Request) :-
    unlocked_modules(Modules),
    reply_json(Modules).
