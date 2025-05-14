// progress
let skill_cards = document.querySelectorAll('.skill__card');
skill_cards.forEach(element => {
    element.addEventListener("mouseenter",() => {
        let value = element.getAttribute("data-value"),
            startValue = 0,
            endValue = Number(value),
            speed = 20
        const progressText = element.querySelector(".progress__text__number"),
            progressValue = element.querySelector(".progress__value"),
            progress = setInterval(() => {
            startValue++;
            progressText.innerHTML = `${startValue}`;
            progressValue.style.width = `${startValue}%`
            if (startValue == endValue) {
            clearInterval(progress);
            }
        }, speed);
        element.addEventListener("mouseleave",() => {
            clearInterval(progress);
        })
    })
});
// progress
AOS.init();
document.querySelector('main').addEventListener("scroll", (e)=>{
    AOS.refresh()
})