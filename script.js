document.addEventListener('DOMContentLoaded', () => {
    const loadFAQs = () => {
        const faqContainer = document.getElementById('faq-container');
        if (!faqContainer || typeof faqData === 'undefined') return;

        faqData.forEach(item => {
            const details = document.createElement('details');
            details.className = 'faq-item group bg-white p-4 rounded-lg shadow-sm transition-all duration-300 open:ring-2 open:ring-amber-500 open:shadow-lg';

            const summary = document.createElement('summary');
            summary.className = 'faq-question font-semibold cursor-pointer list-none flex justify-between items-center text-slate-900';
            summary.innerHTML = `
                ${item.question}
                <span class="transform transition-transform duration-300 group-open:rotate-180 text-amber-500">
                    <i class="fas fa-chevron-down"></i>
                </span>
            `;

            const answer = document.createElement('p');
            answer.className = 'faq-answer mt-3 text-slate-600';
            answer.textContent = item.answer;

            details.appendChild(summary);
            details.appendChild(answer);
            faqContainer.appendChild(details);
        });
    };

    const header = document.querySelector('header');
    if(header) {
        let isHeaderHovered = false;
        let lastScroll = 0;
        
        header.addEventListener('mouseenter', () => {
            isHeaderHovered = true;
            header.style.transform = 'translateY(0)';
        });
        
        header.addEventListener('mouseleave', () => {
            isHeaderHovered = false;
        });

        window.addEventListener('scroll', () => {
            if (isHeaderHovered) return;
            
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1, 
        spaceBetween: 30, 
        loop: true,       
        autoplay: {
            delay: 4000,     
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a, .hidden.lg\\:flex a');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }
    const quoteForm = document.getElementById('whatsapp-quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fromAddress = document.getElementById('from-address').value;
            const toAddress = document.getElementById('to-address').value;
            const packageSize = document.getElementById('package-size').value;
            const serviceType = document.getElementById('service-type').value;
            const phoneNumber = '905535383843';
            const message = `Merhaba, bir kurye teklifi almak istiyorum.%0A*Nereden:* ${fromAddress}%0A*Nereye:* ${toAddress}%0A*Paket Boyutu:* ${packageSize}%0A*Hizmet Tipi:* ${serviceType}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    loadFAQs();
});