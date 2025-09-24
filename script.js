function toggleContent(button) {
    const projectCard = button.closest('.project-card');
    const fullText = projectCard.querySelector('.project-full-text');
    
    if (!fullText) return;
    
    // Check current state using both methods (display style and expanded class)
    const isCurrentlyHidden = fullText.style.display === 'none' || 
                               fullText.style.display === '' || 
                               !fullText.classList.contains('expanded');
    
    if (isCurrentlyHidden) {
        // Show content
        fullText.style.display = 'block';
        fullText.classList.add('expanded');
        button.textContent = 'See Less';
        
        // Smooth scroll to show the content
        setTimeout(() => {
            fullText.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    } else {
        // Hide content
        fullText.style.display = 'none';
        fullText.classList.remove('expanded');
        button.textContent = 'See More';
    }
}