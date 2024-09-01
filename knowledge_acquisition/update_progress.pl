:- consult('../knowledge_acquisition/student_progress.pl').

% Updating the mastery level and persisting it
update_mastery_level(Topic, NewLevel) :-
    retract(mastery_level(Topic, _)),
    assert(mastery_level(Topic, NewLevel)),
    save_knowledge_base.

% Save the knowledge base to a file
save_knowledge_base :-
    tell('knowledge_acquisition/student_progress.pl'),
    listing(mastery_level/2),
    told.
