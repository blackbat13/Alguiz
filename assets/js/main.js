import questions_json from '../data/questions.json' assert { type: 'json' };

showdown.setOption('emoji', true); //https://github.com/showdownjs/showdown/wiki/emojis
showdown.setOption('strikethrough', true);
showdown.setOption('simplifiedAutoLink', true);
showdown.setOption('literalMidWordUnderscores', true);
showdown.setOption('tables', true);
showdown.setOption('tasklists', true);

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

$(function () {
    let $question_description = $("#question-description");
    let showdownConverter = new showdown.Converter();
    let selected_questions = questions_json;
    let current_question_index = 0;
    shuffle(selected_questions);

    async function show_question(question_index) {
        let question = selected_questions[question_index];
        let question_name = question.name;
        let question_text = (await fetch("./assets/data/questions/" + question_name + ".md")).text();
        $question_description.html(showdownConverter.makeHtml((await question_text).toString()));
    }
    
    show_question(current_question_index);
});