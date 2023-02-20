import {useContext, useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  useEffect(()=> {
    if(showComments)
    {
      setIsFetchingComments(true)
      fetch('/api/comments/'+ props.eventId).then(res => res.json()).then(data => setComments(data.comments))
      setIsFetchingComments(false);
    }
  }, [showComments])
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'In progress',
      message: 'Comment is submitting',
      status: 'pending'
    });
    // send data to API
    fetch(`/api/comments/${props.eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
       if (res.ok) {
         return res.json()
       }
       else{
         res.json().then((data) => {
           throw new Error(data.message || 'Something went wrong');
         })
       }
    }).then(data => {
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Comment has been added',
        status: 'success'
      });
    } )
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={comments}/>}
      {showComments && isFetchingComments && <p>Loading</p>}
    </section>
  );
}

export default Comments;
