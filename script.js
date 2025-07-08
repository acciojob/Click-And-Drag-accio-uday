// Your code here.
const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
	cube.addEventListener('mousedown', (e) => {
		activeCube = cube;
		// Get the initial mouse position and cube position
		offsetX = e.clientX - cube.getBoundingClientRect().left;
		offsetY = e.clientY - cube.getBoundingClientRect().top;

		// Add mousemove and mouseup listeners
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});
});

function onMouseMove(e) {
	if (!activeCube) return;

	// Calculate the new position of the cube
	let newX = e.clientX - offsetX;
	let newY = e.clientY - offsetY;

	// Get the boundaries of the container
	const containerRect = container.getBoundingClientRect();

	// Make sure the cube stays within the container boundaries
	newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - activeCube.offsetWidth));
	newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - activeCube.offsetHeight));

	// Apply the new position
	activeCube.style.left = `${newX - containerRect.left}px`;
	activeCube.style.top = `${newY - containerRect.top}px`;
}

function onMouseUp() {
	if (!activeCube) return;

	// Remove the mousemove and mouseup listeners
	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', onMouseUp);

	// Drop the cube (it will stay in its new position)
	activeCube = null;
}