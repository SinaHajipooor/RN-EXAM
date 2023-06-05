import * as SQLite from "expo-sqlite";
import ExamQuestion from "../view_models/ExamQuestion";
import QuestionAnswer from "../view_models/QuestionAnswer";
import UserExam from "../view_models/UserExam";

const database = SQLite.openDatabase("Exams.db");

// get the user exams
export const fetchUserExams = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM v_userExams`,
                [],
                (_, result) => {
                    const userExams = [];
                    for (const dp of result.rows._array) {
                        userExams.unshift(
                            new UserExam(
                                dp.id,
                                dp.examPeriod,
                                dp.examStartTime,
                                dp.examEndTime,
                                dp.examStatus,
                                dp.examQuestionsCount,
                                dp.courseName,
                                dp.lessonName,
                                dp.userId
                            )
                        );
                    }
                    resolve(userExams);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

export const startUserExam = (startTime, location, file, id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `UPDATE userExams SET startTime = ?, location = ? , file = ? WHERE id =?`,
                [startTime, location, file, id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// get the userExam questions
export const fetchExamsQuestions = async (examId) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM v_examQuestions WHERE examId = ?`,
                [examId],
                (_, result) => {
                    const examQuestions = [];
                    for (const dp of result.rows._array) {
                        examQuestions.unshift(new ExamQuestion(dp.id, dp.questionText, dp.questionFile, dp.examId, dp.questionId));
                    }
                    resolve(examQuestions);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// get the question answers
export const fethQuestionAnswers = (questionId) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM v_questionAnswers WHERE questionId = ?`,
                [questionId],
                (_, result) => {
                    const questionAnswers = [];
                    for (const dp of result.rows._array) {
                        questionAnswers.unshift(new QuestionAnswer(dp.id, dp.answerText, dp.answerFile, dp.answerType, dp.questionId));
                    }
                    resolve(questionAnswers);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// update user exam
export const updateUserExam = (userAnswerId, answerTime, id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `UPDATE userExamQuestions SET userAnswerId = ? , answerTime = ? WHERE id = ?`,
                [userAnswerId, answerTime, id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

// finish user exam
export const finishUserExam = (endTime, location, file, id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `UPDATE userExams SET endTime = ?, location = ? , file = ? WHERE id =?`,
                [endTime, location, file, id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};
