% Mastery Level: 0 to 100

:- dynamic mastery_level/2.

% Grade 9
mastery_level('Further on Sets', 0).
mastery_level('The Number System', 0).
mastery_level('Solving Equations', 0).
mastery_level('Solving Inequalities', 0).
mastery_level('Introduction to Trigonometry', 0).
mastery_level('Regular Polygons', 0).
mastery_level('Congruency and Similarity', 0).
mastery_level('Vectors in Two Dimensions', 0).
mastery_level('Statistics and Probability', 0).
% Grade 10
mastery_level('Relations and Functions', 0).
mastery_level('Polynomials Functions', 0).
mastery_level('Exponential and Logarithmic Functions', 0).
mastery_level('Trigonometric Functions', 0).
mastery_level('Circles', 0).
mastery_level('Solid Figures', 0).
mastery_level('Coordinate Geometry', 0).
% Grade 11
mastery_level('Relations and Functions', 0).
mastery_level('Rational Expressions and Rational Functions', 0).
mastery_level('Matrices', 0).
mastery_level('Determinants and Their Properties', 0).
mastery_level('Vectors', 0).
mastery_level('Transformations of the Plane', 0).
mastery_level('Statistics', 0).
mastery_level('Probability', 0).
% Grade 12
mastery_level('Sequences and Series', 0).
mastery_level('Introduction to Calculus', 0).
mastery_level('Statistics', 0).
mastery_level('Introduction to Linear Programming', 0).
mastery_level('Mathematical Applications in Business', 0).


update_mastery_level(Topic, NewLevel) :-
    retract(mastery_level(Topic, _)),
    assert(mastery_level(Topic, NewLevel)).