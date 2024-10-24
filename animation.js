canvas.addEventListener("click", function(event) {
    // Check if the click is within the object's bounds
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (clickX >= x && clickX <= x + size && clickY >= y && clickY <= y + size) {
        // Change direction randomly
        dx = (Math.random() - 0.5) * 4;
        dy = (Math.random() - 0.5) * 4;
        
        // Change color
        ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
});
