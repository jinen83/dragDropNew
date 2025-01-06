const components = document.querySelectorAll('.component');
const canvas = document.getElementById('canvas');
const workflowPane = document.getElementById('workflowPane');

components.forEach(component => {
  component.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', component.dataset.type);
  });
});

canvas.addEventListener('dragover', (event) => {
  event.preventDefault();
});

canvas.addEventListener('drop', (event) => {
  event.preventDefault();
  const type = event.dataTransfer.getData('text/plain');
  const x = event.clientX - canvas.getBoundingClientRect().left;
  const y = event.clientY - canvas.getBoundingClientRect().top;
  createComponentElement(type, x, y);
});

function createComponentElement(type, x, y) {
  const element = document.createElement('div');
  element.className = `dropped ${type.toLowerCase()}`;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.textContent = type;

  // Add workflow-pane for button
  if (type === 'Button') {
    element.addEventListener('click', () => {
      workflowPane.classList.toggle('open');
    });
  }

  canvas.appendChild(element);
}
