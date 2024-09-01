:- consult('../knowledge_base/module_dependency.pl').

% Predicate to find all prerequisites for a given module, including indirect ones
prerequisites(Module, AllPrerequisites) :-
    findall(Prerequisite, prerequisites_recursive(Module, Prerequisite), Prerequisites),
    sort(Prerequisites, AllPrerequisites).

% Helper predicate to recursively find prerequisites
prerequisites_recursive(Module, Prerequisite) :-
    requires(Module, Prerequisite).
prerequisites_recursive(Module, Prerequisite) :-
    requires(Module, DirectPrerequisite),
    prerequisites_recursive(DirectPrerequisite, Prerequisite).
