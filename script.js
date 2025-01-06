<script>
  const components = document.querySelectorAll('.component');
  const canvas = document.getElementById('canvas');
  const workflowPane = document.getElementById('workflowPane');

  const animationSteps = [
    { type: 'Table Grid', x: 50, y: 50 },
    { type: 'Textbox', x: 200, y: 50 },
    { type: 'Button', x: 200, y: 150 },
  ];

  let currentStep = 0;

  // Drag and Drop Events
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

  // Create Component Element on Canvas
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

  // Animation Logic
  function runSimulation() {
    if (currentStep >= animationSteps.length) return;

    const { type, x, y } = animationSteps[currentStep];
    createComponentElement(type, x, y);
    currentStep++;

    setTimeout(runSimulation, 1000); // 1 second delay between each step
  }

  // Start Simulation on Page Load
  window.addEventListener('DOMContentLoaded', runSimulation);
</script>
