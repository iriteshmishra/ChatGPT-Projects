 const toggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Enable dark mode if previously set
    if (localStorage.getItem("darkMode") === "true") {
      body.classList.add("dark");
      toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
      body.classList.toggle("dark");
      localStorage.setItem("darkMode", body.classList.contains("dark"));
    });

    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

    function displayQuotes(filter = "") {
      const grid = document.getElementById("quotesGrid");
      grid.innerHTML = "";

      const filteredQuotes = quotes.filter(q =>
        q.toLowerCase().includes(filter.toLowerCase())
      );

      filteredQuotes.forEach((quote) => {
        const div = document.createElement("div");
        div.className = "quote";
        div.textContent = quote;
        grid.appendChild(div);
      });

      updateRandomQuote(filteredQuotes);
    }

    function addQuote() {
      const input = document.getElementById("quoteInput");
      const newQuote = input.value.trim();
      if (newQuote !== "") {
        quotes.push(newQuote);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        input.value = "";
        displayQuotes(document.getElementById("searchInput").value);
      }
    }

    function filterQuotes() {
      const searchValue = document.getElementById("searchInput").value;
      displayQuotes(searchValue);
    }

    function updateRandomQuote(sourceArray = quotes) {
      const display = document.getElementById("randomQuote");
      if (sourceArray.length === 0) {
        display.textContent = "No quotes available. Add one to get inspired!";
        return;
      }
      const randomIndex = Math.floor(Math.random() * sourceArray.length);
      display.textContent = `"${sourceArray[randomIndex]}"`;
    }

    // Initial render
    displayQuotes();