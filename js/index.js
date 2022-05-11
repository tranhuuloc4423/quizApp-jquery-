$(document).ready(function() {
    const EXAMS = 'exams'
    
    const exams = JSON.parse(localStorage.getItem(EXAMS)) || []

    function renderExams() {
        let examList = $('tbody')
        let html = ''
        exams.map(item => {
            examList.append(
                $('<tr>')
                .append(
                    $('<td>', { text: `${item.id + 1}`})
                )
                .append(
                    $('<td>', { text: `${item.name}`})
                )
                .append(
                    $('<td>').append(
                        $('<a>', { href : `./html/test.html?id=${item.id}`, text: 'Làm bài'})
                    )
                )
            )
        })
    }
    renderExams()
})