/* rating.js */

// YOUR SUPABASE DETAILS
const SUPABASE_URL = "https://uroncgduuurzkkaatnevf.supabase.co";
const SUPABASE_KEY = "sb_publishable_0ANL7iukH9a9WfWAZByFQ0_2DxJH51K";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let selectedRating = 0;

// ⭐ STAR CLICK ACTIONS
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const ratingInput = document.getElementById("rating");

    stars.forEach(star => {
        star.addEventListener("click", () => {
            selectedRating = parseInt(star.dataset.value);

            ratingInput.value = selectedRating;

            stars.forEach(s => {
                const val = parseInt(s.dataset.value);
                s.classList.toggle("selected", val <= selectedRating);
            });
        });
    });
});

// ⭐ SUBMIT RATING
async function submitRating(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rating = parseInt(document.getElementById("rating").value);

    if (!name || !rating) {
        alert("Please enter your name and click a star rating.");
        return;
    }

    const pagePath = window.location.pathname;

    const { data, error } = await supabaseClient
        .from("ratings")
        .insert([{ name, rating, page: pagePath }]);

    if (error) {
        console.error(error);
        alert("❌ Failed to save rating.");
    } else {
        alert("✔ Rating submitted successfully!");
        document.getElementById("rating-form").reset();

        document.querySelectorAll(".star").forEach(s =>
            s.classList.remove("selected")
        );
    }
}
