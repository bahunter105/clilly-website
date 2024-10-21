
// Navbar Mobile Dropdown Menu
document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});

// Recently Published Carousel
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

if (slides.length > 0) {
  // Variables for touch events
  let startX = 0;
  let endX = 0;

  function updateSlide(index) {
      const carousel = document.querySelector('.carousel');
      carousel.style.transform = `translateX(${-index * 33.33}%)`;

      // Update active dot
      dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
      });
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide(currentIndex);
  }

  function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide(currentIndex);
  }

  function currentSlide(index) {
      currentIndex = index;
      updateSlide(currentIndex);
  }

  // Automatically move slides every 5 seconds
  let autoSlideInterval = setInterval(nextSlide, 5000);

  // Initialize first slide as active
  updateSlide(currentIndex);

  // Add touch event listeners for swipe functionality
  const carouselContainer = document.querySelector('.carousel-container');

  carouselContainer.addEventListener('touchstart', handleTouchStart, false);
  carouselContainer.addEventListener('touchend', handleTouchEnd, false);

  function handleTouchStart(e) {
      startX = e.touches[0].clientX; // Record the initial touch position
  }

  function handleTouchEnd(e) {
      endX = e.changedTouches[0].clientX; // Record the final touch position
      handleSwipe();
  }

  function handleSwipe() {
      const threshold = 50; // Minimum swipe distance to be considered as a swipe
      if (startX - endX > threshold) {
          // Swipe left
          nextSlide();
          resetAutoSlide(); // Reset the auto-slide timer
      } else if (endX - startX > threshold) {
          // Swipe right
          prevSlide();
          resetAutoSlide(); // Reset the auto-slide timer
      }
  }

  function resetAutoSlide() {
      clearInterval(autoSlideInterval); // Clear the previous timer
      autoSlideInterval = setInterval(nextSlide, 5000); // Restart the timer
  }
}

// Populate table and cards
function populateWorks(worksData) {
    const tableBody = document.getElementById("table-body");
    const worksContainer = document.getElementById("works-container");

    worksData.forEach((work) => {
      // Format date to MM/YYYY
      if (work.date) {
          // Extract the values from Date(year, month, day)
          const dateMatch = work.date.match(/Date\((\d+),(\d+),(\d+)\)/);
          if (dateMatch) {
              const year = dateMatch[1];
              const month = ("0" + (parseInt(dateMatch[2]) + 1)).slice(-2); // month is 0-based, adding 1 and padding with "0"
              work.date = `${month}/${year}`;
          }
      }
    })


    worksData.forEach((work) => {
        // Add rows to the table
        const row = `
            <tr>
                <td>${work.title}</td>
                <td>${work.publication}</td>
                <td>${work.date}</td>
                <td>${work.category}</td>
                <td><a href="${work.link}" target="_blank">Visit</a></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);

        // Add cards for smaller screens
        const card = `
            <div class="work-card">
                <div class="work-header">
                    ${work.title}
                    <div class="toggle-details">
                      ▼
                    </div>
                </div>
                <div class="work-details">
                    <p><strong>Publication:</strong> ${work.publication}</p>
                    <p><strong>Date:</strong> ${work.date}</p>
                    <p><strong>Category:</strong> ${work.category}</p>
                    <a href="${work.link}" target="_blank" class="visit-link">Visit</a>
                </div>
            </div>
        `;
        worksContainer.insertAdjacentHTML("beforeend", card);
    });

    // Handle card expansion
    document.querySelectorAll(".toggle-details").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.closest(".work-card").querySelector(".work-details");
            details.classList.toggle("open");
            button.textContent = details.classList.contains("open") ? "▲" : "▼";
        });
    });
}

// Search Functionality
function searchWorks(worksData) {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const filteredWorks = worksData.filter((work) =>
        work.title.toLowerCase().includes(searchTerm) ||
        work.publication.toLowerCase().includes(searchTerm) ||
        work.date.includes(searchTerm) ||
        work.category.toLowerCase().includes(searchTerm)
    );

    // Clear existing content
    document.getElementById("table-body").innerHTML = "";
    document.querySelectorAll(".work-card").forEach(card => card.remove());

    // Populate with filtered results
    filteredWorks.forEach((work) => {
        const row = `
            <tr>
                <td>${work.title}</td>
                <td>${work.publication}</td>
                <td>${work.date}</td>
                <td>${work.category}</td>
                <td><a href="${work.link}" target="_blank">Visit</a></td>
            </tr>
        `;
        document.getElementById("table-body").insertAdjacentHTML("beforeend", row);

        const card = `
            <div class="work-card">
                <div class="work-header">
                    ${work.title}
                    <div class="toggle-details">
                      ▼
                    </div>
                </div>
                <div class="work-details">
                    <p><strong>Publication:</strong> ${work.publication}</p>
                    <p><strong>Date:</strong> ${work.date}</p>
                    <p><strong>Category:</strong> ${work.category}</p>
                    <a href="${work.link}" target="_blank" class="visit-link">Visit</a>
                </div>
            </div>
        `;
        document.getElementById("works-container").insertAdjacentHTML("beforeend", card);
    });

    // Re-attach card expansion handlers
    document.querySelectorAll(".toggle-details").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.closest(".work-card").querySelector(".work-details");
            details.classList.toggle("open");
            button.textContent = details.classList.contains("open") ? "▲" : "▼";
        });
    });
}

if (document.querySelector("#table-body")){
  fetch('https://docs.google.com/spreadsheets/d/1EMTdqDFDTO8Bw_ZfvPdvHxK65ypIvRmuVvuhfvSkb2o/gviz/tq?tqx=out:json')
    .then(response => response.text())
    .then(data => {
      // Clean up the response to get proper JSON
      const jsonData = JSON.parse(data.substring(47).slice(0, -2));

      // Extract the columns metadata (titles)
      const columns = jsonData.table.cols.map(col => col.label);

      // Extract the rows data
      const rows = jsonData.table.rows;

      // Map rows to an array of objects using column titles as keys
      const result = rows.map(row => {
        let obj = {};
        row.c.forEach((cell, index) => {
          obj[columns[index]] = cell ? cell.v : null; // Use column label as key
        });
        return obj;
      });

      // **Populate works on page load immediately**
      populateWorks(result);

      // **Event Listener for Search** after population
      document.getElementById("search-bar").addEventListener("input", () => searchWorks(result));
    })
    .catch(error => {
      console.error('Error fetching Google Sheet data:', error);
    });
}
