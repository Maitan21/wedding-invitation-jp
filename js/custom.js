document.getElementById('phonenumber').addEventListener('input', function() {
    var invalidMsg = document.querySelector('.invalid-msg');
    if (this.validity.valid) {
        invalidMsg.style.display = 'none';
    } else {
        invalidMsg.style.display = 'block';
    }
});