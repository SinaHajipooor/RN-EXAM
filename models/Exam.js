class Exam {
    constructor(
        id,
        period,
        startTime,
        endTime,
        // type,
        status,
        questionsCount,
        courseId
    ) {
        this.id = id;
        this.period = period;
        this.startTime = startTime;
        this.endTime = endTime;
        // this.type = type;
        this.status = status;
        this.questionsCount = questionsCount;
        this.courseId = courseId;
    }
}

export default Exam;
