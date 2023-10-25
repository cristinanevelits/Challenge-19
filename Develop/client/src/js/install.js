const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior to prevent automatic installation prompt
  event.preventDefault();

  // Store the event for later use
  const deferredPrompt = event;

  // Show the "Install" button
  butInstall.style.display = 'block';

  // Handle the "Install" button click event
  butInstall.addEventListener('click', async () => {
    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }

    // Reset the button display
    butInstall.style.display = 'none';
  });
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed:', event);
});
