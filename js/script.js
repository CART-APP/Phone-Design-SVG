let icons = document.querySelectorAll('.icon');
let phone = document.getElementById('phone');
let home = document.getElementById('home');
let app = document.getElementById('app');
let appH1 = app.getElementsByTagName('h1')[0];
let appImage = app.getElementsByTagName('img')[0];
let closeButton = document.getElementById('close');

Array.from(icons).forEach(icon => {
  icon.addEventListener("click", () => {
    const firstRect = icon.getBoundingClientRect();
    let firstRectLeft = firstRect.left - 8;
    let firstRectTop = firstRect.top - 8;
    let firstRectHeight = firstRect.height + 5;
    let firstRectWidth = firstRect.width + 5;
    phone.dataset.iconLeft = firstRectLeft;
    phone.dataset.iconTop = firstRectTop;
    phone.dataset.iconHeight = firstRectHeight;
    phone.dataset.iconWidth = firstRectWidth;
    requestAnimationFrame(() => {
      appH1.textContent = icon.dataset.iconTitle;
      appImage.src = icon.getElementsByTagName("img")[0].src;
      const lastRect = phone.getBoundingClientRect();
      let delta = {};
      delta.x = firstRectLeft - lastRect.left;
      delta.y = firstRectTop - lastRect.top;
      delta.width = firstRectWidth / lastRect.width;
      delta.height = firstRectHeight / lastRect.height;
      app.style.transition = "none";
      app.style.display = "flex";
      app.style.transform = `translate(${delta.x}px,  ${delta.y}px) scale(${delta.width}, ${delta.height})`;
      requestAnimationFrame(() => {
        app.style.transition = "transform .3s cubic-bezier(.5,0,.5,1)";
        app.style.transform = "none";
      });  phone.dataset.open = 'app';
    });});});
closeButton.addEventListener('click', () => {
  const firstRect = phone.getBoundingClientRect();
  let delta = {};
  delta.x = phone.dataset.iconLeft - firstRect.left;
  delta.y = phone.dataset.iconTop - firstRect.top;
  delta.width = phone.dataset.iconWidth / firstRect.width;
  delta.height = phone.dataset.iconHeight / firstRect.height;
  requestAnimationFrame(() => {

    app.style.transition = "all .3s cubic-bezier(.5,0,.5,1)";
    app.style.transform = `translate(${delta.x}px,  ${delta.y}px) scale(${delta.width}, ${delta.height})`;

    phone.dataset.open = 'home';
    setTimeout(() => {
      app.style.display = 'none';
    }, 200);
  });
});