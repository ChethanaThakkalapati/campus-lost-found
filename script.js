const lostBtn = document.getElementById("lostBtn");
const foundBtn = document.getElementById("foundBtn");

const reportSection = document.getElementById("reportSection");

const itemForm = document.getElementById("itemForm");

const itemsContainer = document.getElementById("itemsContainer");


/* LOST BUTTON */

lostBtn.addEventListener("click", function () {

    document.getElementById("status").value = "Lost";

    reportSection.scrollIntoView({
        behavior: "smooth"
    });

});


/* FOUND BUTTON */

foundBtn.addEventListener("click", function () {

    document.getElementById("status").value = "Found";

    reportSection.scrollIntoView({
        behavior: "smooth"
    });

});


/* SAMPLE DATABASE DATA */

let items = [

    {
        name: "Black Backpack",
        category: "Bag",
        status: "Lost",
        description:
            "Black backpack with a small keychain attached.",
        location: "Library",
        date: "2026-10-05",
        contact: "student@example.com"
    },

    {
        name: "Student ID Card",
        category: "ID Card",
        status: "Found",
        description:
            "REVA student ID card found near the entrance.",
        location: "Block A",
        date: "2026-10-06",
        contact: "campus.help@example.com"
    },

    {
        name: "Samsung Phone",
        category: "Phone",
        status: "Lost",
        description:
            "Black Samsung phone with a transparent cover.",
        location: "Cafeteria",
        date: "2026-10-04",
        contact: "student2@example.com"
    },

    {
        name: "Set of Keys",
        category: "Keys",
        status: "Found",
        description:
            "Three keys attached to a small blue keychain.",
        location: "Parking Area",
        date: "2026-10-03",
        contact: "security@example.com"
    },

    {
        name: "Engineering Book",
        category: "Books",
        status: "Lost",
        description:
            "Computer Architecture textbook with name written inside.",
        location: "Classroom 204",
        date: "2026-10-02",
        contact: "student3@example.com"
    },

    {
        name: "Brown Wallet",
        category: "Wallet",
        status: "Found",
        description:
            "Brown wallet found near the food court.",
        location: "Food Court",
        date: "2026-10-01",
        contact: "lostfound@example.com"
    }

];


/* CATEGORY ICONS */

function getIcon(category) {

    const icons = {

        "ID Card": "🪪",
        "Phone": "📱",
        "Laptop": "💻",
        "Wallet": "👛",
        "Keys": "🔑",
        "Bag": "🎒",
        "Books": "📚",
        "Documents": "📄",
        "Accessories": "🎧",
        "Other": "✦"

    };

    return icons[category] || "✦";

}


/* DISPLAY ITEMS */

function displayItems() {

    itemsContainer.innerHTML = "";


    items.forEach(function (item) {

        const card = document.createElement("div");

        card.className = "item-card";


        card.innerHTML = `

            <div class="card-top">

                <div class="item-icon">
                    ${getIcon(item.category)}
                </div>

                <span class="status ${item.status.toLowerCase()}">
                    ${item.status}
                </span>

            </div>


            <h3>
                ${item.name}
            </h3>


            <p class="category">
                ${item.category}
            </p>


            <p class="description">
                ${item.description}
            </p>


            <div class="item-details">

                <p>
                    📍 <strong>Location:</strong>
                    ${item.location}
                </p>

                <p>
                    📅 <strong>Date:</strong>
                    ${item.date}
                </p>

                <p>
                    ✉ <strong>Contact:</strong>
                    ${item.contact}
                </p>

            </div>

        `;


        itemsContainer.appendChild(card);

    });

}


/* FORM SUBMISSION */

itemForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const newItem = {

        name:
            document.getElementById("itemName").value,

        category:
            document.getElementById("category").value,

        status:
            document.getElementById("status").value,

        description:
            document.getElementById("description").value,

        location:
            document.getElementById("location").value,

        date:
            document.getElementById("date").value,

        contact:
            document.getElementById("contact").value

    };


    items.unshift(newItem);


    displayItems();


    alert("Item report submitted successfully!");


    itemForm.reset();


    document
        .querySelector(".reported-section")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* INITIAL DISPLAY */

displayItems();