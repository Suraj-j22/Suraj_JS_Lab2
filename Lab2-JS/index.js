
function Exam(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  
  Exam.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
  }
  
  Exam.prototype.checkOptionWithAnswer = function(answer) {
    if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
  
    this.questionIndex++;
  }
  
  Exam.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
  }
  
  
  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  
  Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
  }
  
  
  function loadQuestions() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;
  
        // show options
        var choices = quiz.getQuestionByIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
  
        showProgress();
    }
  };
  
  function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
  };
  
  
  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };
  
  function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
  };
  
  // create questions here
  var questions = [
    new Question("Number of primitive data types in Java are", ["7", "6","8", "9"], "8"),
    new Question("What is the size of float and double in java", ["32 & 64", "32 & 32", "64 & 64", "64 & 32"], "32 & 64"),
    new Question("Automatic type conversion is possible in which of the possible cases?", ["Byte to int", "Int to long","Long to int", "Short to int"], "Int to long"),
    new Question("When an array is passed to a method, what does the method receive?", ["The reference of the array", "A copy of the array", "Length of the array", "Copy of first element"], "The reference of the array"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];
  
  // create quiz
  var quiz = new Exam(questions);
  
  // display quiz
  loadQuestions();