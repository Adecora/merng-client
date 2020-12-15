import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {  Icon, Label, Button } from 'semantic-ui-react';

import MyPopup from "../util/MyPopup";

function LikeButton(
    { user, post: {id, likeCount , likes} }
){

    const [liked, setLiked] = useState(false);

    const [ likePost ] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
        onError(err){
            // console.error(err);
        }
    })

    useEffect(() => {
            if(user && likes.find(like => like.username === user.username)) {
                setLiked(true);
            } else { 
                setLiked(false);
            }
        },
        [user, likes]
    )

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart'/>
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart'/>
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
                <Icon name='heart'/>
            </Button>
    )

    return (
        <MyPopup content={ liked? "Unlike post" : "Like post" }> 
            <Button as='div' labelPosition='right' onClick={likePost}>
                {likeButton}
                <Label basic color='teal' pointing='left'>
                    {likeCount}
                </Label>
            </Button>
        </MyPopup>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost(
        $postId: ID!
    ){
        likePost(
            postId: $postId
        ) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`

export default LikeButton;