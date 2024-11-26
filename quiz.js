function personalityQuiz() {
    
    const questions = [
        {
            question: '"Before we begin," the barista says, gesturing to four customers in the café, "tell me, which scene catches your attention?"',
            options: [
                {ID: "A", choice: "a. A lively board game group, lost in laughter over cold coffee"},
                {ID: "B", choice: "b. A solitary artist sketching by rainy window with a ceramic mug"},
                {ID: "C", choice: "c. A skilled barista crafting coffee with perfect precision"},
                {ID: "D", choice: "d. Someone photographing an artful latte against a wall mural"}
            ]
        },
        {
            question: "The barista leads you to a magical brewing station where four coffee beans float in mid-air. Each one shows a different scene when you look closely. What do you see in yours?",
            options: [
                {ID: "A", choice: "a. A Colombian farmer sharing their family heritage in a coffee field"},
                {ID: "B", choice: "b. A traditional Japanese tea house frozen in time"},
                {ID: "C", choice: "c. A modern coffee lab developing new brewing techniques"},
                {ID: "D", choice: "d. A late-night café with artists in deep discussion"}
            ]
        },
        {
            question: "Suddenly, your coffee cup begins to ripple, and you're transported to a coffee farm at harvest time. The farm owner needs help, and you want to: ",
            options: [
                {ID: "A", choice: "a. Organize a community harvest festival to bring together farmers and coffee buyers"},
                {ID: "B", choice: "b. Design a sustainable farming practice that honors both tradition and the environment"},
                {ID: "C", choice: "c. Develop a new method for sorting beans to ensure maximum quality"},
                {ID: "D", choice: "d. Create an innovative way to showcase the farm's unique story and coffee variety"}
            ]
        },
        {
            question: "You've discovered a torn page from a magic recipe book! When you touch it, you experience a memory of: ",
            options: [
                {ID: "A", choice: "a. Finding friendship in a distant café while travelling across the world"},
                {ID: "B", choice: "b. Waking up to perfect your morning coffee ritual, finding peace in the quiet moments"},
                {ID: "C", choice: "c. Competing in a coffee championship, mastering coffee brewing techniques"},
                {ID: "D", choice: "d. Experimenting with unusual ingredients to create a signature drink"}
            ]
        },
        {
            question: "The barista reveals that the magical recipe book's pages shift and renew themselves, reflecting the ever-evolving relationships between humans and coffee across the world. You feel compelled to: ",
            options: [
                {ID: "A", choice: "a. Dive into these magical pages right now and watch the stories unfold!"},
                {ID: "B", choice: "b. Stay curious about preserving ancient coffee traditions while embracing modern evolution"},
                {ID: "C", choice: "c. Master every detail and technique through the rich history of coffee"},
                {ID: "D", choice: "d. Blend traditional coffee wisdom with contemporary artistic expression"}
            ]
        },
        {
            question: "The final test requires you to add your own magic to the recipe book. You create: ",
            options: [
                {ID: "A", choice: "a. A welcoming guide for coffee tastings that brings diverse people together"},
                {ID: "B", choice: "b. A meditation track of coffee sounds - from grinding beans to steaming milk"},
                {ID: "C", choice: "c. A mystical menu that reads moods and suggests perfect coffee pairings"},
                {ID: "D", choice: "d. An innovative cup design that dances on the page, transforming coffee rituals"}
            ]
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

        choiceContainer.innerHTML = "";
        questionElement.textContent = currentQ.question;

        currentQ.options.forEach((option, index) => {
          const button = document.createElement('button');
          button.textContent = option.choice;
          button.addEventListener('click', ()=> storeAnswers(index));
          choiceContainer.appendChild(button);
        });
    }

    // function to store the user's answers and determine personality type
    function storeAnswers(index) {
        const currentQ = questions[currentQuestionIndex];
        const selectedChoice = currentQ.options[index].ID;

        if (selectedChoice == "A") {
            arabicaAdventurer += 1
        }
        if (selectedChoice == "B") {
            matchaMystic += 1
        }
        if (selectedChoice == "C") {
            espressoEmperor += 1
        }
        if (selectedChoice == "D") {
            mochaMuse += 1
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        }
        else { // if all questions are answered remove quiz elements and display result
            const question = document.querySelector('#question');
            const choices = document.querySelector('#choices');
            question.remove();
            choices.remove();
            showResults();
        }

        // just to test that its working
        console.log(arabicaAdventurer, matchaMystic, espressoEmperor, mochaMuse);
    }

    function showResults() {
        // grab highest score out of the 4
        // will do cases where some values are equal another time :')
        const highestScore = Math.max(arabicaAdventurer,matchaMystic,espressoEmperor,mochaMuse);
        let result;

        if (highestScore == arabicaAdventurer) {
            result = document.createElement('h1');
            result.innerHTML = 'arabica adventurer!';
            document.body.appendChild(result);
        }
        if (highestScore == matchaMystic) {
            result = document.createElement('h1');
            result.innerHTML = 'matcha mystic!';
            document.body.appendChild(result);
        }
        if (highestScore == espressoEmperor) {
            result = document.createElement('h1');
            result.innerHTML = 'espresso emperor!';
            document.body.appendChild(result);
        }
        if (highestScore == mochaMuse) {
            result = document.createElement('h1');
            result.innerHTML = 'mocha muse!';
            document.body.appendChild(result);
        }
    }

    // display first question when quiz begins
    displayQuestion();
}

// run personality quiz
personalityQuiz();