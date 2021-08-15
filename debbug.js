const autoAnswerQuizz = () => {
    document.querySelectorAll(".question").forEach((question) => {
        question.querySelector(".option").click()
    })
}