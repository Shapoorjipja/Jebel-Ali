<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

<script>

    const SUPABASE_URL = "https://uroncgduurzkkzaatnevf.supabase.co";   // your project URL
    const SUPABASE_KEY = "sb_publisable_0ANL7iukH9a9WfWAZByF0Q_20xJH51K";  // your publishable key

    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    async function submitRating() {
        const name = document.getElementById("name").value;
        const rating = document.getElementById("rating").value;
        const page = window.location.pathname;
        const comment = document.getElementById("comment").value;

        const { data, error } = await supabase
            .from("ratings")
            .insert([
                { name, rating, page, comment }
            ]);

        if (error) {
            console.error(error);
            alert("Error saving rating!");
        } else {
            alert("Rating saved successfully!");
        }
    }

</script>
