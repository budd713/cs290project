//get the form by its id
const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  let mail = new FormData(form);

  sendMail(mail);
});


const sendMail = (mail) => {
  // change this after grading to
  // fetch("https://ab290.herokuapp.com/contact.html",
  fetch("https://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php", {
    method: "post",
    mode: 'no-cors',
    body: mail,

  })
  
  // for emailing contact
  // .then((response) => {
  //   return response.json();
  // });
};


