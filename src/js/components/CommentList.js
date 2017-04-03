import React from "react";

import Comment from './CommentList/Comment'


export default class CommentList extends React.Component {

  constructor() {
    super();
    this.state = {

    };
  }

 render() {

   let list = this.props.list.map( comment => {
     return <Comment author={comment.author} content={comment.content}></Comment>
   })



    return (
      <div>
        <h3>Comments</h3>
        {list}

      </div>

    );
  }


}
