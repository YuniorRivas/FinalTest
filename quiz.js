document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-quiz');
    const nextButton = document.getElementById('next-question');
    const submitButton = document.getElementById('submit-answer');
    const retakeButton = document.getElementById('retake-quiz');
    const questionTitle = document.getElementById('question-title');
    const optionsContainer = document.getElementById('options');
    const quizQuestions = document.getElementById('quiz-questions');
    const introductionSection = document.getElementById('introduction');
    const resultsContainer = document.getElementById('quiz-results');
    const resultExplanation = document.getElementById('result-explanation');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackInput = document.getElementById('feedback-input');
    const submitFeedbackButton = document.getElementById('submit-feedback');

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedButton = null;

    const questions = [
        {
            question: "You're attending a peaceful protest in NYC and a police officer orders the crowd to disperse, even though you're not blocking traffic or being violent. What should you do?",
            answers: [
                { text: "Refuse to move and sit down", correct: false, explanation: "Refusing to move might lead to arrest for disobedience of a lawful order." },
                { text: "Continue protesting as usual", correct: false, explanation: "Continuing to protest can result in similar consequences as ignoring a dispersal order." },
                { text: "Disperse as instructed", correct: true, explanation: "Following police orders to disperse can prevent charges such as disorderly conduct or failure to obey a lawful order." },
                { text: "Start chanting louder", correct: false, explanation: "Increasing the volume of chants after a dispersal order can be seen as escalating the situation, possibly leading to enhanced charges." }
            ]
        },
        {
            question: "While protesting, you see a police officer recording the crowd. What is your best course of action?",
            answers: [
                { text: "Demand the officer stops recording", correct: false, explanation: "Demanding that an officer stops recording is ineffective as police have the legal right to record in public settings for monitoring and evidence." },
                { text: "Cover your face and continue protesting", correct: true, explanation: "Covering your face and continuing to protest respects lawful monitoring while protecting your identity, minimizing personal risk." },
                { text: "Try to grab the camera", correct: false, explanation: "Attempting to grab the camera can lead to charges such as obstructing governmental administration or even assault." },
                { text: "Tell others to stop protesting", correct: false, explanation: "Telling others to stop protesting can diminish the effectiveness of the protest and spread unnecessary fear." }
            ]
        },
        {
            question: "The police have set up barriers at a protest you're attending. You want to cross the barrier to join the other group of protesters. What should you do?",
            answers: [
                { text: "Cross the barrier anyway", correct: false, explanation: "Crossing the barrier directly violates police orders and can result in arrest for trespassing or disorderly conduct." },
                { text: "Look for an alternative route that does not involve crossing the barrier", correct: true, explanation: "Looking for an alternative route that does not involve crossing the barrier respects the law enforcement boundaries and avoids confrontation." },
                { text: "Dismantle the barrier yourself", correct: false, explanation: "Dismantling the barrier is a direct violation of property laws and likely to result in charges of vandalism or destruction of property." },
                { text: "Encourage others to push through the barrier", correct: false, explanation: "Encouraging others to push through can lead to charges of inciting a riot or disorderly conduct." }
            ]
        },
        {
            question: "You're at a protest and a police officer asks for your identification. What are your rights?",
            answers: [
                { text: "You must provide it immediately", correct: false, explanation: "Providing ID immediately isn't required unless you're under arrest or in specific situations like driving." },
                { text: "You can refuse if you're not being lawfully detained or arrested", correct: true, explanation: "You can refuse if you're not being lawfully detained or arrested. This respects your Fourth Amendment rights against unreasonable searches and seizures." },
                { text: "Run away from the officer", correct: false, explanation: "Running away from the officer can lead to charges such as resisting arrest or evading police." },
                { text: "You must show it only if you are inside a vehicle", correct: false, explanation: "The requirement to show ID only in a vehicle applies specifically to traffic stops and not to general protests." }
            ]
        },
        {
            question: "During a protest, a police officer tells you that using a megaphone is illegal. What should you do?",
            answers: [
                { text: "Use the megaphone louder to challenge the claim", correct: false, explanation: "Using the megaphone louder can lead to arrest for disorderly conduct if it's indeed illegal." },
                { text: "Stop using the megaphone and check the local ordinances later", correct: true, explanation: "Stopping using the megaphone and checking the local ordinances later complies temporarily and avoids potential charges for violating noise ordinances or similar regulations." },
                { text: "Hand the megaphone to another protester", correct: false, explanation: "Handing the megaphone to another protester doesn't address the legal issue and could contribute to their risk." },
                { text: "Argue with the officer about your rights", correct: false, explanation: "Arguing about rights on the spot is unlikely to change the officer's enforcement at that moment and may escalate the situation." }
            ]
        },
        {
            question: "You're at a protest and witness an arrest taking place. What's the best way to respond?",
            answers: [
                { text: "Attempt to intervene physically", correct: false, explanation: "Physically intervening can lead to arrest for obstructing justice or assault." },
                { text: "Start shouting at the police officer", correct: false, explanation: "Shouting at the officer can escalate the situation, potentially leading to additional charges." },
                { text: "Document the arrest from a safe distance", correct: true, explanation: "Documenting the arrest from a safe distance is legally protected and helps ensure that any potential misconduct is recorded without interfering." },
                { text: "Ignore the arrest and continue protesting", correct: false, explanation: "Ignoring the arrest misses an opportunity to document potential abuses of power." }
            ]
        },
        {
            question: "A protest you are attending starts to get chaotic, and tear gas is deployed. What is the safest action to take?",
            answers: [
                { text: "Run towards the police lines", correct: false, explanation: "Running towards police lines can be seen as an act of aggression and lead to forceful retaliation." },
                { text: "Stay put and hold your ground", correct: false, explanation: "Staying put risks severe health effects from tear gas." },
                { text: "Try to throw the tear gas canisters back", correct: false, explanation: "Throwing tear gas canisters back can result in serious charges such as assault on a police officer or rioting." },
                { text: "Move away from the area where the gas was deployed and find a safe route to leave", correct: true, explanation: "Moving away from the area where the gas was deployed and finding a safe route to leave is the safest response to avoid harm." }
            ]
        },
        {
            question: "You want to bring a sign to a protest in NYC. Which material should you avoid using for the sign's handle?",
            answers: [
                { text: "Cardboard tubing", correct: true, explanation: "Using a less rigid and potentially harmful material avoids violating protest rules regarding potential weapons." },
                { text: "A thin wooden stick", correct: false, explanation: "A thin wooden stick can be considered a weapon by law enforcement." },
                { text: "Plastic piping", correct: false, explanation: "Plastic piping might also be viewed as a potential weapon." },
                { text: "A retractable selfie stick", correct: false, explanation: "A retractable selfie stick can be seen as a weapon and might be banned in some protest scenarios." }
            ]
        },
        {
            question: "At a protest, you feel that the NYPD is infringing on your right to free speech. What should you do?",
            answers: [
                { text: "Start a chant against the NYPD", correct: false, explanation: "Starting a chant against the NYPD could escalate tensions and doesn't address the specific issue of rights infringement." },
                { text: "File a formal complaint after the protest", correct: true, explanation: "Filing a formal complaint after the protest is a proper and legally sound method to address perceived rights violations, offering a record and potential investigation without immediate confrontation." },
                                { text: "Confront the officers about it directly", correct: false, explanation: "Confronting the officers directly about rights infringement on the spot can escalate the situation and might not lead to a constructive resolution." },
                { text: "Encourage others to act against the police", correct: false, explanation: "Encouraging others to act against the police can be construed as inciting a riot or disorderly conduct, potentially leading to criminal charges." }
            ]
        },
        {
            question: "If you're arrested during a protest, what is the first thing you should do?",
            answers: [
                { text: "Resist the arrest to show your disagreement", correct: false, explanation: "Resisting arrest could lead to additional charges such as obstruction of justice or assault on a police officer." },
                { text: "Ask for a lawyer and remain silent", correct: true, explanation: "Asking for a lawyer and remaining silent is your right under the Fifth Amendment, which protects against self-incrimination, and the Sixth Amendment, which ensures the right to legal representation. This action minimizes the risk of inadvertently providing information that could be used against you in court." },
                { text: "Tell the police everything to clear the misunderstanding", correct: false, explanation: "Explaining your actions without a lawyer present can inadvertently lead to self-incrimination." },
                { text: "Try to escape from police custody", correct: false, explanation: "Trying to escape from police custody is a serious offense that could result in charges such as escaping arrest, and it poses significant safety risks." }
            ]
        }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        selectedButton = null;
        shuffle(questions);
        questions.forEach(question => shuffle(question.answers));
        introductionSection.style.display = 'none';
        resultsContainer.style.display = 'none';
        quizQuestions.style.display = 'block';
        progressContainer.style.display = 'block';
        showQuestion(questions[currentQuestionIndex]);
        updateProgressBar();
    }

    startButton.addEventListener('click', startQuiz);
    retakeButton.addEventListener('click', startQuiz);

    function showQuestion(question) {
        questionTitle.innerText = `Question ${currentQuestionIndex + 1}: ${question.question}`;
        optionsContainer.innerHTML = '';
        const optionLabels = ['A. ', 'B. ', 'C. ', 'D. '];
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerText = optionLabels[index] + answer.text;
            button.classList.add('option-button');
            button.dataset.correct = answer.correct;
            button.dataset.explanation = answer.explanation;
            button.addEventListener('click', () => selectAnswer(button));
            optionsContainer.appendChild(button);
        });
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
    }

    function selectAnswer(button) {
        if (selectedButton) {
            selectedButton.classList.remove('selected');
        }
        selectedButton = button;
        selectedButton.classList.add('selected');
        submitButton.style.display = 'block';
    }

    submitButton.addEventListener('click', () => {
        submitAnswer();
    });

    function submitAnswer() {
        const buttons = Array.from(optionsContainer.children);
        buttons.forEach(btn => {
            btn.disabled = true;
            const isCorrect = JSON.parse(btn.dataset.correct);
            btn.classList.remove('selected');
            if (isCorrect) {
                btn.classList.add('correct');
                if (!btn.innerHTML.includes('✔')) {
                    btn.innerHTML = '✔ ' + btn.innerText;
                }
            } else {
                btn.classList.add('incorrect');
                if (!btn.innerHTML.includes('✘')) {
                    btn.innerHTML = '✘ ' + btn.innerText;
                }
            }
            if (btn.nextSibling && btn.nextSibling.classList && btn.nextSibling.classList.contains('explanation')) {
                btn.nextSibling.remove();
            }
            const explanationDiv = document.createElement('div');
            if (btn === selectedButton) {
                explanationDiv.textContent = `You selected: ${btn.innerText.split(' ').slice(1).join(' ')} - ${btn.dataset.explanation}`;
            } else {
                explanationDiv.textContent = btn.dataset.explanation;
            }
            explanationDiv.classList.add('explanation');
            btn.parentNode.insertBefore(explanationDiv, btn.nextSibling);
        });
        if (JSON.parse(selectedButton.dataset.correct)) {
            score++;
        }
        submitButton.style.display = 'none';
        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            selectedButton = null;
            showQuestion(questions[currentQuestionIndex]);
            updateProgressBar();
        } else {
            displayResults();
        }
    });

    function updateProgressBar() {
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function displayResults() {
        quizQuestions.style.display = 'none';
        progressContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        let scoreMessage;
        if (score === questions.length) {
            scoreMessage = 'Excellent! You know your rights very well.';
        } else if (score >= questions.length * 0.7) {
            scoreMessage = 'Good job! You have a good understanding of your rights.';
        } else if (score >= questions.length * 0.5) {
            scoreMessage = 'Not bad! But there is room for improvement.';
        } else {
            scoreMessage = 'It looks like you need to learn more about your rights. Please review the resources below.';
        }
        resultExplanation.innerHTML = `You scored ${score} out of ${questions.length}. ${scoreMessage}`;
        feedbackContainer.style.display = 'block';
    }

    submitFeedbackButton.addEventListener('click', () => {
        const feedback = feedbackInput.value;
        if (feedback) {
            alert('Thank you for your feedback!');
            feedbackInput.value = '';
        } else {
            alert('Please enter your feedback before submitting.');
        }
    });

    function shareOnSocialMedia() {
        const url = window.location.href;
        const text = "I just took a quiz on knowing your rights during protests! Check it out: " + url;
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text), '_blank');
    }

    document.getElementById('share-button').addEventListener('click', shareOnSocialMedia);
});
