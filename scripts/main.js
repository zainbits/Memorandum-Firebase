// PAGE RELATED JAVASCRIPTS

document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var collapsibles = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsibles);
});


// FIREBASE RELATED JAVASCRIPTS

//LISTEN AUTH STATE
auth.onAuthStateChanged(user => {
  if(user) {
    alert("you are logged in");
  } else {
    alert("you have been logged out");
  }
})

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

});

//SIGN-OUT
const signout = document.querySelector('#signout');
signout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    alert("you have been signed out successfully");
  })
});

// SIGN-IN
const signinForm = document.querySelector('#signin-form');
signinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //GET USER INFO
  const email = signinForm['signin-email'].value;
  const pwd = signinForm['signin-pwd'].value;

  auth.signInWithEmailAndPassword(email, pwd).then(tok => {
    //CLOSE LOGIN MODAL
    const modal = document.querySelector('#mod-signin');
    M.Modal.getInstance(modal).close();
    signinForm.reset();
  });
});