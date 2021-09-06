class CourseManager {
    computeCourseUE(course) {
        let regexUE = RegExp('([0-9][A-Z0-9]+) (.+)', 'im');
        if (course.subject && course.subject !== 'N/C') {
            let match = regexUE.exec(course.subject);
            if (match && match.length === 3) {
                course.UE = match[1];
                course.subject = `${match[2]}`;
            } else {
                course.UE = null;
            }
        }
        return course;
    }

    filterCourse(isFavorite, course, filtersList) {
        return (filtersList instanceof Array && filtersList.length <= 0)
            || course.toFilter === null
            || (isFavorite
                && filtersList instanceof Array
                && filtersList.length > 0
                && (filtersList.includes(course.toFilter)
                    || (course.UE !== null
                        && filtersList.includes(course.UE))
                )
            );
    }
}

export default new CourseManager();