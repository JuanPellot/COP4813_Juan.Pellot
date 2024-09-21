function calculateDragForce(Cd, rho, A, v) {
    return 0.5 * Cd * rho * A * Math.pow(v, 2);
}
