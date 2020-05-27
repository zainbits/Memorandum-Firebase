// PAGE RELATED JAVASCRIPTS

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var collapsibles = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsibles);
});


// FIREBASE RELATED JAVASCRIPTS



const memoList = document.querySelector('.memos');
const signinLinks = document.querySelectorAll('.signed-in');
const signoutLinks = document.querySelectorAll('.signed-out');

const authUI = (user) => {
  if (user) {
    //TOGGLE UI customElements
    signinLinks.forEach(item => item.style.display = 'block');
    signoutLinks.forEach(item => item.style.display = 'none');

    const writeMemo = document.querySelector('#memo-form');
writeMemo.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection(user.email).add({
    title: writeMemo['title'].value,
    content: writeMemo['content'].value
  }).then(() => {
    const modal = document.querySelector('#mod-writememo');
      M.Modal.getInstance(modal).close();
      writeMemo.reset();
  }).catch(err => {
    alert(err.message);
  })
});
  }
  else {
    //TOGGLE UI customElements
    signinLinks.forEach(item => item.style.display = 'none');
    signoutLinks.forEach(item => item.style.display = 'block');
  }
}

const setupMemos = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const memo = doc.data();
      const li = `
      <li>
        <div class="collapsible-header grey white-text">${memo.title}</div>
        <div class="collapsible-body white">${memo.content}</div>
      </li>
  `;
      html += li
    });
    memoList.innerHTML = html;
  } else {
  }
}

//LISTEN AUTH STATE
auth.onAuthStateChanged(user => {
  if (user) {
    //GET DATA
    db.collection(user.email).onSnapshot(snapshot => {
      setupMemos(snapshot.docs);
      authUI(user);
    });
  } else {
    authUI();
    setupMemos([]);
  }
});


//create account

  const createaccountForm = document.querySelector('#createaccount-form');
  createaccountForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get USER Info
    const email = createaccountForm['create-email'].value;
    const pwd = createaccountForm['create-pwd'].value;

    //Create Account
    auth.createUserWithEmailAndPassword(email, pwd).then(tok => {
      return db.collection(tok.user.email);
    }).then(() => {

      const modal = document.querySelector('#mod-createaccount');
      M.Modal.getInstance(modal).close();
      createaccountForm.reset();
    }).catch((err) => {
      document.getElementById("createaccount-error").innerHTML = err.message;
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

  const signoutmob = document.querySelector('#signout-mob');
  signoutmob.addEventListener('click', (e) => {
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
    }).catch((err) => {
      document.getElementById("signin-error").innerHTML = err.message;
    });
  });