// rating.js

// TODO: replace with your Supabase details
const SUPABASE_URL = "https://uroncgduuurzkkaatnevf.supabase.co";
const SUPABASE_KEY = "sb_publishable_0ANL7iukH9a9WfWAZByFQ0_2DxJH51K";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let selectedRating = 0;

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingInput = document.getElementById("rating");

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value, 10);
      ratingInput.value = selectedRating;

      stars.forEach(s => {
        const val = parseInt(s.dataset.value, 10);
        s.classList.toggle("selected", val <= selectedRating);
      });
    });
  });
});

async function submitRating(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const rating = parseInt(document.getElementById("rating").value, 10);

  if (!name || !rating) {
    alert("Please enter your name and click a star rating.");
    return;
  }

  const page = window.location.pathname;

  const { error } = await supabaseClient
    .from("ratings")
    .insert([{ name, rating, page }]);

  if (error) {
    console.error(error);
    alert("❌ Failed to save rating.");
  } else {
    alert("✔ Rating submitted successfully!");

    document.getElementById("rating-form").reset();
    document.getElementById("rating").value = "";
    document.querySelectorAll(".star").forEach(s => s.classList.remove("selected"));
  }
}
