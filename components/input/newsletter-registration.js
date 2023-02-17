import classes from "./newsletter-registration.module.css";
import {useRef} from "react";

function NewsletterRegistration() {
  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json()).then((data)=> console.log(data));
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
