def calculate_grades():
    try:
        absences = int(input("Enter number of absences: "))
        if absences < 0:
            print("Absences cannot be negative. Please enter a valid number.")
            return

        if absences >= 4:
            print("FAILED due to excessive absences.")
            return

        prelim_exam_grade = float(input("Enter Prelim Exam Grade (0-100): "))
        quizzes_grade = float(input("Enter Quizzes Grade (0-100): "))
        requirements_grade = float(input("Enter Requirements Grade (0-100): "))
        recitation_grade = float(input("Enter Recitation Grade (0-100): "))

        for grade in [prelim_exam_grade, quizzes_grade, requirements_grade, recitation_grade]:
            if grade < 0 or grade > 100:
                print("Grades should be between 0 and 100. Please enter valid grades.")
                return

        attendance_score = 100 - (10 * absences)

        class_standing = (0.4 * quizzes_grade) + (0.3 * requirements_grade) + (0.3 * recitation_grade)

        prelim_grade = (0.6 * prelim_exam_grade) + (0.1 * attendance_score) + (0.3 * class_standing)

        print(f"Prelim Grade: {prelim_grade:.2f}")

        passing_grade = 70
        dean_list_grade = 90

        for target in [passing_grade, dean_list_grade]:
            required_midterm = (target - (0.2 * prelim_grade)) / 0.3
            required_final = (target - (0.2 * prelim_grade + 0.3 * required_midterm)) / 0.5

            if required_midterm > 100 or required_final > 100:
                print(f"To achieve {target}%, it's not possible as the required grades exceed 100%.")
            elif required_midterm < 0 or required_final < 0:
                print(f"To achieve {target}%, it's not possible with the current prelim grade.")
            else:
                print(f"To achieve {target}%, you need a Midterm grade of {required_midterm:.2f} and a Final grade of {required_final:.2f}.")

        if prelim_grade >= 90:
            print("Congratulations! You are on track to qualify for the Dean's List.")
        else:
            print("You do not currently qualify for the Dean's List. Keep working hard!")

    except ValueError:
        print("Invalid input! Please enter numerical values for grades and absences.")


if __name__ == "__main__":
    calculate_grades()