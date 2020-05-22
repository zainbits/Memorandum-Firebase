// PAGE RELATED JAVASCRIPTS

document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var collapsibles = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsibles);
});


// FIREBASE RELATED JAVASCRIPTS

const createaccountForm = document.querySelector('#createaccount-form');
createaccountForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Get USER Info
  const email = createaccountForm['create-email'].value;
  const pwd = createaccountForm['create-pwd'].value;

  //Create Account
  auth.createUserWithEmailAndPassword(email, pwd).then(tok => {
    console.log(tok.user);
    const modal = document.querySelector('#mod-createaccount');
    M.Modal.getInstance(modal).close();
    createaccountForm.reset();
  })

})