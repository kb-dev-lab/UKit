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
		if (
			isFavorite &&
			course.UE !== null &&
			filtersList instanceof Array &&
			filtersList.includes(course.UE)
		) {
			return false;
		}
		return true;
	}
}

export default new CourseManager();
