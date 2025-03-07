const questions = [
    "Do you think hours of cardio is beneficial for fat loss?",
    "If there was a 7-minute routine to get you fit, would you add it to your daily routine?",
    "Do you prefer weight training over cardio?",
    "Would you follow a structured workout plan?",
    "Are you willing to change your diet for better results?"
];

let currentStep = 0;
const stepsContainer = document.getElementById("steps");
const progressBar = document.getElementById("progress");
const stepCounter = document.getElementById("stepCounter");
const formContainer = document.getElementById("formContainer");
const resultContainer = document.getElementById("resultContainer");
const finalProgress = document.getElementById("finalProgress");
const progressText = document.getElementById("progressText");

function renderStep() {
    stepsContainer.innerHTML = `
        <div class="question">
            <p>${questions[currentStep]}</p>
            <h3>(Many people think doing cardio every day is the answer.)</h3>
            <label class="custom-site-btn">
                <input type="radio" name="radio" value="Yes">
                <span class="checkmark"></span> Yes
            </label><br>
            <label class="custom-site-btn">
                <input type="radio" name="radio" value="No">
                <span class="checkmark"></span> No
            </label><br>
            <label class="custom-site-btn">
                <input type="radio" name="radio" value="Not Sure">
                <span class="checkmark"></span> Not Sure
            </label>
        </div>
    `;
    progressBar.style.width = `${(currentStep / (questions.length - 1)) * 100}%`;
    stepCounter.innerText = `${currentStep + 1}/5`;
}

function nextStep() {
    if (document.querySelector('input[name="radio"]:checked')) {
        if (currentStep < questions.length - 1) {
            currentStep++;
            renderStep();
        } else {
            formContainer.classList.add("hidden");
            resultContainer.classList.remove("hidden");
            animateProgress();
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
}

function animateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= 67) {  // Stop progress at 67%
            clearInterval(interval);
            setTimeout(showResultScreen, 500); // Show result after a short delay
        } else {
            progress++;
            let offset = 440 - (progress / 100) * 440;
            progressBar.style.strokeDashoffset = offset;
            progressText.innerText = `${progress}%`;
        }
    }, 50);
}
function showResultScreen() {
    resultContainer.innerHTML = `
        <div class="result-card">
        <div class="cus-container">
            <h2>Achieve Your Dream Figure with Quick and Effective Workouts.</h2>
            <h3>Great News</h3>
            <p>Your ideal fat burning routine has been calculated!</p>
            <p>Based on your answers, we’ve identified one simple method that you can start doing TODAY to help maximize results, in minimal time.</p>
            <p>Don’t worry… it doesn’t require long hours in the gym, running miles on a treadmill, or some super intense cardio workout.</p>
            <p>Instead, this little-known “S.I.T routine” can be done from the convenience of home, using your body’s own resistance, in just 7-minutes a day.</p>
            <p>But here’s the kicker: The special, hyper-focused movements have the potential to burn fat hours later, even while you sleep!</p>
            <p>In the free presentation below, world-renowned nutrition, fitness, and weight loss expert, Meredith Shirk, explains it all.</p>
            <p>Discover the virtually foolproof way to finally melt off stubborn fat, regardless of your age or activity level, revealing a slimmer, leaner, more toned body that you’ll absolutely LOVE.</p>
            <p>(This major metabolic breakthrough has already helped thousands of women get the body of their dreams… and you could be next.)</p>
            <button class="watch-presentation-btn">Watch Presentation Now</button>
        </div>
        </div>
    `;

    resultContainer.classList.remove("hidden");
}
document.addEventListener("DOMContentLoaded", function () {
    renderStep(); // Initialize first step

    const formSection = document.querySelector(".stepform");
    const homeBanner = document.querySelector(".home-banner");

    document.querySelectorAll(".custom-site-btn input[type='radio']").forEach(radio => {
        radio.addEventListener("change", function () {
            homeBanner.style.transition = "opacity 0.5s ease-in-out";
            homeBanner.style.opacity = "0";
            setTimeout(() => {
                homeBanner.style.display = "none";
                formSection.style.display = "flex";
                formSection.style.opacity = "0";
                setTimeout(() => {
                    formSection.style.transition = "opacity 0.5s ease-in-out";
                    formSection.style.opacity = "1";
                }, 100);
            }, 500);
        });
    });

    formSection.style.display = "none";
});
