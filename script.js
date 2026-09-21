const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const tools = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");
const themeButton = document.getElementById("themeButton");

// البحث داخل الأدوات
function searchTools() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleTools = 0;

  tools.forEach(function (tool) {
    const toolName = (tool.dataset.name || "").toLowerCase();
    const toolText = tool.textContent.toLowerCase();

    const isMatch =
      query === "" ||
      toolName.includes(query) ||
      toolText.includes(query);

    tool.style.display = isMatch ? "" : "none";

    if (isMatch) {
      visibleTools++;
    }
  });

  if (query !== "" && visibleTools === 0) {
    noResults.textContent = "ملقيناش أداة بالاسم ده، جرّب كلمة تانية.";
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

// البحث أثناء الكتابة
searchInput.addEventListener("input", searchTools);

// البحث عند الضغط على زر بحث
searchButton.addEventListener("click", function () {
  searchTools();

  document.getElementById("tools").scrollIntoView({
    behavior: "smooth"
  });
});

// البحث عند الضغط على Enter
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchTools();

    document.getElementById("tools").scrollIntoView({
      behavior: "smooth"
    });
  }
});

// أزرار البحث السريع
const quickLinks = document.querySelectorAll(".quick-link");

quickLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    searchInput.value = link.dataset.search;
    searchTools();

    document.getElementById("tools").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// الوضع الليلي
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  themeButton.textContent =
    document.body.classList.contains("dark") ? "☀" : "◐";
});

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(function (categoryCard) {
  categoryCard.addEventListener("click", function () {
    const selectedCategory = categoryCard.dataset.categoryFilter;

    // نمسح كلمة البحث القديمة
    searchInput.value = "";

    let visibleTools = 0;

    tools.forEach(function (tool) {
      const isMatch =
        tool.dataset.category === selectedCategory;

      tool.style.display = isMatch ? "" : "none";

      if (isMatch) {
        visibleTools++;
      }
    });

    noResults.style.display =
      visibleTools === 0 ? "block" : "none";

    document.getElementById("tools").scrollIntoView({
      behavior: "smooth"
    });
  });
});
const showAllToolsButton = document.getElementById("showAllTools");

showAllToolsButton.addEventListener("click", function () {
  searchInput.value = "";

  tools.forEach(function (tool) {
    tool.style.display = "";
  });

  noResults.style.display = "none";

  document.getElementById("tools").scrollIntoView({
    behavior: "smooth"
  });
});
