
// Navbar Mobile Dropdown Menu
document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});

// Recently Published Carousel
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

console.log(slides)

if (slides.length > 0) {
  console.log("slides exist")
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

// JavaScript to populate table and cards, and handle search functionality
// Sample JSON data
const worksData = [
    {
        title: "Engaging Blog Post Series",
        publication: "Blog XYZ",
        date: "03/2022",
        category: "Copywriting",
        link: "https://example.com/blog-series"
    },
    {
        title: "Product Photography for Catalog",
        publication: "Company ABC",
        date: "05/2021",
        category: "Photography",
        link: "https://example.com/catalog"
    },
    {
        title: "Monthly Social Media Campaign",
        publication: "Client DEF",
        date: "07/2023",
        category: "Social Media Management",
        link: "https://example.com/social-campaign"
    },
    {
        title: "Annual Report Copywriting",
        publication: "Non-Profit Organization",
        date: "12/2022",
        category: "Reporting",
        link: "https://example.com/annual-report"
    },
    {
        title: "Event Photography and Editing",
        publication: "Event Planner JKL",
        date: "11/2020",
        category: "Photography",
        link: "https://example.com/event-photography"
    },
    {
        title: "Annual Financial Report Writing",
        publication: "Finance Firm PQR",
        date: "02/2023",
        category: "Reporting",
        link: "https://example.com/financial-report"
    }
];

// Populate table and cards
function populateWorks() {
    console.log('populate works')
    const tableBody = document.getElementById("table-body");
    const worksContainer = document.getElementById("works-container");

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
function searchWorks() {
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

// Event Listeners
document.getElementById("search-bar").addEventListener("input", searchWorks);

// Populate works on page load
document.addEventListener("DOMContentLoaded", populateWorks);
