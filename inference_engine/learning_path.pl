:- consult('../knowledge_base/module_dependency.pl').
:- consult('../knowledge_base/student_progress.pl').

% Define the mastery threshold for unlocking modules
unlock_threshold(70).

% Foundational modules: Modules with no prerequisites (dependencies)
foundational_module(Module) :-
    \+ requires(Module, _).

% Rule to check if a module is unlocked based on its prerequisites
module_unlocked(Module) :-
    foundational_module(Module);  % Foundational modules are always unlocked
    (   \+ foundational_module(Module),
        forall(requires(Module, Prerequisite),
               (mastery_level(Prerequisite, MasteryLevel),
                unlock_threshold(Threshold),
                MasteryLevel >= Threshold))
    ).

% Query to find all currently unlocked modules
unlocked_modules(Modules) :-
    findall(Module, module_unlocked(Module), Modules).
