
const app = firebase.initializeApp(firebaseConfig);
console.log(app);

const signup = () => {
    let username = document.getElementById('username').value; // Added .value to retrieve input value
    let contact = document.getElementById('contact').value;   // Added .value to retrieve input value
    let email = document.getElementById('email').value;       // Added .value to retrieve input value
    let password = document.getElementById('password').value; // Added .value to retrieve input value
    let role ='user'

    console.log(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            console.log(user);

            firebase.database().ref('user/' + user.uid).set({
                uid: user.uid,       // Changed uid: uid to uid: user.uid
                username: username,
                contact: contact,
                email: email,
                password: password, // Storing passwords in plaintext is not recommended for security reasons
                role: role,
            })
            .then(() => {
                console.log('user created successfully');
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ':' + errorMessage);
        });
};

