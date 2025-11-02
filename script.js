 const toggle = document.querySelector('.theme-toggle i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
      document.body.classList.add('dark');
      toggle.classList.remove('fa-moon');
      toggle.classList.add('fa-sun');
    }
    
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      
      // Save theme preference
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }

      // toggle icon
      if(document.body.classList.contains('dark')){
        toggle.classList.remove('fa-moon');
        toggle.classList.add('fa-sun');
      } else {
        toggle.classList.remove('fa-sun');
        toggle.classList.add('fa-moon');
      }
    });

    // Mobile menu toggle
  
    const navLinks = document.querySelector('.nav-links');



    // Toggle draggable navigation
    const toggleDraggableNav = document.getElementById('toggleDraggableNav');
    const draggableNav = document.getElementById('draggableNav');
    
    toggleDraggableNav.addEventListener('click', () => {
      draggableNav.classList.toggle('show');
      
      // Change icon based on state
      const icon = toggleDraggableNav.querySelector('i');
      if (draggableNav.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Draggable navigation functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Touch events for mobile
    draggableNav.addEventListener("touchstart", dragStart);
    draggableNav.addEventListener("touchend", dragEnd);
    draggableNav.addEventListener("touchmove", drag);

    // Mouse events for testing on desktop
    draggableNav.addEventListener("mousedown", dragStart);
    draggableNav.addEventListener("mouseup", dragEnd);
    draggableNav.addEventListener("mousemove", drag);

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === draggableNav || draggableNav.contains(e.target)) {
        isDragging = true;
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, draggableNav);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-links a, .draggable-nav a');
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
          link.classList.add('active');
        }
      });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a, .draggable-nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menus after click
        navLinks.classList.remove('show');
        
        draggableNav.classList.remove('show');
        const draggableIcon = toggleDraggableNav.querySelector('i');
        draggableIcon.classList.remove('fa-times');
        draggableIcon.classList.add('fa-bars');
      });
    });