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
    // let html = '';
    const di = `
    <div class="row">
            <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Welcome</span>
                        <p>This is a WebApp Made by Zain Shaikh.
                        Login or Create Account to start writing you memos.
                        Memorandum - Never Forget</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    // html += di;
    // logoutview.innerHTML = html;
    memoList.innerHTML = di;
  }
}

//LISTEN AUTH STATE
auth.onAuthStateChanged(user => {
  if (user) {
    //GET DATA
    db.collection('memos').get().then(snapshot => {
      setupMemos(snapshot.docs);
      authUI(user);
    });
  } else {
    authUI();
    setupMemos([]);
  }
});

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