class UserExam {
    constructor(id, examPeriod, examStartTime, examEndTime, examStatus, examQuestionsCount, courseName, lessonName, userId) {
        this.id = id;
        this.examPeriod = examPeriod;
        this.examStartTime = examStartTime;
        this.examEndTime = examEndTime;
        this.examStatus = examStatus;
        this.examQuestionsCount = examQuestionsCount;
        this.courseName = courseName;
        this.lessonName = lessonName;
        this.userId = userId;
    }
}

export default UserExam;
