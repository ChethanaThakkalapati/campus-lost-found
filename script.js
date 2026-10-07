import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDi7aFmZLGaTQeZoky35NsZ2gNO-eHI9_E",
    authDomain: "campus-lost-found-12646.firebaseapp.com",
    projectId: "campus-lost-found-12646",
    storageBucket: "campus-lost-found-12646.firebasestorage.app",
    messagingSenderId: "778080160008",
    appId: "1:778080160008:web:a38333d2e3630e1d9384bd",
    measurementId: "G-GLPM3ZYYRP"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const lostBtn = document.getElementById("lostBtn");
const foundBtn = document.getElementById("foundBtn");

const reportSection = document.getElementById("reportSection");

const itemForm = document.getElementById("itemForm");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
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
        name: "Backpack",
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
        name: "Phone",
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
        name: "Books",
        category: "Books",
        status: "Lost",
        description:
            "Computer Architecture textbook with name written inside.",
        location: "Classroom 204",
        date: "2026-10-02",
        contact: "student3@example.com"
    },

    {
        name: "Wallet",
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

function displayItems(itemsToDisplay = items) {

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

${item.status !== "Returned" ? `
    <button
        class="returned-btn"
        data-id="${item.id}">
        ✓ Mark as Returned
    </button>
` : `
    <p class="returned-label">
        ✓ Item Returned
    </p>
`}

        `;


        itemsContainer.appendChild(card);

    });

}


/* FORM SUBMISSION */

itemForm.addEventListener("submit", async function (event) {

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


    try {

    await addDoc(collection(db, "items"), newItem);

    items.unshift(newItem);

    displayItems();

    alert("Item report submitted successfully!");

    itemForm.reset();

    document
        .querySelector(".reported-section")
        .scrollIntoView({
            behavior: "smooth"
        });

} catch (error) {

    console.error("Error saving item:", error);

    alert("Could not submit the report. Please try again.");

}

});


/* INITIAL DISPLAY */

async function loadItems() {

    const snapshot = await getDocs(collection(db, "items"));

    items = [];

    snapshot.forEach(function (doc) {

        items.push({
            id: doc.id,
            ...doc.data()
        });

    });

    displayItems();

}

loadItems();

/* SEARCH AND FILTER */

function filterItems() {

    const searchText = searchInput.value.toLowerCase();

    const selectedStatus = statusFilter.value;

    const selectedCategory = categoryFilter.value;


    const filteredItems = items.filter(function (item) {

        const matchesSearch =
            item.name.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText) ||
            item.location.toLowerCase().includes(searchText);


        const matchesStatus =
            selectedStatus === "All" ||
            item.status === selectedStatus;


        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
        );

    });


    displayItems(filteredItems);

}


/* FILTER EVENTS */

searchInput.addEventListener("input", filterItems);

statusFilter.addEventListener("change", filterItems);

categoryFilter.addEventListener("change", filterItems);

/* MARK AS RETURNED */

itemsContainer.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("returned-btn")) {
        return;
    }

    const itemId = event.target.dataset.id;

    await updateDoc(
        doc(db, "items", itemId),
        {
            status: "Returned"
        }
    );

    await loadItems();

    alert("Item marked as returned!");
});