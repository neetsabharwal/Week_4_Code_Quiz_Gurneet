//Declare required variables
var count = 0;
var ans = 0;
var time = 100;
var score = 0;
var quizscores = [];
var curscore;
var len;

//display high scores when user clicks link in top left
document.getElementById('showhighscores').addEventListener('click',function(){
    //prevent user from navigating away in between quiz
    if(count>0&&count<=10){
        var choice = alert('Cannot view scores in the middle of the quiz. Please complete your attempt first!');
    }
    //display high scores
    else{
        //remove unwanted page elements
        document.querySelector('.question').remove();
        document.querySelector('.timer').remove();
        var divEl1 = document.createElement('div');
        document.querySelector('body').appendChild(divEl1);
        //check if any scores are stored if yes.. display them
        if(localStorage.getItem('quizscores')!=null){
            var ol = document.createElement('ol');
            divEl1.appendChild(ol);
            quizscores = JSON.parse(localStorage.getItem('quizscores'));
            len = Object.keys(quizscores).length;
            for (i = 0;i<len;i++)
            {
                var li = document.createElement('li');
                ol.appendChild(li);
                li.textContent = quizscores[i].name + " " + quizscores[i].score;
            }
            ol.setAttribute('style','display:flex; flex-direction: column; margin-top: 35px; justify-content:space-between; align-items: center');  
            li.setAttribute('style','padding: 5px');  
            //delete scores from local storage
            var delscorebtn = document.createElement('button');
            delscorebtn.textContent = 'Delete Scores';
            divEl1.appendChild(delscorebtn);
            delscorebtn.addEventListener('click',function(){
            localStorage.clear();
            if(len>0){
                ol.remove();
            }
            alert('Scores cleared!');
            delscorebtn.remove();
            });
        }
        //if no scores saved
        else{
            len = 0;
            var noscores = document.createElement('p')
            noscores.textContent = 'No scores available!';
            divEl1.appendChild(noscores);
        }
        //try again button to refresh page and display start page
        var goback = document.createElement('button');
        goback.textContent = 'Try Again!';
        divEl1.appendChild(goback);
        goback.addEventListener('click',function(){
            location.reload();
        });
        divEl1.setAttribute('style','display:flex; flex-direction: column; align-items: center; justify-content: space-evenly; margin-top: 35px; height: 150px');
    }
})

//Initiate quiz when Start button is clicked

//Timer countdown function - counts down to 1 from 100 and displays results page when users runs out of time
function starttimer(){
    timerfunc = setInterval(countdown,1000);
    function countdown(){
        document.querySelector('.timer').textContent = 'Time: '+ time;
        if(time<=0||count>10){
            score = time;
            clearInterval(timerfunc);
            displayresultpage();
        }
        time--;
    };
};

//set page elements
document.getElementById('start').addEventListener('click',function(){
    starttimer();
    //increase count to fetch question 1
    count++;
    document.getElementById('introp').remove();
    document.getElementById('start').remove();
    document.querySelector('.b1').setAttribute('style','visibility:visible');
    document.querySelector('.b2').setAttribute('style','visibility:visible');
    document.querySelector('.b3').setAttribute('style','visibility:visible');
    document.querySelector('.b4').setAttribute('style','visibility:visible');
    //add event listeners to buttons to get answer selections and validate result
    document.querySelector('.b1').addEventListener('click',function(){
        ans = 1;
        displayresult();
    })
    document.querySelector('.b2').addEventListener('click',function(){
        ans = 2;
        displayresult();
    })
    document.querySelector('.b3').addEventListener('click',function(){
        ans = 3;
        displayresult();
    })
    document.querySelector('.b4').addEventListener('click',function(){
        ans = 4;
        displayresult();
    })
    displayquestion();
})

//Display result whether Correct or Wrong
function displayresult(){
    if(count==1&&ans==4||count==2&&ans==1||count==3&&ans==1||count==4&&ans==3||count==5&&ans==2||count==6&&ans==3||count==7&&ans==4||count==8&&ans==1||count==9&&ans==3||count==10&&ans==1){
        document.getElementById('check').textContent = 'Correct! :D';
        document.getElementById('check').setAttribute('style','visibility:visible');
        count = count + 1;
        displayquestion();
    }
    else{
        document.getElementById('check').textContent = 'Wrong! :(';
        document.getElementById('check').setAttribute('style','visibility:visible');
        time = time - 10;
        count = count + 1;
        displayquestion();
    }
    //clear correct/wrong prompt after 2 seconds
    setTimeout(function(){
        document.getElementById('check').setAttribute('style','visibility:hidden');
    },2000)
}

//Display questions
function displayquestion(){
    //Question 1
    if(count==1){
        document.getElementById('questext').textContent = '1. Which of the following is not a typical javascript data type?';
        document.querySelector('.b1').textContent = 'String';
        document.querySelector('.b2').textContent = 'Boolean';
        document.querySelector('.b3').textContent = 'Integer';
        document.querySelector('.b4').textContent = 'Semantic';
    }
    //Question 2
    else if(count==2){
        document.getElementById('questext').textContent = '2. The condition in an if/else statement is enclosed with?';
        document.querySelector('.b1').textContent = 'Paranthesis';
        document.querySelector('.b2').textContent = 'Curly brackets';
        document.querySelector('.b3').textContent = 'Square brackets';
        document.querySelector('.b4').textContent = 'Double forward slash';
    }
    //Question 3
    else if(count==3)
    {
        document.getElementById('questext').textContent = '3. Inside which HTML element do we put the JavaScript?';
        document.querySelector('.b1').textContent = '<script>';
        document.querySelector('.b2').textContent = '<scripting>';
        document.querySelector('.b3').textContent = '<js>';
        document.querySelector('.b4').textContent = '<javascript>';
    }
    //Question 4
    else if(count==4)
    {
        document.getElementById('questext').textContent = '4. Where is the correct place to insert a JavaScript?';
        document.querySelector('.b1').textContent = 'Head section';
        document.querySelector('.b2').textContent = 'Body section';
        document.querySelector('.b3').textContent = 'Both Head and Body';
        document.querySelector('.b4').textContent = 'None of the above';
    }
    //Question 5
    else if(count==5)
    {
        document.getElementById('questext').textContent = '5. How do you write "Hello World" in an alert box';
        document.querySelector('.b1').textContent = 'msgBox("Hello World");  ';
        document.querySelector('.b2').textContent = 'alert("Hello World"); ';
        document.querySelector('.b3').textContent = 'msg("Hello World");';
        document.querySelector('.b4').textContent = 'alertBox("Hello World");';
    }
    //Question 6
    else if(count==6)
    {
        document.getElementById('questext').textContent = '6. How to write an IF statement for executing some code if "i" is NOT equal to 5?';
        document.querySelector('.b1').textContent = 'if i <> 5';
        document.querySelector('.b2').textContent = 'if (i <> 5)';
        document.querySelector('.b3').textContent = 'if (i != 5)';
        document.querySelector('.b4').textContent = 'if i =! 5 then';
    }
    //Question 7
    else if(count==7)
    {
        document.getElementById('questext').textContent = '7. Arrays in javascript can be used to store?';
        document.querySelector('.b1').textContent = 'Numbers/Characters';
        document.querySelector('.b2').textContent = 'Other Arrays';
        document.querySelector('.b3').textContent = 'Booleans';
        document.querySelector('.b4').textContent = 'All of the above';
    }
    //Question 8
    else if(count==8)
    {
        document.getElementById('questext').textContent = '8. How does a FOR loop start?';
        document.querySelector('.b1').textContent = 'for (i = 0; i <= 5; i++) ';
        document.querySelector('.b2').textContent = 'for (i <= 5; i++)  ';
        document.querySelector('.b3').textContent = 'for (i = 0; i <= 5)';
        document.querySelector('.b4').textContent = 'for i = 1 to 5';
    }
    //Question 9
    else if(count==9)
    {
        document.getElementById('questext').textContent = '9. How do you round the number 7.25, to the nearest integer?';  
        document.querySelector('.b1').textContent = 'rnd(7.25)';
        document.querySelector('.b2').textContent = 'round(7.25)';
        document.querySelector('.b3').textContent = 'Math.round(7.25)  ';
        document.querySelector('.b4').textContent = 'Math.rnd(7.25)';
    }
    //Question 10
    else if(count==10)
    {
        document.getElementById('questext').textContent = '10. Which event occurs when the user clicks on an HTML element?';
        document.querySelector('.b1').textContent = 'onclick';
        document.querySelector('.b2').textContent = 'onchange';
        document.querySelector('.b3').textContent = 'onmouseclick';
        document.querySelector('.b4').textContent = 'onmouseover';
    }
    //display results page after 10 questions
    else{
        displayresultpage();
    }
}

//Display results page
function displayresultpage(){
    //store user's score for the quiz attempt
    score = time;
    if(score<0){
        score=0;
    }
    //set page elements
    document.getElementById('questext').textContent = 'All Done!';
    document.querySelector('.timer').textContent = 'Time: ' + score;
    document.querySelector('.answers').remove();
    var para = document.createElement("p");
    para.textContent = 'Your final scrore is: ' + score;
    document.querySelector('.question').appendChild(para);
    var divEl = document.createElement("div");
    document.querySelector('.question').appendChild(divEl);
    var initials = document.createElement("input");
    var label = document.createElement('label');
    var savebutton = document.createElement('button');
    savebutton.textContent = 'Submit!';
    label.textContent = 'Enter Initials';
    divEl.appendChild(label);
    divEl.appendChild(initials);
    divEl.appendChild(savebutton);
    divEl.setAttribute('style','display:flex; flex-direction: column; align-items: center; justify-content: space-evenly; margin-top: 35px; height: 150px');
    //save score in local storage
    savebutton.addEventListener('click',function(){
        if(initials.value!='')
        {
            //add to any existing scores array saved before this attempt
            if(localStorage.getItem('quizscores')!=null){
                quizscores = JSON.parse(localStorage.getItem('quizscores'));
                curscore = {
                    name: initials.value,
                    score: score
                }
                quizscores.push(curscore);
                window.localStorage.setItem('quizscores',JSON.stringify(quizscores));
            }
            //else if no scores saved before then just push current score to local storage
            else{
                curscore = {
                    name: initials.value,
                    score: score
                }
                quizscores.push(curscore);
                window.localStorage.setItem('quizscores',JSON.stringify(quizscores));
            }
            para.textContent = 'Submitted!';
            savebutton.remove();
            label.remove();
            document.getElementById('check').remove();
            initials.remove();
            //try again 
            var retrybtn = document.createElement('button');
            retrybtn.textContent = 'Try Again!';
            divEl.appendChild(retrybtn);
            retrybtn.addEventListener('click',function(){
                location.reload();
            })
        }
        //error handling for empty initials
        else{
            alert('Please enter your initials.');
        }
    })
}

