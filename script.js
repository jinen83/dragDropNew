<script>
  const components = document.querySelectorAll('.component');
  const canvas = document.getElementById('canvas');
  const workflowPane = document.getElementById('workflowPane');

  // Simulation Steps
  const animationSteps = [
    { type: 'Table Grid', x: 50, y: 50 },
    { type: 'Textbox', x: 200, y: 50 },
    { type: 'Button', x: 200, y: 150 },
  ];

  // Automatically simulate drag-and-drop
  let currentStep = 0;

  function simulateDragDrop() {
    if (currentStep >= animationSteps.length) return;

    const { type, x, y } = animationSteps[currentStep];
    createComponentElement(type, x, y);

    currentStep++;
    setTimeout(simulateDragDrop, 1000); // Delay between steps
  }

  // Add drag-and-drop functionality
  components.forEach(component => {
    component.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', component.dataset.type);
    });
  });

  canvas.addEventListener('dragover', event => {
    event.preventDefault();
  });

  canvas.addEventListener('drop', event => {
    event.preventDefault();
    const type = event.dataTransfer.getData('text/plain');
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    createComponentElement(type, x, y);
  });

  // Create dropped component
  function createComponentElement(type, x, y) {
    const element = document.createElement('div');
    element.className = `dropped ${type.toLowerCase()}`;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.textContent = type;

    if (type === 'Button') {
      element.addEventListener('click', () => {
        workflowPane.classList.toggle('open');
      });
    }

    canvas.appendChild(element);
  }

  // Start simulation after DOM is loaded
  window.addEventListener('DOMContentLoaded', simulateDragDrop);
</script>
