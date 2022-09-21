
(function() {
  var questions = [{
    question: "Commonly used datatypes do not include which of the following?",
    choices: ["String","boolean","numbers", "alerts",],
    correctAnswer: "boolean",
  },
  
  {
    question: "What does API stand for?",
    choices:["Application Program Interface", "American Petroleum Institute", "Academic Programs International",],
    correctAnswer: "Application Program Interface",
  }, 
  
  {
    question: "if/else statements are enclosed with: ", 
    choices: ["forward slash", "curly brackets", "quotations", "parentheses"], //72 correct answer
    correctAnswer: "curly brackets",
  }, 
  
  {
    question: "What does DOM mean? ",
    choices: [ "Document Object Model","Direct Object Communication", "Document Object Mole",],
    correctAnswer: "Document Object Model",
  },

   {
    question: "String is a data type",
    choices: ["true", "false"],
    correctAnswer: "true",
  }];
  
  
  var questionCounter = 0; // counts the question number
  var selections = []; //allow user to input choices
  var quiz = $('#quiz'); 
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');

    } 
    
    else {
      questionCounter++;
      displayNext();
    }

  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }

    choose();
    questionCounter--;
    displayNext();
  });
  
  
  $('#start').on('click', function (e) {

    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
 
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  

  function createRadios(index) {
    var list = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      list.append(item);
    }
    return list;
  }
  

  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // This function shows the next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // previous button 
        if(questionCounter === 1){
          $('#prev').show();
        }
         else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }
      else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();

 // timer for quiz
function startTimer() {
  
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

function startGame() {
  isWin = false;
  timerCount = 10;
  
  startButton.disabled = true;
  startTimer()
}
