// ===== SITE RAFAEL RODRIGUES - JAVASCRIPT MODERNO =====

// Configuração e constantes
const CONFIG = {
    SCROLL_THRESHOLD: 300,
    ANIMATION_DELAY: 100,
    MOBILE_BREAKPOINT: 768,
    SCROLL_OFFSET: 80
};

// Classe principal do site
class RafaelSite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupIntersectionObserver();
        this.hideLoadingOverlay();
    }

    // Configuração de event listeners
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Scroll to top
        this.setupScrollToTop();
        
        // Form handling
        this.setupContactForm();
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handlePageLoad.bind(this));
    }

    // Configuração da navegação
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        // Navegação suave
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                
                // Fechar menu mobile se estiver aberto
                if (window.innerWidth < CONFIG.MOBILE_BREAKPOINT) {
                    this.closeMobileMenu();
                }
            });
        });

        // Header scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
                navbar.classList.add('bg-white/98', 'shadow-lg');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.remove('bg-white/98', 'shadow-lg');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Configuração do scroll suave
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });
    }

    // Scroll para seção específica
    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - CONFIG.SCROLL_OFFSET;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Configuração do botão scroll to top
    setupScrollToTop() {
        const scrollBtn = document.getElementById('scroll-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > CONFIG.SCROLL_THRESHOLD) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Configuração do menu mobile
    setupMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

        mobileBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Fechar menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    // Alternar menu mobile
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const icon = mobileBtn.querySelector('i');

        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileBtn.classList.add('text-primary-600');
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMobileMenu();
        }
    }

    // Fechar menu mobile
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const icon = mobileBtn.querySelector('i');

        mobileMenu.classList.add('hidden');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileBtn.classList.remove('text-primary-600');
        document.body.style.overflow = '';
    }

    // Configuração do formulário de contato
    setupContactForm() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    // Manipulação do envio do formulário
    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            // Simular envio (substituir por API real)
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Sucesso
            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            
        } catch (error) {
            // Erro
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Configuração do Intersection Observer para animações
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        // Observar elementos com data-aos
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Inicialização de componentes
    initializeComponents() {
        // Lazy loading para imagens
        this.setupLazyLoading();
        
        // Parallax effects
        this.setupParallax();
        
        // Typing effect para o título principal SUPER RÁPIDO
        this.setupTypingEffect();
        
        // Contadores animados
        this.setupCounters();
    }

    // Configuração de lazy loading
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Configuração de efeitos parallax
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Configuração do efeito de digitação LONGO E SUAVE
    setupTypingEffect() {
        const title = document.querySelector('#home h1');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80); // MAIS LONGO E SUAVE: 80ms entre letras
            }
        };

        // Iniciar após uma pequena pausa para criar expectativa
        setTimeout(typeWriter, 300);
    }

    // Configuração de contadores animados
    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            
            const updateCounter = () => {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        };

        // Observar contadores
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Manipuladores de eventos
    handleScroll() {
        // Header scroll effect já implementado acima
        // Scroll to top já implementado acima
    }

    handleResize() {
        // Fechar menu mobile em telas grandes
        if (window.innerWidth >= CONFIG.MOBILE_BREAKPOINT) {
            this.closeMobileMenu();
        }
    }

    handlePageLoad() {
        // Remover loading overlay
        this.hideLoadingOverlay();
        
        // Inicializar animações
        this.initializeAnimations();
    }

    // Esconder overlay de loading
    hideLoadingOverlay() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 1000);
        }
    }

    // Inicializar animações
    initializeAnimations() {
        // Adicionar classes de animação aos elementos
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right');
        
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translate(0, 0)';
            }, index * CONFIG.ANIMATION_DELAY);
        });
    }

    // Utilitários
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o site
    const site = new RafaelSite();
    
    // Expor para uso global (opcional)
    window.RafaelSite = site;
    
    // Log de sucesso
    console.log('🚀 Site Rafael Rodrigues carregado com sucesso!');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`⏱️ Página carregada em ${loadTime.toFixed(2)}ms`);
        });
    }
});

// Service Worker Registration (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(error => {
                console.log('SW falhou:', error);
            });
    });
}

// Error handling global
window.addEventListener('error', (e) => {
    console.error('Erro JavaScript:', e.error);
    // Aqui você pode enviar erros para um serviço de monitoramento
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejeitada:', e.reason);
    e.preventDefault();
});
