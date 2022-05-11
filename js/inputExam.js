$(document).ready(function(){

    const EXAMS = 'exams'
    const quizApp = {
        exam: JSON.parse(localStorage.getItem(EXAMS)) || [],
        currentIndex: 0,
        handkeEvents() {
            const _this = this

            $('#add').click(function() {
                _this.currentIndex++
                $('#box__questions').append(_this.createQuestion())
            })

            $('#save').click(function() {
                _this.pushData()
                location.reload()
            })
        },
        createQuestion() {
            const arrAns = this.buildAnswer()
            return $('<div>',{class: 'question', id: `form-${this.currentIndex}`})
            .append(
                $('<label>',{ for : 'cauhoi', text: `Câu hỏi :`})
            )
            .append(
                $('<input>', {type: 'text', id: `cauhoi-${this.currentIndex}`, name: 'cauhoi', class: 'cauhoi'})
            )
            .append(
                $('<br>')
            )
            .append(
                $('<label>',{ for: 'phuongan', text: 'Phương án :'})
            )
            .append(
                $('<div>', { class: 'box__answers'})
                .append(arrAns)
            )
        },
        buildAnswer() {
            const tempArr = ['a', 'b', 'c', 'd']
            return tempArr.map(item => 
                $('<div>', { class: 'box__answers-item'})
                .append(
                    $('<label>', { for: `${item}`, text: item.toUpperCase()})
                )
                .append(
                    $('<input>',{ type: 'text', class: 'answers'})
                )
                .append(
                    $('<input>',{ type: 'radio', value: `${item}`, name: `dapan-${this.currentIndex}`})
                )
            )
        },
        pushData() {
            const _this = this
            const examName = $('#dethi')
            
            if(examName.val()) {
                this.exam.push({
                    id: _this.exam.length,
                    name: examName.val(),
                    questions: _this.getData()
                })
                localStorage.setItem(EXAMS, JSON.stringify(this.exam))
            } else {
                alert('Vui lòng nhập tên đề thi')
            }
        },
        getData() {
            let array = []
            $('.question').each(function(index, item) {
                const question = $(item).find('.cauhoi').val()
                const correct = $(item).find($('input[type="radio"]:checked')).val()
                const answers = $(item).find('.answers')

                let questions = {
                    question: question,
                    correct: correct,
                    answers: []
                }
                $(answers).each(function(j, ans) {
                    var answerValue = $(ans).val()
                    questions.answers.push(answerValue)
                })
                array.push(questions)
            })

            return array
        },
        start() {
            this.handkeEvents()
        }
    }

    quizApp.start()
});