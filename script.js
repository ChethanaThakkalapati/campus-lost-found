const lostBtn = document.getElementById("lostBtn");
const foundBtn = document.getElementById("foundBtn");
const reportSection = document.getElementById("reportSection");

lostBtn.addEventListener("click", function () {
    reportSection.scrollIntoView({ behavior: "smooth" });
});

foundBtn.addEventListener("click", function () {
    reportSection.scrollIntoView({ behavior: "smooth" });
});

const itemForm = document.getElementById("itemForm");

itemForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Item report submitted successfully!");

    itemForm.reset();
});