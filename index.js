'use strict';

let scrnBtn = '#start-btn';
let num = 0;
let count = 0;
let correctScore = 0;
let incorrectScore = 0;
let prior_questions = [];

const count_limit = 5;
//quiz questions and answers
const quiz_questions = {
 1: {'question': "Which player was signed by Liverpool in the 2017 summer transfer window from Roma?",
 'options': {
   1: 'Mohammed Salah',
   2: 'Radja Nainggolan',
   3: 'Patrik Schick',
   4: 'Stephan El Shaarawy',
   5: 'Juan Jesus'
 },
 'answer': 1,
 'answerText': 'Mohammed Salah'},
 
 2: {
   'question': "Liverpool purchased Coutinho from _____ and sold him to _____?",
 'options': {
   1: 'Manchester United; Manchester City',
   2: 'Inter Milan, Manchester United',
   3: 'Barcelona; Manchester City',
   4: 'Inter Milan; Barcelona',
   5: 'Manchester City, Juventus'
 },
 'answer': 4,
 'answerText': 'Inter Milan; Barcelona'},
 
 3: {
    'question': "Who is Liverpool's manager for the 2017-2018 season?",
 'options': {
   1: 'Roy Hodgson',
   2: 'Jurgen Klopp',
   3: 'Brendon Rodgers',
   4: 'Rafa Benitez',
   5: 'Kenny Dalglish'
 },
 'answer': 2,
 'answerText': 'Jurgen Klopp'},
 
 4: {
    'question': "Which current Liverpool first team player is from Liverpool, England?",
 'options': {
   1: 'Nathaniel Clyne',
   2: 'Trent Arnold-Alexander',
   3: 'Dominic Solanke',
   4: 'Daniel Sturridge',
   5: 'Jordan Henderson'
 },
 'answer': 2,
 'answerText': 'Trent Arnold-Alexander'},
 
 5: {
    'question': "Which player cost Liverpool a reported £75 millon?",
 'options': {
   1: 'Virgil Van Dijk',
   2: 'Dejan Lovren',
   3: 'Roberto Firmino',
   4: 'Alberto Moreno',
   5: 'Malcom'
 },
 'answer': 1,
 'answerText': 'Virgil Van Dijk'},
 
 6: {
    'question': "Which Midfielder signed a pre-contract with Liverpool and will join the team for the 2018-2019 season?",
 'options': {
   1: 'Naby Keita',
   2: 'Malcom',
   3: 'Christian Pulisic',
   4: 'Thomas Lemar',
   5: 'Leon Goretzka'
 },
 'answer': 1,
 'answerText': 'Naby Keita'},
 
 7: {
    'question': "Which Midfielder played a majority of the 2016-2017 season as a Left Back?",
 'options': {
   1: 'Emre Can',
   2: 'Gini Wijnaldum',
   3: 'Adam Lallana',
   4: 'Jordan Henderson',
   5: 'James Milner'
 },
 'answer': 5,
 'answerText': 'James Milner'},
 
 8: {
    'question': "Who is Liverpool's current (2017-2018) main kit sponsor?",
 'options': {
   1: 'Carlsberg',
   2: 'Standard Charter',
   3: 'UNICEF',
   4: 'Samsung',
   5: 'Sky Bet'
 },
 'answer': 2,
 'answerText': 'Standard Charter'},
 
 9: {
    'question': "Who are Liverpool's local rival?",
 'options': {
   1: 'Chelsea',
   2: 'Arsenal',
   3: 'Everton',
   4: 'Crystal Palace',
   5: 'Newcastle United'
 },
 'answer': 3,
 'answerText': 'Everton'},
 
 10: {
    'question': "Where do Liverpool play their home games?",
 'options': {
   1: 'Anfield',
   2: 'White Hart Lane',
   3: 'Melwood',
   4: 'St. James\' Park',
   5: 'St. Mary\'s Stadium'
 },
 'answer': 1,
 'answerText': 'Anfield'}
};

//start quiz
function newGame(){
  num = 0;
  count = 0;
  correctScore = 0;
  incorrectScore = 0;
  prior_questions = [];
  //console.log('new game');
}

// this function will be repsonsible for rendering the question to the browser
  //randomize questions
function generateQuestion(){
  //check if question has previously been asked; if already asked, pick new question
  
  let limit = Object.keys(quiz_questions).length;
  num = Math.floor(Math.random()*limit + 1);
  if(prior_questions.indexOf(num)>-1){
    generateQuestion();

  }else {
    
      prior_questions.push(num);
      renderQuestion();
  }
}
  
function renderQuestion(){
  //render question and MC opitons to browser
  prior_questions.push(num);
  $('#text').html(quiz_questions[num]["question"]);
  $('#option-1').html(quiz_questions[num]["options"][1]);
  $('#option-2').html(quiz_questions[num]["options"][2]);
  $('#option-3').html(quiz_questions[num]["options"][3]);
  $('#option-4').html(quiz_questions[num]["options"][4]);
  $('#option-5').html(quiz_questions[num]["options"][5]);
  //console.log(prior_questions);
  scrnBtn = '#submit-btn';
  console.log('in here')
  updateCorrectScore();
  updateIncorrectScore();
  count++;
  updateQuestionNum();
  questionTotal();
  $('#progress').text(count+"/"+count_limit);  
}

//render feedback to the user
//if correct, render modal with success message
function correct(user_answer){
  if(user_answer == quiz_questions[num]["answer"]) {
    return true;
  }else{
    return false;
  }
}

//render the current question number
function updateQuestionNum(){
  $('.questionNum').text(count);
}

//render total number of questions
function questionTotal(){
  $('.js-questionTotal').text(count_limit);
}

  //increase correct question counter
function updateCorrectScore(){
  $('.correctScore').text(correctScore);
  }

//if incorrect, render modal with failure message
  //increase incorrect question counter
function updateIncorrectScore(){
  $('.incorrectScore').text(incorrectScore);
  }

//display team rank based on # of correct Q's  
function defineRank(){
    if (correctScore == 5){
        $('.js-rank').text('You are ready to join the first team!');
    } else if (correctScore == 4) {
        $('.js-rank').text('You are ready to join the reserve squad!');
    } else if (correctScore == 3) {
        $('.js-rank').text('You are ready to join the U23 squad!');
    } else if (correctScore == 2) {
        $('.js-rank').text('You are ready to join the academy!');
    } else if (correctScore == 1) {
        $('.js-rank').text('You are clearly an Everton fan...');
    } else if (correctScore == 0) {
        $('.js-rank').text('Typical United fan...');
    }  
  }


// this function will be repsonsible for restarting the quiz

//Document Ready
$(document).ready(function() {
    //functionality for START
    $("#start-btn").on('click', function() {       
        //console.log("Start button clicked");
        scrnBtn = '#submit-btn';
        $("#question").removeClass(".hidden");
        $('.header').append("<img src='http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4e5.png' alt='Liverpool FC Club Crest' class='small' />");
        $("#start").fadeOut(500, function() {
            newGame();
            generateQuestion();
            //renderQuestion();
            $("#quiz").fadeIn(500);    
        });
    });
    
    //MC selection
    $("input.radio:checked").next('label').addClass('blue');
    


    //functionality for SUBMIT
    $("#submit-btn").on('click', function() {
        var user_answer = $('input:radio[name=multipleChoice]:checked').val();
        //console.log(user_answer);
        if (!user_answer) {
            //console.log("nothing selected");
            alert('Please make a selection!');
        } else {
            scrnBtn = '#continue-btn';
        
            //console.log("selection made");
            //console.log($("input:radio[name=multipleChoice]:checked").val());
            if (correct(user_answer)) {
            
                $('#quiz').fadeOut(500, function() {
                  correctScore++;
                  //console.log("User answered correctly");
                  updateCorrectScore();
                  $('#correct').fadeIn(500);    
                });
            } else {
            
                $('#quiz').fadeOut(500, function() {
                  $('#incorrect').fadeIn(500);
                  incorrectScore++;
                  //console.log(`The correct answer is ${quiz_questions[num]["answerText"]}`);
                  $('#solution').html(`The correct answer is: ${quiz_questions[num]["answerText"]}`);
                });
            }
        }
    });

    
    //functionality to CONTINUE
    $('.continue-btn').on('click', function(){
      console.log('Continue triggered');
      
      //check if on final question
      $('#correct').fadeOut(500, function() {
        $('#incorrect').fadeOut(500, function(){


          if(count >= count_limit){//end? 
            updateCorrectScore();
            defineRank();
            scrnBtn = '#restart';
            $('#result').fadeIn(500);
          }else{
            generateQuestion()
            //renderQuestion();
            $('div input').prop('checked', false);
            $('#quiz').fadeIn(500);
          }
        });
      });
      
    });
    
    //functionality to RESET
    $('#restart').on('click', function(){
      //console.log("Restart triggered");
      scrnBtn = '#start-btn';
      $('#result').fadeOut(500, function(){
        newGame();
        generateQuestion();
        //renderQuestion();
        $('form input').prop('checked', false);
        $('#quiz').fadeIn(500);
      });
    });

$(document).keyup(function(e) {
    if(e.which == 13) {
        //alert('You pressed enter!');
        console.log(scrnBtn);
        
        $(scrnBtn).trigger('click');

        console.log(scrnBtn);
        console.log(' ');
    }
});
});

