// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        submitBtn.disabled = true;
        
        // Reset message
        formMessage.style.display = 'none';
        formMessage.className = '';
        
        try {
            const formData = new FormData(this);
            
            const response = await fetch('https://formsubmit.co/ajax/c110a49cc1ab534d2724eca67e130885', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                showMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Erro ao enviar mensagem');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente por email.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = type;
        formMessage.style.display = 'block';
        
        if (type === 'success') {
            formMessage.style.color = 'var(--success-color)';
            formMessage.style.backgroundColor = 'var(--success-bg)';
            formMessage.style.padding = '10px';
            formMessage.style.borderRadius = '5px';
            formMessage.style.border = '1px solid var(--success-color)';
        } else {
            formMessage.style.color = 'var(--error-color)';
            formMessage.style.backgroundColor = 'var(--error-bg)';
            formMessage.style.padding = '10px';
            formMessage.style.borderRadius = '5px';
            formMessage.style.border = '1px solid var(--error-color)';
        }
    }
});