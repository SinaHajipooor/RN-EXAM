class UserExamQuestion {
    constructor(id, userExamId, questionId, selectedAnswers, userAnswerId, questionScore, answerTime) {
        this.id = id;
        this.userExamId = userExamId;
        this.questionId = questionId;
        this.selectedAnswers = selectedAnswers; // pasokh haye montakhabe soal (json)
        this.userAnswerId = userAnswerId; // id pasokhi ke karbar be in soal dade ast
        this.questionScore = questionScore; // nomreye soal == 100/tedaade soalat
        this.answerTime = answerTime; // zamani ke karbar be in soal pasokh daade
    }
}

export default UserExamQuestion;
