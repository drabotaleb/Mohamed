document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Sample resources data
    const resources = [
        { id: 1, name: 'Gray\'s Anatomy Textbook', type: 'book', icon: 'fas fa-book' },
        { id: 2, name: 'Physiology Lecture Notes', type: 'notes', icon: 'fas fa-file-alt' },
        { id: 3, name: 'Histology Slides Collection', type: 'notes', icon: 'fas fa-images' },
        { id: 4, name: 'Biochemistry Pathways', type: 'notes', icon: 'fas fa-project-diagram' },
        { id: 5, name: 'Pathology Case Studies', type: 'book', icon: 'fas fa-book-medical' },
        { id: 6, name: 'Pharmacology Video Lectures', type: 'video', icon: 'fas fa-video' },
        { id: 7, name: 'Clinical Examination Guide', type: 'book', icon: 'fas fa-book-open' },
        { id: 8, name: 'Medical Mnemonics Collection', type: 'notes', icon: 'fas fa-brain' }
    ];

    // Sample diagrams data
    const diagrams = [
        { id: 1, title: 'Human Muscular System', category: 'musculoskeletal', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 2, title: 'Cardiovascular System', category: 'cardiovascular', image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 3, title: 'Nervous System Overview', category: 'nervous', image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 4, title: 'Respiratory System', category: 'respiratory', image: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 5, title: 'Digestive System', category: 'digestive', image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 6, title: 'Skeletal Structure', category: 'musculoskeletal', image: 'https://images.unsplash.com/photo-1571019614242-c6b275849e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }
    ];

    // Display resources
    const resourcesContainer = document.getElementById('resourcesContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function displayResources(filter = 'all') {
        resourcesContainer.innerHTML = '';
        
        const filteredResources = filter === 'all' ? 
            resources : resources.filter(res => res.type === filter);
        
        filteredResources.forEach(resource => {
            const resourceItem = document.createElement('div');
            resourceItem.className = 'resource-item';
            resourceItem.innerHTML = `
                <div class="resource-icon"><i class="${resource.icon}"></i></div>
                <div class="resource-name">${resource.name}</div>
                <div class="resource-type">${resource.type}</div>
                <div class="resource-actions">
                    <button><i class="fas fa-download"></i> Download</button>
                    <button><i class="fas fa-share-alt"></i> Share</button>
                </div>
            `;
            resourcesContainer.appendChild(resourceItem);
        });
    }

    // Filter resources
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            displayResources(filter);
        });
    });

    // Initial display
    displayResources();

    // Display diagrams
    const diagramsGrid = document.querySelector('.diagrams-grid');
    const diagramSearch = document.getElementById('diagramSearch');
    const diagramFilter = document.getElementById('diagramFilter');

    function displayDiagrams(searchTerm = '', filter = 'all') {
        diagramsGrid.innerHTML = '';
        
        const filteredDiagrams = diagrams.filter(diagram => {
            const matchesSearch = diagram.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' || diagram.category === filter;
            return matchesSearch && matchesFilter;
        });
        
        filteredDiagrams.forEach(diagram => {
            const diagramCard = document.createElement('div');
            diagramCard.className = 'diagram-card';
            diagramCard.innerHTML = `
                <img src="${diagram.image}" alt="${diagram.title}" class="diagram-img">
                <div class="diagram-info">
                    <div class="diagram-title">${diagram.title}</div>
                    <div class="diagram-category">${diagram.category}</div>
                </div>
            `;
            diagramsGrid.appendChild(diagramCard);
            
            // Add click event to open modal
            diagramCard.addEventListener('click', () => openDiagramModal(diagram));
        });
    }

    // Search diagrams
    diagramSearch.addEventListener('input', function() {
        const searchTerm = this.value;
        const filter = diagramFilter.value;
        displayDiagrams(searchTerm, filter);
    });

    // Filter diagrams
    diagramFilter.addEventListener('change', function() {
        const searchTerm = diagramSearch.value;
        const filter = this.value;
        displayDiagrams(searchTerm, filter);
    });

    // Initial display
    displayDiagrams();

    // Diagram Modal
    const modal = document.getElementById('diagramModal');
    const modalImg = document.getElementById('modalDiagram');
    const captionText = document.getElementById('diagramCaption');
    const closeModal = document.querySelector('.close-modal');

    function openDiagramModal(diagram) {
        modal.style.display = 'block';
        modalImg.src = diagram.image;
        captionText.innerHTML = diagram.title;
    }

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // File Upload Form
    const uploadForm = document.getElementById('uploadForm');
    
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('resourceFile');
        
        if (fileInput.files.length > 0) {
            // In a real app, you would upload files to a server here
            alert(`${fileInput.files.length} file(s) selected for upload. In a real application, these would be uploaded to a server.`);
            
            // Reset form
            uploadForm.reset();
        } else {
            alert('Please select at least one file to upload.');
        }
    });

    // Subject Cards Animation
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('click', function() {
            const subjectId = this.id;
            // Scroll to the corresponding section
            document.getElementById(subjectId + '-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Current year for footer
    document.querySelector('.footer-bottom p').innerHTML = 
        `&copy; ${new Date().getFullYear()} Abotaleb Medicine. All rights reserved.`;
});