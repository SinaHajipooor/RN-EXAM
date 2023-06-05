class UserExam {
    constructor(id, examId, userId, startTime, endTime, attendingStatus, acceptanceStatus, examScore, location, file) {
        this.id = id;
        this.examId = examId;
        this.userId = userId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.attendingStatus = attendingStatus; // vaziyate sherkat dr azmoon
        this.acceptanceStatus = acceptanceStatus; // vaziyate qabooli
        this.examScore = examScore; // nomre azmoon
        this.location = location;
        this.file = file;
    }
}

export default UserExam;
