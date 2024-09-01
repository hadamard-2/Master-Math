:- consult('../knowledge_base/module_dependency.pl').
:- consult('../knowledge_acquisition/student_progress.pl').

% Define a predicate to list all known modules without duplicates
module(Module) :-
    requires(Module, _).
module(Module) :-
    requires(_, Module).

% List all unique modules
list_all_modules(Modules) :-
    setof(Module, module(Module), Modules).

% Predicate to check if a module is foundational and exists in the knowledge base
foundational_module(Module) :-
    module(Module),
    \+ requires(Module, _).

% Define the mastery threshold for unlocking modules
unlock_threshold(70).

% Rule to check if a module is unlocked based on its prerequisites
module_unlocked(Module) :-
    foundational_module(Module);  % Foundational modules are always unlocked
    (   \+ foundational_module(Module),
        forall(requires(Module, Prerequisite),
               (mastery_level(Prerequisite, MasteryLevel),
                unlock_threshold(Threshold),
                MasteryLevel >= Threshold))
    ).

% Query to find all currently unlocked modules without duplicates
unlocked_modules(Modules) :-
    setof(Module, module_unlocked(Module), Modules).
