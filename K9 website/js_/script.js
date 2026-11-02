/**
 * Lethabo’s K9 Academia of Protection - Central Functional JavaScript Engine
 */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================== ENQUIRY VALIDATION & AJAX HANDLING ========================================== */
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;
            
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            const feedback = document.getElementById('formFeedback');
            if (feedback) feedback.innerHTML = '';

            const name = document.getElementById('fullName');
            const email = document.getElementById('emailAddress');
            const type = document.getElementById('enquiryType');
            const details = document.getElementById('details');

            if (name && name.value.trim().length < 3) {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value.trim())) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            if (type && type.value === '') {
                document.getElementById('typeError').style.display = 'block';
                isValid = false;
            }
            if (details && details.value.trim().length < 10) {
                document.getElementById('detailsError').style.display = 'block';
                isValid = false;
            }

            if (isValid && feedback) {
                feedback.style.color = '#ffcc00';
                feedback.innerHTML = 'Processing data matrix and connecting with target server...';
                
                const formData = new FormData(enquiryForm);
                fetch(enquiryForm.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error('Network link exception');
                })
                .then(data => {
                    feedback.style.color = '#33cc33';
                    feedback.innerHTML = 'Enquiry Transmitted successfully! Costs and availability will be emailed soon.';
                    enquiryForm.reset();
                })
                .catch(error => {
                    feedback.style.color = '#ff3333';
                    feedback.innerHTML = 'Asynchronous transmission failure. Check manual network configurations.';
                });
            }
        });
    }

    /* ========================================== CONTACT VALIDATION & AJAX HANDLING ========================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            const feedback = document.getElementById('contactFeedback');
            if (feedback) feedback.innerHTML = '';

            const name = document.getElementById('contactName');
            const email = document.getElementById('contactEmail');
            const type = document.getElementById('messageType');
            const msg = document.getElementById('secureMessage');

            if (name && name.value.trim().length < 2) {
                document.getElementById('cNameError').style.display = 'block';
                valid = false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value.trim())) {
                document.getElementById('cEmailError').style.display = 'block';
                valid = false;
            }
            if (type && type.value === '') {
                document.getElementById('cTypeError').style.display = 'block';
                valid = false;
            }
            if (msg && msg.value.trim().length < 15) {
                document.getElementById('cMsgError').style.display = 'block';
                valid = false;
            }

            if (valid && feedback) {
                feedback.style.color = '#ffcc00';
                feedback.innerHTML = 'Compiling encrypted mail data packets...';

                const formPayload = new FormData(contactForm);
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formPayload
                })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Transmission path error.');
                })
                .then(data => {
                    feedback.style.color = '#33cc33';
                    feedback.innerHTML = 'Operational packet delivered cleanly! Data has been safely queued.';
                    contactForm.reset();
                })
                .catch(err => {
                    feedback.style.color = '#ff3333';
                    feedback.innerHTML = 'Asynchronous delivery exception occurred.';
                });
            }
        });
    }

    /* ========================================== DYNAMIC GALLERY SEARCH ========================================== */
    const searchInput = document.getElementById('gallerySearch');
    if (searchInput) {
        const items = document.querySelectorAll('.gallery-item');
        searchInput.addEventListener('input', function () {
            const filterValue = this.value.toLowerCase().trim();
            items.forEach(item => {
                const tags = item.getAttribute('data-tags').toLowerCase();
                const headingText = item.querySelector('h3').textContent.toLowerCase();
                
                if (tags.includes(filterValue) || headingText.includes(filterValue)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    /* ========================================== LIGHTBOX VIEW COMPONENT ========================================== */
    const lightbox = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.responsive-image').forEach(image => {
            image.addEventListener('click', function () {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightbox.classList.add('active');
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        }
        
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    /* ========================================== INTERACTIVE MAP COMPONENT ========================================== */
    if (document.getElementById('interactive-map')) {
        const map = L.map('interactive-map').setView([-29.1181, 26.2231], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker([-29.1181, 26.2231]).addTo(map)
            .bindPopup('<b>Lethabo’s K9 Academia</b><br>HQ Tactical Operations & Handler Core.')
            .openPopup();
    }
});
