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

// aos
AOS.init();
// let back_to_top_btn = document.querySelector(".btn__back__to__top")
// , main = document.querySelector('main')
// main.addEventListener("scroll", (e)=>{
//     AOS.refresh();

//     if (main.scrollTop > 1) {back_to_top_btn.classList.remove("back__to__top__btn__hidden")}
//     else{back_to_top_btn.classList.add("back__to__top__btn__hidden")}
// })
// aos

//email
let form = document.querySelector(".form")
function send() {
    Email.send({
        SecureToken : "etat-wcfk-kyga-wclp",
        To : 'SorenShamloo.Programmer@gmail.com',
        From : form.querySelector("input[name='email']").value,
        Subject : form.querySelector("input[name='subject']").value,
        Body : form.querySelector("input[name='firstname']").value + " " + form.querySelector("input[name='lastname']").value + "\n" + form.querySelector("textarea").value + "\n"
    }).then(
        message => alert(message)
    );
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    send();
})
//email