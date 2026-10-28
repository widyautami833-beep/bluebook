// ========================================
// BLUEBOOK - INTERACTIVE JAVASCRIPT
// ========================================

// Data buku untuk katalog
const books = [
    {
        id: 1,
        title: "Laut Bercerita",
        author: "Leila S. Chudori",
        category: "Fiksi",
        price: 95000,
        tag: "Pilihan",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Pengembangan Diri",
        price: 110000,
        tag: "Favorit",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: 3,
        title: "Filosofi Teras",
        author: "Henry Manampiring",
        category: "Pengembangan Diri",
        price: 85000,
        tag: "Populer",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: 4,
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
        category: "Fiksi",
        price: 105000,
        tag: "Pilihan",
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: 5,
        title: "Sebuah Seni untuk Bersikap Bodo Amat",
        author: "Mark Manson",
        category: "Pengembangan Diri",
        price: 92000,
        tag: "Favorit",
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: 6,
        title: "Negeri 5 Menara",
        author: "Ahmad Fuadi",
        category: "Fiksi",
        price: 88000,
        tag: "Inspiratif",
        image: "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: 7,
        title: "Belajar HTML & CSS",
        author: "Tim BlueBook",
        category: "Pendidikan",
        price: 75000,
        tag: "Belajar",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: 8,
        title: "Dasar Pemrograman Web",
        author: "Tim BlueBook",
        category: "Pendidikan",
        price: 98000,
        tag: "Edukasi",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=85"
    }
];

// Elemen HTML
const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const categoryFilters = document.getElementById("categoryFilters");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

const cartCount = document.getElementById("cartCount");
const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartSummary = document.getElementById("cartSummary");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");
const checkoutButton = document.getElementById("checkoutButton");
const continueShoppingButton = document.getElementById("continueShopping");
const toast = document.getElementById("toast");

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

// Status awal
let selectedCategory = "Semua";
let cart = [];
let toastTimeout;

// Format angka menjadi Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

// Tampilkan katalog buku
function renderBooks() {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredBooks = books.filter((book) => {
        const matchesCategory =
            selectedCategory === "Semua" ||
            book.category === selectedCategory;

        const matchesSearch =
            book.title.toLowerCase().includes(keyword) ||
            book.author.toLowerCase().includes(keyword) ||
            book.category.toLowerCase().includes(keyword);

        return matchesCategory && matchesSearch;
    });

    bookGrid.innerHTML = filteredBooks.map((book) => `
        <article class="book-card">
            <div class="book-cover-wrap">
                <span class="book-tag">${book.tag}</span>
                <img
                    class="book-cover"
                    src="${book.image}"
                    alt="Ilustrasi buku ${book.title}"
                    loading="lazy"
                >
            </div>

            <div class="book-info">
                <span class="book-category">${book.category}</span>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">oleh ${book.author}</p>

                <div class="book-bottom">
                    <span class="book-price">${formatRupiah(book.price)}</span>
                    <button
                        class="add-cart"
                        data-add="${book.id}"
                        aria-label="Tambah ${book.title} ke keranjang"
                        title="Tambah ke keranjang"
                    >+</button>
                </div>
            </div>
        </article>
    `).join("");

    resultsCount.textContent =
        `Menampilkan ${filteredBooks.length} dari ${books.length} buku`;

    emptyState.hidden = filteredBooks.length !== 0;
    bookGrid.hidden = filteredBooks.length === 0;
    clearSearch.hidden = keyword.length === 0;
}

// Filter kategori
categoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");

    if (!button) return;

    selectedCategory = button.dataset.category;

    document.querySelectorAll(".filter-btn").forEach((filter) => {
        filter.classList.toggle("active", filter === button);
    });

    renderBooks();
});

// Pencarian buku
searchInput.addEventListener("input", renderBooks);

// Hapus kata pencarian
clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    renderBooks();
    searchInput.focus();
});

// Kembalikan semua filter
document.getElementById("resetFilters").addEventListener("click", () => {
    searchInput.value = "";
    selectedCategory = "Semua";

    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.category === "Semua"
        );
    });

    renderBooks();
});

// Notifikasi singkat
function showToast(message) {
    clearTimeout(toastTimeout);

    toast.textContent = message;
    toast.classList.add("show");

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// Tambah buku ke keranjang
function addToCart(bookId) {
    const book = books.find((item) => item.id === bookId);

    if (!book) return;

    const existingItem = cart.find((item) => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    renderCart();
    showToast(`${book.title} ditambahkan ke keranjang.`);
}

// Event delegation untuk tombol tambah
bookGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");

    if (!button) return;

    addToCart(Number(button.dataset.add));
});

// Tampilkan isi keranjang
function renderCart() {
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
    summaryQuantity.textContent = `${totalQuantity} item`;
    summaryTotal.textContent = formatRupiah(totalPrice);

    cartEmpty.hidden = cart.length !== 0;
    cartSummary.hidden = cart.length === 0;

    cartItems.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="Buku ${item.title}">

            <div>
                <h3>${item.title}</h3>
                <p class="cart-item-price">${formatRupiah(item.price)}</p>

                <div class="quantity-control">
                    <button
                        data-decrease="${item.id}"
                        aria-label="Kurangi jumlah ${item.title}"
                    >−</button>

                    <span>${item.quantity}</span>

                    <button
                        data-increase="${item.id}"
                        aria-label="Tambah jumlah ${item.title}"
                    >+</button>
                </div>
            </div>

            <button
                class="remove-item"
                data-remove="${item.id}"
                aria-label="Hapus ${item.title}"
                title="Hapus buku"
            >×</button>
        </div>
    `).join("");
}

// Mengubah jumlah dan menghapus buku
cartItems.addEventListener("click", (event) => {
    const increaseButton = event.target.closest("[data-increase]");
    const decreaseButton = event.target.closest("[data-decrease]");
    const removeButton = event.target.closest("[data-remove]");

    if (increaseButton) {
        const item = cart.find(
            (book) => book.id === Number(increaseButton.dataset.increase)
        );

        if (item) item.quantity += 1;
        renderCart();
        return;
    }

    if (decreaseButton) {
        const item = cart.find(
            (book) => book.id === Number(decreaseButton.dataset.decrease)
        );

        if (item) {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                cart = cart.filter((book) => book.id !== item.id);
            }
        }

        renderCart();
        return;
    }

    if (removeButton) {
        const itemId = Number(removeButton.dataset.remove);
        const removedItem = cart.find((book) => book.id === itemId);

        cart = cart.filter((book) => book.id !== itemId);
        renderCart();

        if (removedItem) {
            showToast(`${removedItem.title} dihapus dari keranjang.`);
        }
    }
});

// Buka dan tutup keranjang
function openCart() {
    cartDrawer.classList.add("open");
    drawerOverlay.classList.add("show");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeCartButton.focus();
}

function closeCart() {
    cartDrawer.classList.remove("open");
    drawerOverlay.classList.remove("show");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
}

openCartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
drawerOverlay.addEventListener("click", closeCart);
continueShoppingButton.addEventListener("click", closeCart);

// Tombol Escape menutup keranjang dan menu
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeCart();
        closeMobileMenu();
    }
});

// Demo checkout
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Keranjangmu masih kosong.");
        return;
    }

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    showToast(
        `Demo pesanan: ${totalItems} buku, total ${formatRupiah(totalPrice)}.`
    );
});

// Form newsletter demo
newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("newsletterEmail");
    const email = emailInput.value.trim();

    if (!email) {
        showToast("Masukkan alamat email terlebih dahulu.");
        return;
    }

    newsletterMessage.textContent =
        `Terima kasih! ${email} berhasil didaftarkan dalam demo.`;
    newsletterMessage.style.color = "#365f87";

    newsletterForm.reset();
    showToast("Pendaftaran demo berhasil!");
});

// Navigasi mobile
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

function closeMobileMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup navigasi" : "Buka navigasi"
    );
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

// Navigasi aktif mengikuti bagian halaman
const observedSections = document.querySelectorAll(
    "main section[id], header[id]"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const currentId = entry.target.id;

                document.querySelectorAll(".nav-link").forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );
                });
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    observedSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

// Tahun otomatis pada footer
document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Jalankan tampilan awal
renderBooks();
renderCart();

/* ======================================
   CHECKOUT, PEMBAYARAN DEMO, DAN STRUK
====================================== */

const checkoutPage = document.getElementById("checkoutPage");
const receiptPage = document.getElementById("receiptPage");
const checkoutForm = document.getElementById("checkoutForm");
const siteFooter = document.querySelector(".footer");

const storeSections = [
    ...document.querySelector("main").children
].filter(section => {
    return section !== checkoutPage && section !== receiptPage;
});

function showStorePage() {
    storeSections.forEach(section => {
        section.hidden = false;
    });

    checkoutPage.hidden = true;
    receiptPage.hidden = true;
    siteFooter.style.display = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showCheckoutPage() {
    if (cart.length === 0) {
        showToast("Keranjang masih kosong. Pilih buku terlebih dahulu.");
        return;
    }

    closeCart();

    storeSections.forEach(section => {
        section.hidden = true;
    });

    receiptPage.hidden = true;
    checkoutPage.hidden = false;
    siteFooter.style.display = "none";

    renderCheckoutSummary();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function renderCheckoutSummary() {
    const quantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("checkoutQuantity").textContent =
        `${quantity} item`;

    document.getElementById("checkoutTotal").textContent =
        formatRupiah(total);

    document.getElementById("checkoutItems").innerHTML =
        cart.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" alt="Buku">
                <div class="checkout-item-detail">
                    <strong>${item.title}</strong>
                    <span>${item.quantity} × ${formatRupiah(item.price)}</span>
                </div>
                <strong class="checkout-item-subtotal">
                    ${formatRupiah(item.price * item.quantity)}
                </strong>
            </div>
        `).join("");
}

document.getElementById("checkoutButton")
    .addEventListener("click", showCheckoutPage);

document.getElementById("backToStore")
    .addEventListener("click", showStorePage);

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        showToast("Keranjang kosong. Silakan pilih buku lagi.");
        showStorePage();
        return;
    }

    if (!checkoutForm.reportValidity()) return;

    const buyerName =
        document.getElementById("buyerName").value.trim();

    const buyerPhone =
        document.getElementById("buyerPhone").value.trim();

    const buyerAddress =
        document.getElementById("buyerAddress").value.trim();

    const selectedPayment = checkoutForm.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    if (!selectedPayment) {
        showToast("Pilih metode pembayaran terlebih dahulu.");
        return;
    }

    const paymentMethod = selectedPayment.value;
    const orderedBooks = cart.map(item => ({ ...item }));

    const totalPrice = orderedBooks.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const orderNumber =
        "BB-" + Date.now().toString().slice(-10);

    document.getElementById("receiptOrderNumber").textContent =
        orderNumber;

    document.getElementById("receiptDate").textContent =
        new Intl.DateTimeFormat("id-ID", {
            dateStyle: "long",
            timeStyle: "short"
        }).format(new Date());

    document.getElementById("receiptName").textContent = buyerName;
    document.getElementById("receiptPhone").textContent = buyerPhone;
    document.getElementById("receiptAddress").textContent = buyerAddress;

    document.getElementById("receiptPaymentMethod").textContent =
        paymentMethod + " (Simulasi)";

    document.getElementById("receiptTotal").textContent =
        formatRupiah(totalPrice);

    document.getElementById("receiptItems").innerHTML =
        orderedBooks.map(item => `
            <div class="receipt-item-row">
                <div>
                    <strong>${item.title}</strong>
                    <span>${item.quantity} × ${formatRupiah(item.price)}</span>
                </div>
                <strong>${formatRupiah(item.price * item.quantity)}</strong>
            </div>
        `).join("");

    checkoutPage.hidden = true;
    receiptPage.hidden = false;
    siteFooter.style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    showToast(`Struk demo ${orderNumber} berhasil dibuat.`);

    cart = [];
    renderCart();
});

document.getElementById("printReceipt")
    .addEventListener("click", function() {
        window.print();
    });

document.getElementById("finishOrder")
    .addEventListener("click", function() {
        checkoutForm.reset();
        showStorePage();
    });

checkoutPage.hidden = true;
receiptPage.hidden = true;