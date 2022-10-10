(function(){

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
		apiKey: "AIzaSyBRKZ-oQPoSSM9vHlybhZF0XswqX5-DVsw",
		authDomain: "courso-6607b.firebaseapp.com",
		projectId: "courso-6607b",
		storageBucket: "courso-6607b.appspot.com",
		messagingSenderId: "843075891467",
		appId: "1:843075891467:web:a403a4b64a3d1c4309b20e"
	  };
    // Initialize Firebase
    //firebase.initializeApp(firebaseConfig);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  // TODO: initialize provider for google auth
  const provider = new GoogleAuthProvider();

  console.log("app initialized...");

	// get elements
	
	const email = document.getElementById("email");
    const password = document.getElementById("password");
    const login = document.getElementById("login");
    const signup = document.getElementById("signup");
    const logout = document.getElementById("logout");
    const loggedInStatus = document.getElementById("loggedInStatus");
    const googlelogin = document.getElementById("googlelogin");

	// login
	login.addEventListener('click', e => {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    });

	// signup
	signup.addEventListener('click', e => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    });
	//Google Login
    googlelogin.addEventListener("click", (e) => {
        console.log("google sign in clicked");
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("google user: ", user);
          })
          .catch((error) => {
            // Handle Errors here.
            console.error(error);
          });
      });	
    // logout
	logout.addEventListener('click', e => {
		auth.signOut();
	});

    // login state
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          console.log(firebaseUser);
          loggedInStatus.innerText = `You are logged in using the following email: ${firebaseUser.email}`;
          logout.style.display = "inline";
          login.style.display = "none";
          signup.style.display = "none";
          email.style.display = "none";
          password.style.display = "none";
          googlelogin.style.display = "none";
        } else {
          console.log("User is not logged in");
          loggedInStatus.innerText = "You are not yet logged in";
          login.style.display = "inline";
          signup.style.display = "inline";
          email.style.display = "inline";
          googlelogin.style.display = "inline";
          password.style.display = "inline";
          logout.style.display = "none";
        }
      });
    })();