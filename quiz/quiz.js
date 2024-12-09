document.addEventListener("DOMContentLoaded", () => {
    function personalityQuiz() {
        const questions = [
            {
                question: '"Before we begin," the barista says, gesturing to four customers in the café, "tell me, which scene catches your attention?"',
                options: [
                    {ID: "A", choice: "a. A lively board game group, lost in laughter over cold coffee"},
                    {ID: "B", choice: "b. A solitary artist sketching by rainy window with a ceramic mug"},
                    {ID: "C", choice: "c. A skilled barista crafting coffee with perfect precision"},
                    {ID: "D", choice: "d. Someone photographing an artful latte against a wall mural"}
                ],
                image: "./assets/q1.png"
            },
            {
                question: "The barista leads you to a magical brewing station where four coffee beans float in mid-air. Each one shows a different scene when you look closely. What do you see in yours?",
                options: [
                    {ID: "A", choice: "a. A Colombian farmer sharing their family heritage in a coffee field"},
                    {ID: "B", choice: "b. A traditional Japanese tea house frozen in time"},
                    {ID: "C", choice: "c. A modern coffee lab developing new brewing techniques"},
                    {ID: "D", choice: "d. A late-night café with artists in deep discussion"}
                ],
                image: "./assets/q2.png"
            },
            {
                question: "Suddenly, your coffee cup begins to ripple, and you're transported to a coffee farm at harvest time. The farm owner needs help, and you want to: ",
                options: [
                    {ID: "A", choice: "a. Organize a community harvest festival to bring together farmers and coffee buyers"},
                    {ID: "B", choice: "b. Design a sustainable farming practice that honors both tradition and the environment"},
                    {ID: "C", choice: "c. Develop a new method for sorting beans to ensure maximum quality"},
                    {ID: "D", choice: "d. Create an innovative way to showcase the farm's unique story and coffee variety"}
                ],
                image: "./assets/q3.png"
            },
            {
                question: "You've discovered a torn page from a magic recipe book! When you touch it, you experience a memory of: ",
                options: [
                    {ID: "A", choice: "a. Finding friendship in a distant café while travelling across the world"},
                    {ID: "B", choice: "b. Waking up to perfect your morning coffee ritual, finding peace in the quiet moments"},
                    {ID: "C", choice: "c. Competing in a coffee championship, mastering coffee brewing techniques"},
                    {ID: "D", choice: "d. Experimenting with unusual ingredients to create a signature drink"}
                ],
                image: "./assets/q4.png"
            },
            {
                question: "The barista reveals that the magical recipe book's pages shift and renew themselves, reflecting the ever-evolving relationships between humans and coffee across the world. You feel compelled to: ",
                options: [
                    {ID: "A", choice: "a. Dive into these magical pages right now and watch the stories unfold!"},
                    {ID: "B", choice: "b. Stay curious about preserving ancient coffee traditions while embracing modern evolution"},
                    {ID: "C", choice: "c. Master every detail and technique through the rich history of coffee"},
                    {ID: "D", choice: "d. Blend traditional coffee wisdom with contemporary artistic expression"}
                ],
                image: "./assets/q5.png"
            },
            {
                question: "The final test requires you to add your own magic to the recipe book. You create: ",
                options: [
                    {ID: "A", choice: "a. A welcoming guide for coffee tastings that brings diverse people together"},
                    {ID: "B", choice: "b. A meditation track of coffee sounds - from grinding beans to steaming milk"},
                    {ID: "C", choice: "c. A mystical menu that reads moods and suggests perfect coffee pairings"},
                    {ID: "D", choice: "d. An innovative cup design that dances on the page, transforming coffee rituals"}
                ],
                image: "./assets/q6.png"
            }
        ]
    
        let currentQuestionIndex = 0;
        let arabicaAdventurer = 0;
        let matchaMystic = 0;
        let espressoEmperor = 0;
        let mochaMuse = 0;
    
        // function to display current question and its choices
        function displayQuestion() {
            const currentQ = questions[currentQuestionIndex]; 
            const questionElement = document.querySelector('#question'); 
            const choiceContainer = document.querySelector('#choices'); 
            const questionImage = document.querySelector('#questionimg');
        
            choiceContainer.innerHTML = "";
        
            questionElement.textContent = currentQ.question;
        
            if (currentQ.image) {
                questionImage.src = currentQ.image;
                questionImage.style.display = "block"; 
            }
        
            currentQ.options.forEach(function(choice) {
                let button = document.createElement("button");
                button.classList.add('choice-button');
                button.innerText = choice.choice;
                button.onclick = function() { selectChoice(choice.ID); };
                choiceContainer.appendChild(button);
            });
        }
    
        function selectChoice(choiceID) {
            switch(choiceID) {
                case "A": arabicaAdventurer++; break;
                case "B": matchaMystic++; break;
                case "C": espressoEmperor++; break;
                case "D": mochaMuse++; break;
            }
    
            currentQuestionIndex++;

            console.log(currentQuestionIndex);
            
            if (currentQuestionIndex >= questions.length) {
                showResult();
            } else {
                displayQuestion();
                animateProgressBar();
            }
        }
    
        function showResult() {
            let resultText = '';
            
            const questionElement = document.querySelector('#question');
            const qimg = document.querySelector('#questionimg');
            const choices = document.querySelector('#choices');
            questionElement.remove();
            qimg.remove();
            choices.remove();

            if (arabicaAdventurer > Math.max(matchaMystic, espressoEmperor, mochaMuse)) {
                resultText = 'Arabica Adventurer!';
                submitQuizResult(1);
            } else if (matchaMystic > Math.max(arabicaAdventurer, espressoEmperor, mochaMuse)) {
                resultText = 'Matcha Mystic!';
                submitQuizResult(2);
            } else if (espressoEmperor > Math.max(arabicaAdventurer, matchaMystic, mochaMuse)) {
                resultText = 'Espresso Emperor!';
                submitQuizResult(3);
            } else {
                resultText = 'Mocha Muse!';
                submitQuizResult(4);
            }

            const resultContainer = document.querySelector('.result');
            resultContainer.textContent = resultText;
        }
    
        function startProgress() {
            displayQuestion();
            animateProgressBar();
        }
    
        function animateProgressBar() {
            const progressPercentage = (currentQuestionIndex / questions.length) * 100;
        
            // Animate the progress bar by changing the background color
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.background = `linear-gradient(to right, #6B3E2F ${progressPercentage}%, #ddd ${progressPercentage}%)`;

            const progressSegments = document.querySelectorAll('.progress-segment');
            for (let i = 0; i < currentQuestionIndex; i++) {
                progressSegments[i].style.backgroundColor = '#6B3E2F';
            }
        
            const progressIcon = document.getElementById('progressIcon');
            const segmentWidth = 90 / progressSegments.length; 
            const iconPosition = Math.min(segmentWidth * currentQuestionIndex, 100);
        
            progressIcon.style.left = `${iconPosition}%`; // Update position directly based on segments
        }            

        // Start the quiz
        startProgress();    
    }
    personalityQuiz();   
})


// Function to send quiz result to the server
function submitQuizResult(personalityTypeId) {
    fetch('quiz.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `personality_type_id=${encodeURIComponent(personalityTypeId)}`,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'success') {
                goToMain();
            } else {
                console.error(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function goToMain() {
    const resultContainer = document.querySelector(".result")
    const submit = document.createElement('div');
    submit.classList.add('submitContainer');

    submit.innerHTML = `<button id="continueButton" class="continue-button">Continue</button>`;

    resultContainer.appendChild(submit);

    document.querySelector("#continueButton").addEventListener("click", () => {
        window.location.href = '../filter/filter.html';
    })

}