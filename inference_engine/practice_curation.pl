:- consult('../knowledge_base/module_dependency.pl').
:- consult('../knowledge_base/student_progress.pl').

% Define a threshold for identifying modules needing attention
mastery_threshold(50).

% Predicate to find modules that need more practice based on mastery level
needs_practice(Module) :-
    mastery_level(Module, MasteryLevel),
    mastery_threshold(Threshold),
    MasteryLevel < Threshold.

% Predicate to check if prerequisites for a module are mastered
prerequisites_mastered(Module) :-
    forall(requires(Module, Prerequisite),
           (mastery_level(Prerequisite, PrerequisiteLevel),
            PrerequisiteLevel >= 70)).

% Predicate to curate practice for both module and its prerequisites if necessary
curate_practice(Module) :-
    (   prerequisites_mastered(Module)
    ->  ModuleList = [Module]  % Only practice the module itself
    ;   findall(Prerequisite, requires(Module, Prerequisite), Prereqs),
        ModuleList = [Module | Prereqs]  % Practice the module and its prerequisites
    ),
    list_to_set(ModuleList, PracticeModules),
    write('Curated practice for: '), writeln(PracticeModules).

% Query to find all curated exercises/practice modules
curate_all_practices(Modules) :-
    findall(PracticeModules, curate_practice(Modules), ModulesList),
    flatten(ModulesList, FlatModules),
    list_to_set(FlatModules, Modules).
