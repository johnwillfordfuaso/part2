document.getElementById('grade-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const absences = parseInt(document.getElementById('absences').value);
    const prelimGrade = parseFloat(document.getElementById('prelim').value);
    const quizzesGrade = parseFloat(document.getElementById('quizzes').value);
    const requirementsGrade = parseFloat(document.getElementById('requirements').value);
    const recitationGrade = parseFloat(document.getElementById('recitation').value);

    const errorMessageElement = document.getElementById('error-message');
    const resultsElement = document.getElementById('results');

    errorMessageElement.textContent = '';
    resultsElement.classList.add('hidden');

    const grades = [prelimGrade, quizzesGrade, requirementsGrade, recitationGrade];
    if (grades.some(grade => isNaN(grade) || grade < 0 || grade > 100)) {
        errorMessageElement.textContent = 'Please enter valid grades between 0 and 100.';
        return;
    }

    if (isNaN(absences) || absences < 0) {
        errorMessageElement.textContent = 'Please enter a valid number of absences.';
        return;
    }

    let attendanceScore = 100 - (10 * absences);
    if (absences >= 4) {
        errorMessageElement.textContent = 'Failed due to excessive absences.';
        return;
    }

    const classStanding = (0.4 * quizzesGrade) + (0.3 * requirementsGrade) + (0.3 * recitationGrade);

    const prelimFinalGrade = (0.6 * prelimGrade) + (0.1 * attendanceScore) + (0.3 * classStanding);

    document.getElementById('prelim-result').textContent = `Prelim Grade: ${prelimFinalGrade.toFixed(2)}%`;

    const passingGrade = 70;
    const deanListGrade = 90;

    const prelimWeight = 0.2;
    const midtermWeight = 0.3;
    const finalWeight = 0.5;

    const remainingGradePassing = passingGrade - (prelimWeight * prelimFinalGrade);
    const remainingGradeDean = deanListGrade - (prelimWeight * prelimFinalGrade);

    let requiredMidtermForPassing = (remainingGradePassing - (finalWeight * 100)) / midtermWeight;
    let requiredFinalForPassing = (remainingGradePassing - (midtermWeight * requiredMidtermForPassing)) / finalWeight;

    let requiredMidtermForDean = (remainingGradeDean - (finalWeight * 100)) / midtermWeight;
    let requiredFinalForDean = (remainingGradeDean - (midtermWeight * requiredMidtermForDean)) / finalWeight;

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

    resultsElement.classList.remove('hidden');
});