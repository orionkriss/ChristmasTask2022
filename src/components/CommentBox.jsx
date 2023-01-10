//step 1. Create a CommentForm component.
//step 2. use the localStorage API to store comments on local storage
//step 3a. create a CommentList component that displays comments and timestamps
//step 3b. use object.keys functions to get the timestamps in local storage and .map to iterate over the array and render a list of comments.
//step 4. Render the CommentForm and CommentList in a parent component, and add a button to clear comments.
import React, { Component } from "react";
import { render } from "react-dom";

//using 'extends' to utilize the already existing component class from react.
class CommentList extends Component {
  render() {
    const keys = Object.keys(localStorage);
    return (
      <ul>
        {keys.map((key) => (
          <li key={key}>
            {localStorage.getItem(key)} ({key})
          </li>
        ))}
      </ul>
    );
  }
}

class MyCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { comment } = this.state;
    if (!comment) return;
    // store the comment in local storage
    const currentDate = new Date().toString();
    localStorage.setItem(currentDate, comment);
    //add comment to state
    this.props.addComment({ [currentDate]: comment });
    this.setState({ comment: "" });
  };

  render() {
    const { comment } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Leave a Christmas message!
          <input type="text" value={comment} onChange={this.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

//the box containing using both CommentList and MyCommentForm to render on the website. Also adds a clear comment button and a state change to used components.
class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  //add comment:
  addComment = (comment) => {
    this.setState((state) => {
      return { comments: [...state.comments, comment] };
    });
  };

  componentDidMount() {
    if (localStorage.length) {
      const comments = Object.entries(localStorage).map(([key, value]) => ({
        [key]: value,
      }));
      this.setState({ comments });
    }
  }

  clearComments = () => {
    localStorage.clear();
    this.setState({ comments: [] }, () => {
      this.setState({});
    });
  };

  render() {
    return (
      <div>
        <MyCommentForm addComment={this.addComment} />
        <CommentList comments={this.state.comments} />
        <button onClick={this.clearComments}>Clear comments</button>
      </div>
    );
  }
}

export default CommentBox;
