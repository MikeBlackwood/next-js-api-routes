import classes from "./newsletter-registration.module.css";
import {useContext, useRef} from "react";
import NotificationContext from "../../store/notification-context";
import notificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending'
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok){
        return res.json();
      }
      res.json().then((data) => {
        throw new Error(data.message || 'Something went wrong');
      })
    }).then((data)=> {
    notificationCtx.showNotification({
      title: 'Success!',
      message: 'Successfully registered for newsletter!',
      status: 'success'
    })}
    ).catch((erorr) => {
      notificationCtx.showNotification({
        title: 'Error!',
        message: 'Registration was unsuccessful',
        status: 'error'
      })
    })
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
