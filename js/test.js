$(function() {

    const EXAMS = 'exams'

    const exams = JSON.parse(localStorage.getItem(EXAMS)) || []
    const url = location.href // get the url of the web
    const indexPage = url.substr(url.length - 1)
    const inputCheck = Array.from($('input[type="radio"]'))

    const result = $('#result')


    const currentExam = exams[indexPage]
    let currentIndex = 0
    let score = 0

    let chooseAnsersArray = []
    const correctAnsArray = currentExam.questions.map((item) => {
        return item.correct
    })


    function handleEvents() {
        const nextBtn = $('#next')
        const submitBtn = $('#submit')
        $('#quiz').show()
        result.hide()
        $('#home').hide()

        // when next clicked
        nextBtn.click(function() {
            currentIndex++
            renderQuestion()
            deselect()
            console.log(currentIndex)
            console.log(currentExam.questions.length)
            if(currentIndex === currentExam.questions.length - 1) {
                nextBtn.hide()
            }
        })

        // when submit clicked
        submitBtn.click(function() {
            $('#quiz').hide()
            result.show()
            $('#home').show()
            submitBtn.hide()
            getChoiceAnswer()
            checkResult()
            showResult()
        })
    }
    handleEvents()

    function renderQuestion() {
        const question = currentExam.questions[currentIndex].question
        const answer = currentExam.questions[currentIndex].answers
        const answerText = Array.from($('.answer__text'))
        const alphaAns = ['A', 'B', 'C', 'D']

        $('.quiz__title').text(`Câu hỏi số ${currentIndex + 1} : ${question}`)
        answerText.map((item, index) => {
            $(item).text(`${alphaAns[index]} : ${answer[index]}`)
        })

        getChoiceAnswer()
    }
    renderQuestion()

    function deselect() {
        
        inputCheck.forEach(item => item.checked = false)
    }

    function getChoiceAnswer() {
        inputCheck.forEach(item => {
            if(item.checked) {
                chooseAnsersArray.push(item.id)
            }
        })
        console.log(chooseAnsersArray)
        return chooseAnsersArray
    }

    function checkResult() {
        correctAnsArray.forEach((item, index) => {
            if(item === chooseAnsersArray[index]) {
                score++
            }
        })
    }

    function showResult() {
        result.append(
            $('<h2>', { text: 'Chúc mừng bạn đã hoàn thành bài kiểm tra'})
        )
        .append(
            $('<p>', { text : `Số điểm của bạn là ${score}/${currentExam.questions.length} câu`})
        )
    }

})