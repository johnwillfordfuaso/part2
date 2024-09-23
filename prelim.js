document.getElementById('prelim-result').textContent = `Prelim grade: ${prelimFinalGrade.toFixed(2)}%`;

if (requiredMidtermForPassing < 0 || requiredFinalForPassing < 0) {
    document.getElementById('target-result').textContent = 'It is not possible to achieve a passing grade with the current prelim grade.';
} else {
    document.getElementById('target-result').textContent = `To pass: Midterm grade of ${requiredMidtermForPassing.toFixed(2)}, Final grade of ${requiredFinalForPassing.toFixed(2)}.`;
}

if (prelimFinalGrade >= 90) {
    document.getElementById('dean-lister-result').textContent = "You qualify for Dean's List!";
} else if (requiredMidtermForDean < 0 || requiredFinalForDean < 0) {
    document.getElementById('dean-lister-result').textContent = "It is not possible to achieve the Dean's List grade.";
} else {
    document.getElementById('dean-lister-result').textContent = `To make Dean's List: Midterm grade of ${requiredMidtermForDean.toFixed(2)}, Final grade of ${requiredFinalForDean.toFixed(2)}.`;
}