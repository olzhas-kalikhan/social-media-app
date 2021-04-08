import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import UserItem from 'components/userItem/userItem'
import UserService from 'services/user/user'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
const FriendsPage = (props) => {
    const [followingList, setFollowingList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [foundUserList, setFoundUserList] = useState([])
    const classes = useStyles()
    const fetchFollowings = () => {
        UserService.getFollowings()
            .then(data => { setFollowingList(data) })
            .catch(err => console.log(err))

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        UserService.searchUser(searchQuery)
            .then(data => { setFoundUserList(data.users) })
    }
    const handleInputChange = (e) => {
        if (e.target.value === '') {
            setFoundUserList([])
        }
        setSearchQuery(e.target.value)
    }
    useEffect(() => {
        fetchFollowings()
    }, [])
    return (
        <div>
            <Paper component="form" className={classes.searchBar} onSubmit={handleSubmit} >
                <InputBase
                    className={classes.inputField}
                    placeholder="Search User"
                    inputProps={{ 'aria-label': 'search user' }}
                    onChange={handleInputChange}
                />
                <IconButton className={classes.submitBtn} type="submit" aria-label="search" >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <List>
                {followingList.length > 0 && followingList.map((user) =>
                    <UserItem key={user.email} user={user} />
                )}
            </List>
            <List>
                {foundUserList.length > 0 && foundUserList.map((user) =>
                    <UserItem key={user.email} user={user} />
                )}
            </List>
        </div>
    )
}
export default FriendsPage